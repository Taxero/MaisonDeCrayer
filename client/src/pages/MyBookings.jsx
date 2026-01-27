import { useEffect, useState } from "react";
import api from "../api/axios";
import BookingSkeleton from "../components/BookingSkeleton";
import BookingCard from "../components/BookingCard";
import { motion, AnimatePresence } from "motion/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [bookingType, setBookingType] = useState("STAY"); // STAY | EVENT
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(null);
  const [otpBookingId, setOtpBookingId] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const toggleBooking = (id) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  /* ---------- FETCH BOOKINGS ---------- */
  const fetchBookings = async () => {
    setLoading(true);
    setExpandedBookingId(null);

    try {
      const endpoint = bookingType === "EVENT" ? "/events/bookings/my" : "/bookings/my";
      const res = await api.get(endpoint);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [bookingType]);

  /* ---------- CANCEL LOGIC ---------- */
  const canCancelBooking = (booking) => {
    if (booking.checkedIn) return false;

    // EVENT booking → allow cancel until event date
    if (bookingType === "EVENT") {
      return new Date() < new Date(booking.date);
    }

    // STAY booking
    const today = new Date();
    const checkIn = new Date(booking.checkIn);
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    return today < checkIn;
    return true
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    const endpoint =
      bookingType === "EVENT"
        ? `/events/bookings/cancel/${id}`
        : `/bookings/cancel/${id}`;

    await api.post(endpoint);
    fetchBookings();
  };

  /* ---------- PAYMENT STATUS ---------- */
  const getPaymentDisplay = (payment) => {
    if (!payment) return null;
    if (payment.status === "PAID")
      return { text: "Payment Successful", color: "text-green-400" };
    if (payment.status === "REFUND_INITIATED")
      return { text: "Refund Initiated", color: "text-amber-400" };
    if (payment.status === "REFUNDED")
      return { text: "Refunded", color: "text-green-400" };
    if (payment.status === "FAILED")
      return { text: "Payment Failed", color: "text-red-400" };
    return null;
  };

  /* ---------- OTP ---------- */
  const handleGenerateOtp = async (bookingId) => {
    setOtpLoading(true);
    setOtpBookingId(bookingId);

    try {
      const endpoint =
        bookingType === "EVENT"
          ? `/events/bookings/otp/${bookingId}`
          : `/bookings/otp/${bookingId}`;

      const res = await api.get(endpoint);
      setOtpValue(res.data.otp);
      setOtpModalOpen(true);
    } catch {
      alert("Failed to generate OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-6 pt-28 pb-12 text-white"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif">My Bookings</h1>

        {/* 🔁 BOOKING TYPE SWITCH */}
        <div className="flex gap-3">
          {["STAY", "EVENT"].map((type) => (
            <button
              key={type}
              onClick={() => setBookingType(type)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${bookingType === type
                  ? "bg-amber-500 text-black"
                  : "border border-white/20 text-white/70 hover:bg-white/10"
                }`}
            >
              {type === "STAY" ? "Stay Bookings" : "Event Bookings"}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <BookingSkeleton key={i} />
          ))}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <p className="text-white/60">
            No {bookingType.toLowerCase()} bookings found.
          </p>
        )}

        {/* BOOKINGS */}
        {!loading && bookings.length > 0 && (
          <motion.div layout className="space-y-5">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                bookingType={bookingType}
                isExpanded={expandedBookingId === booking._id}
                onToggle={() => toggleBooking(booking._id)}
                paymentInfo={getPaymentDisplay(booking.payment)}
                canCancel={canCancelBooking(booking)}
                onCancel={cancelBooking}
                onGenerateOtp={handleGenerateOtp}
                otpLoading={otpLoading && otpBookingId === booking._id}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* 🔐 OTP MODAL (UNCHANGED) */}
      <AnimatePresence>
        {otpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-md w-full rounded-2xl p-6 border border-white/10 text-center"
              style={{ backgroundColor: "var(--rich-brown)" }}
            >
              <h2 className="text-2xl font-serif mb-4">
                Check-In Verification Code
              </h2>

              <div className="text-4xl font-bold tracking-widest text-amber-400 mb-4">
                {otpValue}
              </div>

              <p className="text-sm text-white/70 mb-6">
                This code will be required during check-in.
                <br />
                It is not stored — please remember it or regenerate if required.
              </p>

              <button
                onClick={() => {
                  setOtpModalOpen(false);
                  setOtpValue(null);
                  setOtpBookingId(null);
                }}
                className="w-full rounded-full bg-amber-500 text-black py-3 font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
