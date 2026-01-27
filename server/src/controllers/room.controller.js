const { matchedData } = require("express-validator");
const Room = require("../models/Room");
const AppError = require("../utils/AppError");
const cloudinary = require("../config/cloudinary");

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ isActive: true });

    res.json({
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const { roomId } = matchedData(req, { locations: ["params"] });

    const room = await Room.findOne({
      _id: roomId,
      isActive: true, // public route
    });

    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    res.json({ room });
  } catch (error) {
    next(error);
  }
};
