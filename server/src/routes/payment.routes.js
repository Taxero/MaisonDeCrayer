const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");

const {
  createPaymentIntentValidator,
} = require("../validators/payment.validator");

/**
 * STAY: Create Stripe PaymentIntent
 * POST /api/payments/create-intent
 */
router.post(
  "/create-intent",
  auth,
  createPaymentIntentValidator,
  validate,
  paymentController.createPaymentIntent
);

module.exports = router;
