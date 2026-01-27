const stripe = require("../config/stripe");
const EventBooking = require("../models/EventBooking");
const EventPayment = require("../models/EventPayment");
const AppError = require("../utils/AppError");
const { matchedData } = require("express-validator");

/**
 * Create Stripe PaymentIntent for Event Booking
 */
exports.createEventPaymentIntent = async (req, res, next) => {
  try {
    const { bookingId } = matchedData(req);
    const userId = req.user._id;

    const booking = await EventBooking.findById(bookingId);
    if (!booking) {
      return next(new AppError("Event booking not found", 404));
    }

    if (booking.user.toString() !== userId.toString()) {
      return next(new AppError("Unauthorized", 403));
    }

    if (booking.status !== "PENDING") {
      return next(new AppError("Invalid booking status", 400));
    }

    // Create Stripe PaymentIntent (USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // USD → cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        eventBookingId: booking._id.toString(),
      },
    });

    // Create local payment record
    const payment = await EventPayment.create({
      eventBooking: booking._id,
      stripePaymentIntentId: paymentIntent.id,
      amount: booking.totalAmount,
      currency: "USD",
      status: "CREATED",
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    next(error);
  }
};
