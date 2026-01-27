const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    roomsBooked: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "EXPIRED", "CANCELLED"],
      default: "PENDING",
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    // ✅ CHECK-IN SYSTEM
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
