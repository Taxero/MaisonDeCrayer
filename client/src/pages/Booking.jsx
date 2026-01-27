import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Booking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  // STAY
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsRequested, setRoomsRequested] = useState(1);

  // EVENT
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEvent = room?.roomCategory === "EVENT";

  /* ---------- HELPERS ---------- */
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  };

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = end - start;
    return diff > 0 ? diff / (1000 * 60 * 60) : 0;
  };

  const nights = calculateNights();
  const hours = calculateHours();

  const totalPrice =
    room &&
    (isEvent
      ? hours * room.pricePerHour
      : nights * room.pricePerNight * roomsRequested);

  /* ---------- CHECK AVAILABILITY ---------- */
  const checkAvailability = async () => {
    setLoading(true);
    setAvailability(null);

    try {
      if (isEvent) {
        if (!eventDate || !startTime || !endTime) {
          toast.error("Please select date and time");
          return;
        }
        if (hours <= 0) {
          toast.error("End time must be after start time");
          return;
        }

        const res = await api.post(
          "/events/bookings/check-availability",
          {
            roomId,
            date: eventDate,
            startTime,
            endTime,
          }
        );

        setAvailability(res.data);
      } else {
        if (!checkIn || !checkOut) {
          toast.error("Please select check-in and check-out dates");
          return;
        }
        if (nights <= 0) {
          toast.error("Check-out must be after check-in");
          return;
        }

        const res = await api.post(
          "/bookings/check-availability",
          {
            roomId,
            checkIn,
            checkOut,
            roomsRequested,
          }
        );

        setAvailability(res.data);
      }
    } catch {
      toast.error("Failed to check availability");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CREATE BOOKING ---------- */
  const createBooking = async () => {
    try {
      if (isEvent) {
        const res = await api.post("/events/bookings/create", {
          roomId,
          date: eventDate,
          startTime,
          endTime,
        })
        navigate(`/event-payment/${res.data.booking._id}`);
      }
      else {
        const res = await api.post("/bookings/create", {
          roomId,
          checkIn,
          checkOut,
          roomsBooked: roomsRequested,
        });
        navigate(`/payment/${res.data.booking._id}`);
      }
    } catch {
      toast.error("Booking failed");
    }
  };

  /* ---------- LOAD ROOM ---------- */
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await api.get(`/rooms/${roomId}`);
      setRoom(res.data.room);
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div
      className="min-h-screen pt-28 pb-12 px-4 text-white"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl mx-auto space-y-10"
      >
        <h1 className="text-3xl font-serif text-center">
          {isEvent ? "Reserve Event Space" : "Book Your Stay"}
        </h1>

        {/* FORM CARD (same UI) */}
        <div
          className="border border-white/10 rounded-2xl p-6 space-y-6"
          style={{ backgroundColor: "var(--rich-brown)" }}
        >
          {/* CONDITIONAL INPUTS */}
          {isEvent ? (
            <>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
                />
              </div>

              <input
                type="number"
                min="1"
                value={roomsRequested}
                onChange={(e) =>
                  setRoomsRequested(Number(e.target.value))
                }
                className="w-full bg-black/30 border border-white/20 px-4 py-3 rounded-lg"
              />
            </>
          )}

          {/* 🔁 SAME SUMMARY UI */}
          {(isEvent ? hours > 0 : nights > 0) && (
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/25">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              <div className="p-4 space-y-4">
                {/* HEADER */}
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/60">
                  <span>{isEvent ? "Event Summary" : "Stay Summary"}</span>
                  <span className="text-amber-400">
                    {isEvent
                      ? `${hours.toFixed(2)} hour${hours > 1 ? "s" : ""}`
                      : `${nights} night${nights > 1 ? "s" : ""}`}
                  </span>
                </div>

                {/* BREAKDOWN */}
                <div className="space-y-1 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>
                      ₹{isEvent ? room.pricePerHour : room.pricePerNight} ×{" "}
                      {isEvent ? hours.toFixed(2) : nights}
                    </span>
                    <span className="text-white">
                      ₹{isEvent
                        ? room.pricePerHour * hours
                        : room.pricePerNight * nights}
                    </span>
                  </div>

                  {!isEvent && (
                    <div className="flex justify-between">
                      <span>Rooms</span>
                      <span className="text-white">{roomsRequested}</span>
                    </div>
                  )}
                </div>

                {/* DIVIDER */}
                <div className="border-t border-white/10" />

                {/* TOTAL */}
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-xl font-semibold text-amber-400">
                    ₹{totalPrice}
                  </span>
                </div>

                {/* TRUST TEXT */}
                <p className="text-[11px] text-white/50 text-center">
                  Free cancellation · No hidden charges
                </p>
              </div>
            </div>
          )}


          <button
            onClick={checkAvailability}
            disabled={loading}
            className="w-full bg-amber-500 text-black py-3 rounded-full font-semibold"
          >
            {loading ? "Checking availability..." : "Check Availability"}
          </button>
        </div>

        {/* 🔁 SAME AVAILABILITY UI */}
        {availability && (
          <div
            className="border border-white/10 rounded-2xl p-6 text-center"
            style={{ backgroundColor: "var(--rich-brown)" }}
          >
            {availability.available ? (
              <>
                <p className="text-green-400 font-semibold text-lg">
                  Available ✓
                </p>
                <button
                  onClick={createBooking}
                  className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-semibold"
                >
                  Confirm Booking
                </button>
              </>
            ) : (
              <p className="text-red-400 font-semibold text-lg">
                Not Available ✕
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Booking;
