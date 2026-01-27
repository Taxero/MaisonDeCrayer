const { body, param } = require("express-validator");

exports.createContactValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("phone")
    .notEmpty()
    .isString()
    .withMessage("phone is required"),

  body("subject")
    .notEmpty()
    .isString()
    .withMessage("subject is required "),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required"),
];

exports.contactIdParamValidator = [
  param("contactId")
    .isMongoId()
    .withMessage("Invalid contact ID"),
];
