const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/payment.routes");
const bookingRoutes = require("./routes/booking.routes")
const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const eventBookingRoutes = require("./routes/eventBooking.routes")
const eventPaymentRoutes = require("./routes/eventPayment.routes")
const adminBookingRoutes = require("./routes/admin.booking.routes");
const adminRoomRoutes = require("./routes/admin.room.routes")
const errorHandler = require("./middlewares/error.middleware");
const contactRoutes = require("./routes/contact.routes")
const webhookController = require("./controllers/webhook.controller")

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true
}));

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  webhookController.stripeWebhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes)
app.use("/api/payments", paymentRoutes);
app.use("/api/events/bookings", eventBookingRoutes);
app.use("/api/events/payments", eventPaymentRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/admin/rooms", adminRoomRoutes)
app.use("/api/admin/bookings", adminBookingRoutes);
app.use(errorHandler);


// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hotel Booking API is running 🚀",
  });
});

module.exports = app;
