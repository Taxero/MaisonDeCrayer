const { body, param } = require("express-validator");

exports.checkEventAvailabilityValidator = [
  body("roomId")
    .isMongoId()
    .withMessage("Invalid room ID"),

  body("date")
    .isISO8601()
    .withMessage("Valid date required"),

  body("startTime")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start time must be HH:mm"),

  body("endTime")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("End time must be HH:mm"),
];

exports.createEventBookingValidator = [
  body("roomId")
    .isMongoId()
    .withMessage("Invalid room ID"),

  body("date")
    .isISO8601()
    .withMessage("Valid date is required"),

  body("startTime")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start time must be HH:mm"),

  body("endTime")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("End time must be HH:mm"),
];


exports.eventBookingIdParamValidator = [
  param("bookingId")
    .isMongoId()
    .withMessage("Invalid event booking ID"),
];

