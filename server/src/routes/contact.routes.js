const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact.controller");
const {
  createContactValidator,
  contactIdParamValidator,
} = require("../validators/contact.validator");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const validate = require("../middlewares/validate.middleware");

// Public – Contact form
router.post(
  "/",
  createContactValidator,
  validate,
  contactController.createContact
);

// Admin – Get all messages
router.get(
  "/admin",
  auth,
  admin,
  contactController.getAllContacts
);

// Admin – Mark as read
router.patch(
  "/admin/:contactId/read",
  auth,
  admin,
  contactIdParamValidator,
  validate,
  contactController.markAsRead
);

// Admin – Delete message
router.delete(
  "/admin/:contactId",
  auth,
  admin,
  contactIdParamValidator,
  validate,
  contactController.deleteContact
);

module.exports = router;
