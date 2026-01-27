const mongoose = require("mongoose");

const eventPaymentSchema = new mongoose.Schema(
  {
    eventBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventBooking",
      required: true,
    },

    // Stripe PaymentIntent ID
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    status: {
      type: String,
      enum: ["CREATED", "PAID", "FAILED", "REFUND_INITIATED", "REFUNDED"],
      default: "CREATED",
    },

    refundId: {
      type: String,
    },

    refundStatus: {
      type: String,
      enum: ["NONE", "INITIATED", "PROCESSED"],
      default: "NONE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventPayment", eventPaymentSchema);
