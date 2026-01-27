const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createEventPaymentIntent,
} = require("../controllers/eventPayment.controller");

const {
  createEventPaymentValidator,
} = require("../validators/eventPayment.validator");

/**
 * EVENT: Create Stripe PaymentIntent
 * POST /api/events/payments/create-intent
 */
router.post(
  "/create-intent",
  auth,
  createEventPaymentValidator,
  validate,
  createEventPaymentIntent
);

module.exports = router;
