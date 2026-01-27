const EventBooking = require("../models/EventBooking");
const Room = require("../models/Room");
const { matchedData } = require("express-validator");
const AppError = require("../utils/AppError");
const { calculateHours } = require("../utils/calculateHours");
const stripe = require("../config/stripe");
const mongoose = require("mongoose");
const { generateOtp, hashOtp } = require("../utils/bookingUtils");

exports.checkEventAvailability = async (req, res, next) => {
  try {
    const { roomId, date, startTime, endTime } = matchedData(req);

    const room = await Room.findById(roomId);
    if (!room || room.roomCategory !== "EVENT") {
      return next(new AppError("Invalid event room", 400));
    }

    const conflict = await EventBooking.findOne({
      room: roomId,
      date: new Date(date),
      status: "CONFIRMED",
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    res.json({
      available: !conflict,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * User: Create Event Booking (Hourly pricing)
 */
exports.createEventBooking = async (req, res, next) => {
  try {
    const { roomId, date, startTime, endTime } = matchedData(req);
    const userId = req.user._id;

    // 1️⃣ Validate room
    const room = await Room.findById(roomId);
    if (!room || room.roomCategory !== "EVENT") {
      return next(new AppError("Invalid event room", 400));
    }

    // 2️⃣ Time validation
    if (startTime >= endTime) {
      return next(new AppError("Invalid time range", 400));
    }

    // 3️⃣ Calculate hours
    const totalHours = calculateHours(startTime, endTime);

    if (totalHours <= 0) {
      return next(new AppError("Invalid booking duration", 400));
    }

    // 4️⃣ Check overlap
    const conflict = await EventBooking.findOne({
      room: roomId,
      date: new Date(date),
      status: "CONFIRMED",
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    if (conflict) {
      return next(
        new AppError("Selected time slot is not available", 400)
      );
    }

    // 5️⃣ Calculate price
    const totalAmount = totalHours * room.pricePerHour;

    // 6️⃣ Create booking
    const booking = await EventBooking.create({
      user: userId,
      room: roomId,
      date,
      startTime,
      endTime,
      totalHours,
      totalAmount,
    });

    res.status(201).json({
      message: "Event booking created successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * User/Admin: Cancel Event Booking
 */
exports.cancelEventBooking = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { bookingId } = matchedData(req, { locations: ["params"] });
    const user = req.user;

    const booking = await EventBooking.findById(bookingId)
      .populate("payment")
      .session(session);

    if (!booking) {
      await session.abortTransaction();
      return next(new AppError("Event booking not found", 404));
    }

    if (
      user.role !== "ADMIN" &&
      booking.user.toString() !== user._id.toString()
    ) {
      await session.abortTransaction();
      return next(
        new AppError("Not authorized to cancel this booking", 403)
      );
    }

    if (booking.status !== "CONFIRMED") {
      await session.abortTransaction();
      return next(
        new AppError("Only confirmed event bookings can be cancelled", 400)
      );
    }

    const eventStartDateTime = new Date(
      `${booking.date}T${booking.startTime}`
    );

    const cancellationDeadline = new Date(
      eventStartDateTime.getTime() - 2 * 60 * 60 * 1000
    );

    if (new Date() > cancellationDeadline) {
      await session.abortTransaction();
      return next(new AppError("Event cannot be cancelled now", 400));
    }

    // Update booking
    booking.status = "CANCELLED";
    await booking.save({ session });

    // 🔄 Stripe refund
    if (booking.payment && booking.payment.status === "PAID") {
      const payment = booking.payment;

      const refund = await stripe.refunds.create({
        payment_intent: payment.stripePaymentIntentId,
        amount: Math.round(payment.amount * 100),
      });

      payment.refundId = refund.id;
      payment.refundStatus = "INITIATED";
      payment.status = "REFUND_INITIATED";

      await payment.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Event booking cancelled. Refund initiated.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};



/**
 * User: Get my event bookings
 */
exports.getMyEventBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const bookings = await EventBooking.find({ user: userId })
      .populate("room")
      .populate("payment")
      .select("-checkInOtp")
      .sort({ createdAt: -1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEventBookingById = async (req, res, next) => {
  try {
    const { bookingId } = matchedData(req, { locations: ["params"] });
    const user = req.user;

    const booking = await EventBooking.findById(bookingId)
      .populate("room")
      .populate("payment")
      .select("-checkInOtp");

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    // User can access only their own booking
    if (
      user.role !== "ADMIN" &&
      booking.user.toString() !== user._id.toString()
    ) {
      return next(
        new AppError("Not authorized to view this booking", 403)
      );
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

exports.getEventCheckInOtp = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { bookingId } = matchedData(req, { locations: ["params"] });

    const booking = await EventBooking.findOne({
      _id: bookingId,
      user: userId,
      status: "CONFIRMED",
    });

    if (!booking) {
      return next(new AppError("Booking not found ", 404))
    }

    if (booking.checkedIn) {
      return next(new AppError("Already checked In ", 400))
    }

    const otp = generateOtp();

    booking.checkInOtp = hashOtp(otp);
    await booking.save();

    res.json({
      bookingReference: booking.bookingReference,
      otp, // 👈 plain OTP (sent only now)
    });
  } catch (error) {
    next(error);
  }
};
