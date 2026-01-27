const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Payment = require("../models/Payment");
const { getBookedRoomsCount } = require("../utils/availability");
const { matchedData } = require("express-validator");
const AppError = require("../utils/AppError");
const stripe = require("../config/stripe");
const mongoose = require("mongoose");
const { generateOtp, hashOtp } = require("../utils/bookingUtils");

/**
 * Check room availability
 */
exports.checkAvailability = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, roomsRequested } =
      matchedData(req, { locations: ["body"] });

    const room = await Room.findById(roomId);
    if (!room || !room.isActive) {
      return next(new AppError("Room not found", 404));
    }

    const bookedRooms = await getBookedRoomsCount(
      roomId,
      new Date(checkIn),
      new Date(checkOut)
    );

    const availableRooms = room.totalRooms - bookedRooms;

    res.json({
      available: availableRooms >= roomsRequested,
      availableRooms,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create booking (PENDING)
 */
exports.createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, roomsBooked } =
      matchedData(req, { locations: ["body"] });

    const userId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    const nights =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      return next(new AppError("Invalid date range", 400));
    }

    const bookedRooms = await getBookedRoomsCount(
      roomId,
      new Date(checkIn),
      new Date(checkOut)
    );

    if (room.totalRooms - bookedRooms < roomsBooked) {
      return next(new AppError("Rooms not available", 400));
    }

    const totalAmount = room.pricePerNight * nights * roomsBooked;

    const booking = await Booking.create({
      user: userId,
      room: roomId,
      checkIn,
      checkOut,
      roomsBooked,
      totalAmount,
      status: "PENDING",
    });

    res.status(201).json({
      message: "Booking created (pending payment)",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
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

exports.getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = matchedData(req, { locations: ["params"] });
    const user = req.user;

    const booking = await Booking.findById(bookingId)
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


exports.getCheckInOtp = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { bookingId } = matchedData(req, { locations: ["params"] });

    const booking = await Booking.findOne({
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


/**
 * Cancel booking (User or Admin)
 */

exports.cancelBooking = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { bookingId } = matchedData(req, { locations: ["params"] });
    const user = req.user;

    const booking = await Booking.findById(bookingId)
      .populate("payment")
      .session(session);

    if (!booking) {
      await session.abortTransaction();
      return next(new AppError("Booking not found", 404));
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
        new AppError("Only confirmed bookings can be cancelled", 400)
      );
    }

    if (new Date() >= booking.checkIn || booking.checkedIn) {
      await session.abortTransaction();
      return next(
        new AppError("Booking cannot be cancelled after check-in", 400)
      );
    }

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
      message: "Booking cancelled successfully. Refund initiated.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};


