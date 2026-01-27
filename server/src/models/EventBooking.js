const mongoose = require("mongoose");

const eventBookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventPayment",
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String, // "10:00"
      required: true,
    },

    endTime: {
      type: String, // "14:00"
      required: true,
    },

    totalHours: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingReference: {
      type: String,
      unique: true,
      sparse: true
    },

    checkInOtp: {
      type: String,
    },

    otpUsed: {
      type: Boolean,
      default: false,
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },

    checkedInAt: Date,

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"],
      default: "PENDING",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("EventBooking", eventBookingSchema);
