const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    roomCategory: {
      type: String,
      enum: ["STAY", "EVENT"],
      default: "STAY",
      required: true,
    },

    // STAY rooms
    pricePerNight: {
      type: Number,
      required: function () {
        return this.roomCategory === "STAY";
      },
    },

    // EVENT / LOUNGE rooms
    pricePerHour: {
      type: Number,
      required: function () {
        return this.roomCategory === "EVENT";
      },
    },

    maxGuests: {
      type: Number,
      required: true,
    },

    // Only meaningful for STAY
    totalRooms: {
      type: Number,
      default: 1,
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
