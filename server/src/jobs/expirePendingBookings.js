const cron = require("node-cron");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const EventBooking = require("../models/EventBooking");
const EventPayment = require("../models/EventPayment");

const EXPIRY_MINUTES = 15;

const expirePendingBookings = () => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const expiryTime = new Date(
        Date.now() - EXPIRY_MINUTES * 60 * 1000
      );

      // =========================
      // STAY BOOKINGS EXPIRY
      // =========================
      const expiredBookings = await Booking.find({
        status: "PENDING",
        createdAt: { $lte: expiryTime },
      });

      for (const booking of expiredBookings) {
        booking.status = "EXPIRED";
        await booking.save();

        if (booking.payment) {
          await Payment.findByIdAndUpdate(booking.payment, {
            status: "FAILED",
          });
        }
      }

      // =========================
      // EVENT BOOKINGS EXPIRY
      // =========================
      const expiredEventBookings = await EventBooking.find({
        status: "PENDING",
        createdAt: { $lte: expiryTime },
      });

      for (const eventBooking of expiredEventBookings) {
        eventBooking.status = "EXPIRED";
        await eventBooking.save();

        if (eventBooking.payment) {
          await EventPayment.findByIdAndUpdate(eventBooking.payment, {
            status: "FAILED",
          });
        }
      }

      if (
        expiredBookings.length > 0 ||
        expiredEventBookings.length > 0
      ) {
        console.log(
          `⏰ Expired ${expiredBookings.length} stay bookings, ${expiredEventBookings.length} event bookings`
        );
      }
    } catch (error) {
      console.error("❌ Expiry job failed:", error.message);
    }
  });
};

module.exports = expirePendingBookings;
