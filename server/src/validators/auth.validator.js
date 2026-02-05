const { body } = require("express-validator");

exports.registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("phone")
    .matches(/^\+?[0-9\s-]{8,15}$/)
    .withMessage("Enter a valid international phone number"),


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
