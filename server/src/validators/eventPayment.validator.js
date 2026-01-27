const { body } = require("express-validator");

exports.createEventPaymentValidator = [
  body("bookingId")
    .notEmpty()
    .withMessage("Booking ID is required")
    .isMongoId()
    .withMessage("Invalid booking ID format"),
];
