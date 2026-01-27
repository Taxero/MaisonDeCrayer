const express = require("express");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const adminRoomController = require("../controllers/admin.room.controller")
const {
  createRoomValidator,
  updateRoomValidator,
  roomIdParamValidator,
  addRoomImagesValidator,
  deleteRoomImageValidator,
} = require("../validators/admin.room.validator");

const router = express.Router();


router.get(
  "/",
  auth,
  admin,
  adminRoomController.getAllRoomsAdmin
);

router.post(
  "/",
  auth,
  admin,
  createRoomValidator,
  validate,
  adminRoomController.createRoom
);

router.delete(
  "/:roomId/permanent",
  auth,
  admin,
  roomIdParamValidator,
  validate,
  adminRoomController.deleteRoom
);

router.put(
  "/:roomId",
  auth,
  admin,
  updateRoomValidator,
  validate,
  adminRoomController.updateRoom
);

router.delete(
  "/:roomId",
  auth,
  admin,
  roomIdParamValidator,
  validate,
  adminRoomController.disableRoom
);

router.patch(
  "/:roomId/enable",
  auth,
  admin,
  roomIdParamValidator,
  validate,
  adminRoomController.enableRoom
);

router.post(
  "/:roomId/images",
  auth,
  admin,
  addRoomImagesValidator,
  validate,
  adminRoomController.addRoomImages
);

// Delete image
router.delete(
  "/:roomId/images/:imageId",
  auth,
  admin,
  deleteRoomImageValidator,
  validate,
  adminRoomController.deleteRoomImage
);



module.exports = router;
