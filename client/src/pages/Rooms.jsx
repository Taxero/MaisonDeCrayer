import { useEffect, useState } from "react";
import { motion } from "motion/react";
import RoomCard from "../components/RoomCard";
import { getAllRooms } from "../api/room.api";
import SkeletonCard from "../components/SkeltonCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data.rooms || []);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // 🔹 CATEGORY FILTERS
  const stayRooms = rooms.filter(
    (room) => room.roomCategory === "STAY"
  );

  const eventRooms = rooms.filter(
    (room) => room.roomCategory === "EVENT"
  );

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "var(--rich-brown)" }}
    >
      {/* ================= HERO HEADER ================= */}
      <section className="relative pt-28 pb-10 px-6 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="text-yellow-400 text-sm tracking-wider uppercase mb-4 block">
            Our Spaces
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Stay & <span className="text-yellow-400">Events</span>
          </h1>
          <p className="text-white/70 text-lg font-light leading-relaxed">
            From luxurious stays to elegant event spaces, explore thoughtfully
            designed environments crafted for comfort, celebration, and
            unforgettable experiences.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 pb-24 space-y-16">
        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && rooms.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/60 text-lg"
          >
            No rooms available at the moment.
          </motion.p>
        )}

        {/* ================= STAY ROOMS ================= */}
        {!loading && stayRooms.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif mb-10"
            >
              Stay <span className="text-yellow-400">Accommodation</span>
            </motion.h2>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {stayRooms.map((room) => (
                <motion.div
                  key={room._id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* ================= EVENT ROOMS ================= */}
        {!loading && eventRooms.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif mb-10"
            >
              Event <span className="text-yellow-400">Spaces</span>
            </motion.h2>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {eventRooms.map((room) => (
                <motion.div
                  key={room._id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Rooms;
