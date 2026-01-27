const { body, param } = require("express-validator");

exports.createRoomValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Room name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Room description is required"),

  body("roomCategory")
    .isIn(["STAY", "EVENT"])
    .withMessage("Room category must be STAY or EVENT"),

  body("pricePerNight")
    .optional()
    .isNumeric()
    .withMessage("price per night must be a number"),

  body("pricePerHour")
    .optional()
    .isNumeric()
    .withMessage("price per hour must be a number"),

  body("maxGuests")
    .isInt({ min: 1 })
    .withMessage("Max guests must be at least 1"),

  body("totalRooms")
    .isInt({ min: 1 })
    .withMessage("Total rooms must be at least 1"),

  body("amenities")
    .optional()
    .isArray()
    .withMessage("Amenities must be an array"),

  body("amenities.*")
    .optional()
    .isString()
    .withMessage("Each amenity must be a string"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*.url")
    .optional()
    .isURL()
    .withMessage("Image URL must be valid"),

  body("images.*.public_id")
    .optional()
    .notEmpty()
    .withMessage("Image public_id is required"),
];

exports.updateRoomValidator = [
  param("roomId")
    .isMongoId()
    .withMessage("Invalid room ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Room name cannot be empty"),

  body("roomCategory")
    .optional()
    .isIn(["STAY", "EVENT"])
    .withMessage("Room category must be STAY or EVENT"),

  body("pricePerNight")
    .optional()
    .isNumeric()
    .withMessage("Price per night must be numeric"),

  body("pricePerHour")
    .optional()
    .isNumeric()
    .withMessage("price per hour must be a number"),

  body("maxGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max guests must be at least 1"),

  body("totalRooms")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total rooms must be at least 1"),

  body("amenities")
    .optional()
    .isArray()
    .withMessage("Amenities must be an array"),

  body("amenities.*")
    .optional()
    .isString()
    .withMessage("Each amenity must be a string"),
];


exports.roomIdParamValidator = [
  param("roomId")
    .isMongoId()
    .withMessage("Invalid room ID"),
];

exports.addRoomImagesValidator = [
  param("roomId").isMongoId().withMessage("Invalid room ID"),

  body("images")
    .isArray({ min: 1 })
    .withMessage("Images array is required"),

  body("images.*.url")
    .isURL()
    .withMessage("Image URL must be valid"),

  body("images.*.public_id")
    .notEmpty()
    .withMessage("Image public_id is required"),
];

exports.deleteRoomImageValidator = [
  param("roomId").isMongoId().withMessage("Invalid room ID"),
  param("imageId").isMongoId().withMessage("Invalid image ID"),
];

