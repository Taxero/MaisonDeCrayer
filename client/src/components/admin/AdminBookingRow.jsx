import { motion, AnimatePresence } from "motion/react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";
import AdminBookingExpanded from "./AdminBookingExpanded";

const AdminBookingRow = ({
  booking,
  isExpanded,
  onToggle,
  bookingType, // "STAY" | "EVENT"
}) => {
  return (
    <motion.div
      layout
      className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden"
    >
      {/* ===== ROW HEADER ===== */}
      <div
        onClick={onToggle}
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-white/5 transition"
      >
        {/* LEFT */}
        <div className="space-y-1">
          <p className="font-semibold text-white">
            {booking.room?.name}
          </p>

          {/* DATE / TIME INFO */}
          {bookingType === "STAY" ? (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {new Date(booking.checkIn).toDateString()} →{" "}
              {new Date(booking.checkOut).toDateString()}
            </p>
          ) : (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {new Date(booking.date).toDateString()}
              <span className="flex items-center gap-1 ml-2">
                <FaClock />
                {booking.startTime} → {booking.endTime}
              </span>
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* CHECKED-IN BADGE */}
          {booking.checkedIn && (
            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
              <FaUserCheck />
              Checked In
            </span>
          )}

          {/* AMOUNT */}
          <p className="font-semibold text-white">
            € {(booking.totalAmount).toFixed(2)}
          </p>

          {/* TOGGLE ICON */}
          {isExpanded ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </div>
      </div>

      {/* ===== EXPANDED ===== */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <AdminBookingExpanded
              booking={booking}
              bookingType={bookingType}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminBookingRow;
