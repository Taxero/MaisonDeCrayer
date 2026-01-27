const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking.controller");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const {
  checkAvailabilityValidator,
  createBookingValidator,
  bookingIdParamValidator,
  cancelBookingValidator,
} = require("../validators/booking.validator");

// Check availability
router.post(
  "/check-availability",
  checkAvailabilityValidator,
  validate,
  bookingController.checkAvailability
);

// Create booking (PENDING)
router.post(
  "/create",
  auth,
  createBookingValidator,
  validate,
  bookingController.createBooking
);

router.get(
  "/my",
  auth,
  bookingController.getMyBookings
);

router.get(
  "/:bookingId",
  auth,
  bookingIdParamValidator,
  validate,
  bookingController.getBookingById
);

router.get(
  "/otp/:bookingId",
  auth,
  bookingIdParamValidator,
  validate,
  bookingController.getCheckInOtp
);

router.post(
  "/cancel/:bookingId",
  auth,
  cancelBookingValidator,
  validate,
  bookingController.cancelBooking
);

module.exports = router;
