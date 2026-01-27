const stripe = require("../config/stripe");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const EventBooking = require("../models/EventBooking");
const EventPayment = require("../models/EventPayment");
const WebhookEvent = require("../models/WebhookEvent");
const { generateBookingReference } = require("../utils/bookingUtils");

exports.stripeWebhook = async (req, res) => {
  try {
    console.log("🔥 Stripe webhook hit");

    const signature = req.headers["stripe-signature"];
    if (!signature) {
      return res.status(400).json({ message: "Missing Stripe signature" });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Invalid Stripe signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const eventType = event.type;
    console.log("2️⃣ Event type:", eventType);

    // ==============================
    // 🔐 IDEMPOTENCY KEY
    // ==============================
    const stripeObject = event.data.object;
    const eventId = `${eventType}_${stripeObject.id}`;

    const alreadyProcessed = await WebhookEvent.findOne({ eventId });
    if (alreadyProcessed) {
      console.log("⚠️ Duplicate webhook ignored");
      return res.status(200).json({ received: true });
    }

    await WebhookEvent.create({ eventId, eventType });

    // ==============================
    // 💳 PAYMENT SUCCESS
    // ==============================
    if (eventType === "payment_intent.succeeded") {
      const paymentIntent = stripeObject;
      const bookingId = paymentIntent.metadata.bookingId;

      console.log("3️⃣ Payment succeeded for booking:", bookingId);

      // -------- STAY BOOKING --------
      const stayPayment = await Payment.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (stayPayment) {
        stayPayment.status = "PAID";
        await stayPayment.save();

        await Booking.findByIdAndUpdate(stayPayment.booking, {
          status: "CONFIRMED",
          payment: stayPayment._id,
          bookingReference: generateBookingReference(),
        });

        console.log("✅ Stay booking confirmed");
        return res.status(200).json({ received: true });
      }

      // -------- EVENT BOOKING --------
      const eventPayment = await EventPayment.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (eventPayment) {
        eventPayment.status = "PAID";
        await eventPayment.save();

        await EventBooking.findByIdAndUpdate(eventPayment.eventBooking, {
          status: "CONFIRMED",
          payment: eventPayment._id,
          bookingReference: generateBookingReference(),
        });

        console.log("✅ Event booking confirmed");
        return res.status(200).json({ received: true });
      }

      console.log("⚠️ No matching payment found for intent:", paymentIntent.id);
    }

    // ==============================
    // 🔄 PAYMENT REFUNDED
    // ==============================
    if (eventType === "charge.refunded") {
      const charge = stripeObject;

      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: charge.payment_intent },
        {
          status: "REFUNDED",
          refundStatus: "PROCESSED",
          refundId: charge.id,
        }
      );

      await EventPayment.findOneAndUpdate(
        { stripePaymentIntentId: charge.payment_intent },
        {
          status: "REFUNDED",
          refundStatus: "PROCESSED",
          refundId: charge.id,
        }
      );

      console.log("🔄 Refund processed");
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ STRIPE WEBHOOK CRASHED:", error);
    res.status(500).json({ message: "Webhook crashed" });
  }
};
