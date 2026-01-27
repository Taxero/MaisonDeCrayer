const Contact = require("../models/Contact");
const { matchedData } = require("express-validator");
const AppError = require("../utils/AppError");

/**
 * Public: Create contact message
 */
exports.createContact = async (req, res, next) => {
  try {
    const data = matchedData(req);

    const contact = await Contact.create(data);

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all messages
 */
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Mark message as read / unread
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const { contactId } = matchedData(req, { locations: ["params"] });

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(new AppError("Message not found", 404));
    }

    contact.isRead = true;
    await contact.save();

    res.json({
      message: "Message marked as read",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete message
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const { contactId } = matchedData(req, { locations: ["params"] });

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(new AppError("Message not found", 404));
    }

    await contact.deleteOne();

    res.json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
