const { matchedData } = require("express-validator");
const stripe = require("../config/stripe");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const AppError = require("../utils/AppError");
/**
 * Create Stripe PaymentIntent
 */
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { bookingId } = matchedData(req, { locations: ["body"] });

    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== "PENDING") {
      return next(new AppError("Invalid booking", 400));
    }

    // Create Stripe PaymentIntent (EUR)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // USD → cents
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    // Create local payment record
    const payment = await Payment.create({
      booking: booking._id,
      stripePaymentIntentId: paymentIntent.id,
      amount: booking.totalAmount,
      currency: "EUR",
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

