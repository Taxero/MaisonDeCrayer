const { body } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

exports.registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("phone")
    .custom((value) => {
      const phone = parsePhoneNumberFromString(value);

      if (!phone || !phone.isValid()) {
        throw new Error("Enter a valid phone number");
      }

      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
