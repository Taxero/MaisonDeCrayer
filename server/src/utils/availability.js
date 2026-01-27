const Booking = require("../models/Booking");

/**
 * Check room availability for given date range
 * @param {ObjectId} roomId
 * @param {Date} checkIn
 * @param {Date} checkOut
 * @returns {Number} total rooms already booked
 */
module.exports.getBookedRoomsCount = async (roomId, checkIn, checkOut) => {
  const bookings = await Booking.find({
    room: roomId,
    status: { $in: ["PENDING", "CONFIRMED"] },
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });

  let totalBooked = 0;

  for (const booking of bookings) {
    totalBooked += booking.roomsBooked;
  }

  return totalBooked;
};
