import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const AdminBookingExpanded = ({ booking, bookingType }) => {
  return (
    <div className="border-t border-white/10 p-5 grid md:grid-cols-2 gap-6 text-sm">
      {/* ================= LEFT ================= */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white">
          Guest Details
        </h4>

        <p className="flex items-center gap-2 text-gray-300">
          <FaUser />
          {booking.user?.name}
        </p>

        <p className="flex items-center gap-2 text-gray-300">
          <FaEnvelope />
          {booking.user?.email}
        </p>

        {/* <p className="flex items-center gap-2 text-gray-300">
          <FaPhone />
          {booking.user?.phone}
        </p> */}
        {/* BOOKING REFERENCE */}

        <div className="border border-white/10 rounded-xl p-4 bg-black/30">
          <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
            Booking Reference
          </p>
          <p className="text-md font-mono tracking-wider text-amber-400">
            {booking.bookingReference}
          </p>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white">
          Booking Details
        </h4>

        {/* ROOM */}
        <p className="flex items-center gap-2 text-gray-300">
          <FaBed />
          {booking.room?.name}
        </p>

        {/* STAY VS EVENT */}
        {bookingType === "STAY" ? (
          <>
            <p className="flex items-center gap-2 text-gray-300">
              <FaCalendarAlt />
              {new Date(booking.checkIn).toDateString()} →{" "}
              {new Date(booking.checkOut).toDateString()}
            </p>

            <p className="flex items-center gap-2 text-gray-300">
              <FaUsers />
              Rooms Booked: {booking.roomsBooked}
            </p>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2 text-gray-300">
              <FaCalendarAlt />
              {new Date(booking.date).toDateString()}
            </p>

            <p className="flex items-center gap-2 text-gray-300">
              <FaClock />
              {booking.startTime} → {booking.endTime}
            </p>
          </>
        )}

        {/* PAYMENT */}
        <p className="flex items-center gap-2 font-semibold text-amber-400">
          <FaMoneyBillWave />
          € {(booking.totalAmount).toFixed(2)}
        </p>

        {/* STATUS */}
        <p className="text-xs text-gray-400">
          Status:{" "}
          <span className="text-white font-medium">
            {booking.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminBookingExpanded;
