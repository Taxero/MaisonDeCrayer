const express = require("express")
const adminBookingController = require("../controllers/admin.booking.controller");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const validate = require("../middlewares/validate.middleware");
const adminCheckInController = require("../controllers/admin.checkIn.controller")
const {
  bookingIdParamValidator,
  getBookingsQueryValidator,
  checkInValidator
} = require("../validators/admin.booking.validator");

const router = express.Router();

router.get(
  "/",
  auth,
  admin,
  getBookingsQueryValidator,
  validate,
  adminBookingController.getAllBookings
);

router.get(
  "/event",
  auth,
  admin,
  getBookingsQueryValidator,
  validate,
  adminBookingController.getAllEventBookings
);

// router.get(
//   "/:bookingId",
//   auth,
//   admin,
//   // bookingIdParamValidator,
//   // validate,
//   adminBookingController.getBookingById
// );

router.post("/checkin",
  auth,
  admin,
  checkInValidator,
  validate,
  adminCheckInController.checkIsStayBooking
);

router.post("/event/checkin",
  auth,
  admin,
  checkInValidator,
  validate,
  adminCheckInController.checkInEventBooking
);

module.exports = router;
