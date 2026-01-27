import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { motion } from "motion/react";

const EventPaymentSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`events/bookings/${bookingId}`);
        setBooking(res.data.booking);
      } catch (err) {
        console.error("Failed to load booking");
      }
    };

    fetchBooking();

    const timer = setTimeout(() => {
      navigate("/my-bookings");
    }, 4000);

    return () => clearTimeout(timer);
  }, [bookingId, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-lg w-full text-center border border-white/10 rounded-3xl p-10"
        style={{ backgroundColor: "var(--rich-brown)" }}
      >
        {/* SUCCESS ICON */}
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg">
          <span className="text-3xl">✓</span>
        </div>

        <h1 className="text-3xl font-serif text-white mb-2">
          Payment Successful
        </h1>

        <p className="text-white/70 mb-8">
          Your booking has been confirmed successfully.
        </p>

        {/* BOOKING DETAILS */}
        {booking ? (
          <div className="border border-white/10 rounded-2xl p-6 text-left space-y-3 bg-black/20">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Room</span>
              <span className="text-white font-medium">
                {booking.room?.name}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/60">Date</span>
              <span className="text-white">
                {booking.date}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/60">Time </span>
              <span className="text-white">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>

            <div className="border-t border-white/10 my-2" />

            <div className="flex justify-between items-center">
              <span className="text-white/70 font-medium">
                Total Paid
              </span>
              <span className="text-xl font-semibold text-amber-400">
                € {(booking.totalAmount).toFixed(2)}
              </span>
            </div>

            <div className="text-sm text-green-400 font-semibold">
              Status: {booking.status}
            </div>
          </div>
        ) : (
          <p className="text-white/60">
            Loading booking details…
          </p>
        )}

        {/* REDIRECT INFO */}
        <p className="mt-8 text-xs text-white/50">
          Redirecting to{" "}
          <span className="text-white/70">My Bookings</span> in a
          few seconds…
        </p>
      </motion.div>
    </div>
  );
};

export default EventPaymentSuccess;
