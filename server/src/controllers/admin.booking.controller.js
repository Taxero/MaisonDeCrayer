const Booking = require("../models/Booking");
const { matchedData } = require("express-validator");
const AppError = require("../utils/AppError");
const EventBooking = require("../models/EventBooking");

/**
 * Admin: Get all bookings
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, from, to } = matchedData(req, { locations: ["query"] });

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (from && to) {
      filter.checkIn = { $gte: new Date(from) };
      filter.checkOut = { $lte: new Date(to) };
    }

    const bookings = await Booking.find(filter)
      .populate("user", "name email phone")
      .populate("room", "name pricePerNight")
      .populate("payment")
      .sort({ createdAt: -1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error); // ✅ centralized error handler
  }
};

/**
 * Admin: Get all event bookings
 */
exports.getAllEventBookings = async (req, res, next) => {
  try {
    const { date, status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (date) {
      filter.date = new Date(date);
    }

    const bookings = await EventBooking.find(filter)
      .populate("room")
      .populate("user", "name email phone")
      .sort({ date: 1, startTime: 1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get single booking details
 */
exports.getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = matchedData(req, { locations: ["params"] });

    const booking = await Booking.findById(bookingId)
      .populate("user", "name email phone")
      .populate("room")
      .populate("payment");

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    res.json({ booking });
  } catch (error) {
    next(error); // ✅ centralized error handler
  }
};
