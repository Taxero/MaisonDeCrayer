const { body } = require("express-validator");
const { param } = require("express-validator");

exports.checkAvailabilityValidator = [
  body("roomId")
    .notEmpty()
    .withMessage("Room ID is required"),

  body("checkIn")
    .isISO8601()
    .withMessage("Check-in date must be a valid date"),

  body("checkOut")
    .isISO8601()
    .withMessage("Check-out date must be a valid date"),

  body("roomsRequested")
    .isInt({ min: 1 })
    .withMessage("Rooms requested must be at least 1"),
];

exports.createBookingValidator = [
  body("roomId")
    .notEmpty()
    .withMessage("Room ID is required"),

  body("checkIn")
    .isISO8601()
    .withMessage("Check-in date must be valid"),

  body("checkOut")
    .isISO8601()
    .withMessage("Check-out date must be valid"),

  body("roomsBooked")
    .isInt({ min: 1 })
    .withMessage("Rooms booked must be at least 1"),
];

exports.bookingIdParamValidator = [
  param("bookingId")
    .isMongoId()
    .withMessage("Invalid booking ID"),
];


exports.cancelBookingValidator = [
  param("bookingId")
    .isMongoId()
    .withMessage("Invalid booking ID"),
];
