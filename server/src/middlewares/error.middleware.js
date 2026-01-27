const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Default values
  error.statusCode = error.statusCode || 500;

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new AppError("Duplicate field value", 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || "Server Error",
  });
};
