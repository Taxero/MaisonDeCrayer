const { param, query, body } = require("express-validator");

exports.bookingIdParamValidator = [
  param("bookingId")
    .isMongoId()
    .withMessage("Invalid booking ID"),
];

exports.getBookingsQueryValidator = [
  query("status")
    .optional()
    .isIn(["PENDING", "CONFIRMED", "CANCELLED"])
    .withMessage("Invalid booking status"),

  query("from")
    .optional()
    .isISO8601()
    .withMessage("Invalid from date"),

  query("to")
    .optional()
    .isISO8601()
    .withMessage("Invalid to date"),
];

exports.checkInValidator = [
  body("bookingReference")
    .notEmpty()
    .isString()
    .withMessage("bookingReference is required and must be string"),

  body("otp")
    .notEmpty()
    .isString()
    .withMessage("OTP must be string and required ")
]
