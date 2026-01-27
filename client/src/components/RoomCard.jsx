import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const imageUrl =
    room.images && room.images.length > 0
      ? room.images[0].url
      : "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80";

  const isEvent = room.roomCategory === "EVENT";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Link
        to={`/rooms/${room._id}`}
        className="relative block overflow-hidden rounded-2xl
                   bg-gradient-to-b from-neutral-900/60 to-black/60
                   border border-white/10
                   shadow-lg hover:shadow-xl
                   transition-all duration-300"
      >
        {/* IMAGE */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={imageUrl}
            alt={room.name}
            className="w-full h-full object-cover
                       transition-transform duration-700
                       group-hover:scale-105"
          />

          {/* SOFT GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* PRICE BADGE */}
          <div
            className="absolute top-4 right-4
                       bg-yellow-400/90 backdrop-blur-sm
                       text-black px-4 py-1.5 rounded-full
                       text-sm font-semibold
                       shadow-md"
          >
            ₹{isEvent ? room.pricePerHour : room.pricePerNight}{" "}
            / {isEvent ? "hour" : "night"}
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-4 pb-5 flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl text-white mb-2">
              {room.name}
            </h3>

            <p className="text-sm text-white/60">
              Max Guests: {room.maxGuests}
            </p>
          </div>

          {/* ACTION ICON */}
          <FaArrowRight
            className="mt-2 text-yellow-400
                       transition-transform duration-300
                       group-hover:translate-x-1"
          />
        </div>

        {/* VERY SOFT BORDER GLOW */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl
                     opacity-0 group-hover:opacity-100
                     transition duration-300
                     ring-1 ring-yellow-400/25"
        />
      </Link>
    </motion.div>
  );
};

export default RoomCard;
