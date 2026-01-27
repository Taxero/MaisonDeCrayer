const express = require("express");
const roomController = require("../controllers/room.controller");
const validate = require("../middlewares/validate.middleware");
const {
  roomIdParamValidator,
} = require("../validators/admin.room.validator");

const router = express.Router();

router.get("/", roomController.getRooms);

router.get(
  "/:roomId",
  roomIdParamValidator,
  validate,
  roomController.getRoomById
);


module.exports = router;
