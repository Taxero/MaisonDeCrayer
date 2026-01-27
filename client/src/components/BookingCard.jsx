import { motion, AnimatePresence } from "motion/react";
import BookingDetails from "./BookingDetails";

const BookingCard = ({
  booking,
  bookingType = "STAY", // STAY | EVENT
  isExpanded,
  onToggle,
  paymentInfo,
  canCancel,
  onCancel,
  onGenerateOtp,
  otpLoading,
}) => {
  const bookingRef = booking.bookingReference;

  const isEvent = bookingType === "EVENT";

  return (
    <motion.div
      layout
      className="border border-white/10 rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--rich-brown)" }}
    >
      {/* ================= HEADER ================= */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 transition cursor-pointer hover:bg-black/20"
      >
        <div className="flex justify-between items-start gap-4">
          {/* LEFT */}
          <div>
            <p className="text-lg font-semibold text-white">
              {booking.room?.name}
            </p>

            {/* DATE / TIME */}
            <p className="text-sm text-white/60">
              {isEvent ? (
                <>
                  {new Date(booking.date).toDateString()} ·{" "}
                  {booking.startTime} – {booking.endTime}
                </>
              ) : (
                <>
                  {new Date(booking.checkIn).toDateString()} →{" "}
                  {new Date(booking.checkOut).toDateString()}
                </>
              )}
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <p className="text-lg font-semibold text-white">
              € {(booking.totalAmount).toFixed(2)}
            </p>

            <span
              className={`mt-1 inline-block text-xs px-3 py-1 rounded-full font-medium
                ${booking.status === "CONFIRMED"
                  ? "bg-green-500/15 text-green-400"
                  : booking.status === "CANCELLED"
                    ? "bg-red-500/15 text-red-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}
            >
              {booking.status}
            </span>
          </div>
        </div>
      </button>

      {/* ================= EXPANDED ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="px-5 pb-5 space-y-6"
          >
            {/* BOOKING REFERENCE */}
            <div className="border border-white/10 rounded-xl p-4 bg-black/30">
              <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
                Booking Reference
              </p>
              <p className="text-lg font-mono tracking-wider text-amber-400">
                {bookingRef}
              </p>
              <p className="text-xs text-white/50 mt-1">
                Please present this reference along with the OTP during check-in.
              </p>
            </div>

            {/* DETAILS */}
            <BookingDetails
              booking={booking}
              paymentInfo={paymentInfo}
              canCancel={canCancel}
              onCancel={onCancel}
            />

            {/* OTP SECTION */}
            {booking.status === "CONFIRMED" && !booking.checkedIn && (
              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-sm text-white/70">
                  A one-time verification code will be required at the time of
                  check-in to validate your booking.
                </p>

                <button
                  onClick={() => onGenerateOtp(booking._id)}
                  disabled={otpLoading}
                  className="rounded-full bg-amber-500 text-black px-6 py-2
                             font-semibold hover:bg-amber-400 transition
                             disabled:opacity-60"
                >
                  {otpLoading
                    ? "Generating OTP…"
                    : "Generate Check-In OTP"}
                </button>
              </div>
            )}

            {/* CHECKED IN INFO */}
            {booking.checkedIn && (
              <p className="text-sm text-green-400 font-medium">
                Guest has already checked in. OTP verification is no longer
                required.
              </p>
            )}

            {/* DELETE (CANCELLED) */}
            {booking.status === "CANCELLED" && (
              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={() => onCancel(booking._id)}
                  className="text-sm text-red-400 hover:text-red-300 transition"
                >
                  Remove this cancelled booking
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingCard;
