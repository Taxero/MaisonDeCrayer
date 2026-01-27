const { matchedData } = require("express-validator");
const Room = require("../models/Room");
const AppError = require("../utils/AppError");
const cloudinary = require("../config/cloudinary");

exports.getAllRoomsAdmin = async (req, res, next) => {
  try {
    let filter = {}
    if (req.query.category) {
      filter.roomCategory = req.query.category;
    }

    const rooms = await Room.find(filter);

    res.json({
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const room = await Room.create(data);

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { roomId } = matchedData(req, { locations: ["params"] });

    // 1️⃣ Fetch room inside transaction
    const room = await Room.findById(roomId).session(session);
    if (!room) {
      await session.abortTransaction();
      return next(new AppError("Room not found", 404));
    }

    // 2️⃣ Delete images from Cloudinary (external, non-transactional)
    if (room.images && room.images.length > 0) {
      for (const image of room.images) {
        if (image.public_id) {
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (err) {
            // Log but DO NOT abort DB transaction
            console.error(
              "Cloudinary delete failed:",
              image.public_id,
              err.message
            );
          }
        }
      }
    }

    // 3️⃣ Delete room from DB (transaction-protected)
    await room.deleteOne({ session });

    // 4️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    // Rollback DB changes
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const { roomId, ...updateData } = matchedData(req, {
      locations: ["params", "body"],
    });

    const room = await Room.findByIdAndUpdate(
      roomId,
      updateData,
      { new: true }
    );

    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    res.json({
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    next(error);
  }
};

exports.disableRoom = async (req, res, next) => {
  try {
    const { roomId } = matchedData(req, { locations: ["params"] });

    const room = await Room.findByIdAndUpdate(
      roomId,
      { isActive: false },
      { new: true }
    );

    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    res.json({
      message: "Room disabled successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.enableRoom = async (req, res, next) => {
  try {
    const { roomId } = matchedData(req, { locations: ["params"] });

    const room = await Room.findByIdAndUpdate(
      roomId,
      { isActive: true },
      { new: true }
    );

    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    res.json({
      message: "Room enabled successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.addRoomImages = async (req, res, next) => {
  try {
    const { roomId, images } = matchedData(req, {
      locations: ["params", "body"],
    });

    const room = await Room.findById(roomId);
    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    room.images.push(...images);
    await room.save();

    res.json({
      message: "Images added successfully",
      images: room.images,
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteRoomImage = async (req, res, next) => {
  try {
    const { roomId, imageId } = matchedData(req, {
      locations: ["params"],
    });

    const room = await Room.findById(roomId);
    if (!room) {
      return next(new AppError("Room not found", 404));
    }

    const image = room.images.find(
      (img) => img._id.toString() === imageId
    );

    if (!image) {
      return next(new AppError("Image not found", 404));
    }

    // 1️⃣ delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // 2️⃣ remove from array (THIS is the fix)
    room.images = room.images.filter(
      (img) => img._id.toString() !== imageId
    );

    await room.save();

    res.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
