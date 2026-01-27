const BookingDetails = ({
  booking,
  paymentInfo,
  canCancel,
  onCancel,
}) => {
  const isEventBooking = Boolean(booking.date);

  return (
    <div className="mt-6 space-y-6">
      {/* ================= OVERVIEW ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* PRICE */}
        <div
          className="border border-white/10 rounded-xl p-4"
          style={{ backgroundColor: "var(--rich-brown)" }}
        >
          <p className="text-xs uppercase text-white/60 mb-1">
            {isEventBooking ? "Price / Hour" : "Price / Night"}
          </p>
          <p className="text-lg font-semibold text-white">
            € {isEventBooking
              ? booking.room?.pricePerHour
              : booking.room?.pricePerNight}
          </p>
        </div>

        {/* ROOMS / DURATION */}
        <div
          className="border border-white/10 rounded-xl p-4"
          style={{ backgroundColor: "var(--rich-brown)" }}
        >
          <p className="text-xs uppercase text-white/60 mb-1">
            {isEventBooking ? "Duration" : "Rooms"}
          </p>
          <p className="text-lg font-semibold text-white">
            {isEventBooking
              ? `${booking.startTime} – ${booking.endTime}`
              : booking.roomsBooked}
          </p>
        </div>

        {/* DATE */}
        <div
          className="border border-white/10 rounded-xl p-4 col-span-2"
          style={{ backgroundColor: "var(--rich-brown)" }}
        >
          <p className="text-xs uppercase text-white/60 mb-1">
            {isEventBooking ? "Event Date" : "Stay Dates"}
          </p>
          <p className="text-sm text-white">
            {isEventBooking ? (
              new Date(booking.date).toLocaleDateString()
            ) : (
              <>
                {new Date(booking.checkIn).toLocaleDateString()} →{" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </>
            )}
          </p>
        </div>
      </div>

      {/* ================= PAYMENT STATUS ================= */}
      {paymentInfo && (
        <div
          className="rounded-xl border border-white/10 p-4"
          style={{ backgroundColor: "var(--rich-brown)" }}
        >
          <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
            Payment Status
          </p>

          <p className={`font-semibold ${paymentInfo.color}`}>
            {paymentInfo.text}
          </p>

          {booking.payment?.refundId && (
            <p className="text-xs text-white/50 mt-1">
              Refund ID: {booking.payment.refundId}
            </p>
          )}

          {booking.payment?.status === "REFUND_INITIATED" && (
            <p className="text-xs text-white/60 mt-1">
              ⏳ Refund will be credited within 5–7 working days
            </p>
          )}
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      {booking.status === "CONFIRMED" && (
        <div className="flex items-center justify-between gap-4">
          {canCancel ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel(booking._id);
              }}
              className="bg-red-500/90 hover:bg-red-500
                         text-white px-5 py-2 rounded-full
                         text-sm transition"
            >
              Cancel Booking
            </button>
          ) : (
            <p className="text-xs text-white/50">
              Cancellation is not allowed on or after the scheduled date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
