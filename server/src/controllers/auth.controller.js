const jwt = require("jsonwebtoken");
const { matchedData } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

exports.register = async (req, res, next) => {
  try {
    const data = matchedData(req);

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return next(new AppError("Email already exists", 401));
    }

    // ✅ Normalize phone number
    if (data.phone) {
      const phone = parsePhoneNumberFromString(data.phone);
      data.phone = phone.number;
    }

    await User.create(data);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error); // centralized error handler
  }
};


exports.login = async (req, res, next) => {
  try {
    const data = matchedData(req);
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error); // ✅ centralized error handler
  }
};
