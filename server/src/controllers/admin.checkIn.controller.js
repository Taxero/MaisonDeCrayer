const Booking = require("../models/Booking");
const { matchedData } = require("express-validator");
const AppError = require("../utils/AppError");
const { hashOtp } = require("../utils/bookingUtils");
const EventBooking = require("../models/EventBooking");

exports.checkIsStayBooking = async (req, res, next) => {

  try {
    const { bookingReference, otp } = matchedData(req, { locations: ["body"] });

    const booking = await Booking.findOne({ bookingReference })
      .populate("payment")
      .populate("room")
      .populate("user", "name email phone")

    if (!booking) {
      return next(new AppError("Invalid booking reference", 404));
    }

    if (booking.checkedIn) {
      return next(new AppError("Gueset already Checked in ", 400));
    }

    if (booking.otpUsed) {
      return next(new AppError("OTP already used", 400))
    }

    if (booking.checkInOtp !== hashOtp(otp)) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (!booking.payment || booking.payment.status !== "PAID") {
      return next(new AppError("Payment not completed", 400))
    }

    const today = new Date();
    const checkInDate = new Date(booking.checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today < checkInDate) {
      return next(new AppError(`Check-in date not reached . CheckIn Date : ${checkInDate}`, 400))
    }

    booking.checkedIn = true;
    booking.checkedInAt = new Date();
    booking.otpUsed = true;

    await booking.save();

    res.status(200).json({
      message: "Guest checked in successfully",
      booking
    });
  }
  catch (error) {
    next(error)
  }

}



exports.checkInEventBooking = async (req, res, next) => {
  try {
    const { bookingReference, otp } = matchedData(req, {
      locations: ["body"],
    });

    const booking = await EventBooking.findOne({ bookingReference })
      .populate("payment")
      .populate("room")
      .populate("user", "name email phone");

    if (!booking) {
      return next(new AppError("Invalid event booking reference", 404));
    }

    if (booking.checkedIn) {
      return next(new AppError("Event already checked in", 400));
    }

    if (booking.otpUsed) {
      return next(new AppError("OTP already used", 400));
    }

    if (booking.checkInOtp !== hashOtp(otp)) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (!booking.payment || booking.payment.status !== "PAID") {
      return next(new AppError("Payment not completed", 400));
    }

    // ⏱ Time-based validation (EVENT)
    const now = new Date();
    const eventStart = new Date(`${booking.date}T${booking.startTime}`);
    const eventEnd = new Date(`${booking.date}T${booking.endTime}`);

    const allowedBeforeMinutes = 60;
    const earliestCheckIn = new Date(
      eventStart.getTime() - allowedBeforeMinutes * 60 * 1000
    );

    if (now < earliestCheckIn || now > eventEnd) {
      return next(
        new AppError(`Check-in not allowed at this time ${booking.date} T${booking.startTime} `, 400)
      );
    }

    booking.checkedIn = true;
    booking.checkedInAt = new Date();
    booking.otpUsed = true;

    await booking.save();

    res.json({
      message: "Event checked in successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};
