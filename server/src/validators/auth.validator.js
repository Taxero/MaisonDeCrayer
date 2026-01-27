const { body } = require("express-validator");

exports.registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone should be equal to 10 digit"),

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
