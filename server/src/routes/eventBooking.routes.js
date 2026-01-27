const express = require("express");
const router = express.Router();

const {
  createEventBooking,
  checkEventAvailability,
  cancelEventBooking,
  getMyEventBookings,
  getEventCheckInOtp,
  getEventBookingById
} = require("../controllers/eventBooking.controller");

const {
  createEventBookingValidator,
  checkEventAvailabilityValidator,
  eventBookingIdParamValidator
} = require("../validators/eventBooking.validator");

const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");


router.post(
  "/check-availability",
  checkEventAvailabilityValidator,
  validate,
  checkEventAvailability
);

// User: Create event booking
router.post(
  "/create",
  auth,
  createEventBookingValidator,
  validate,
  createEventBooking
);

router.get(
  "/my",
  auth,
  getMyEventBookings
);

router.get(
  "/:bookingId",
  auth,
  eventBookingIdParamValidator,
  validate,
  getEventBookingById
);

router.get(
  "/otp/:bookingId",
  auth,
  eventBookingIdParamValidator,
  validate,
  getEventCheckInOtp
);

router.post(
  "/cancel/:bookingId",
  auth,
  eventBookingIdParamValidator,
  validate,
  cancelEventBooking
);

module.exports = router;
