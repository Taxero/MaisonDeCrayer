import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRoomById } from "../api/room.api";
import RoomDetailsSkeleton from "../components/RoomDetailsSkeleton";
import { FaCheckCircle } from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        const roomData = data.room || data;
        setRoom(roomData);

        if (roomData.images?.length > 0) {
          setActiveImage(roomData.images[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch room", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const isEvent = room?.roomCategory === "EVENT";

  if (loading) return <RoomDetailsSkeleton />;
  if (!room) return <p className="p-6 text-red-500">Room not found</p>;

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      {/* ================= HERO ================= */}
      <section className="relative pt-20">
        <div className="relative h-[65vh]">
          <img
            src={activeImage || "/placeholder.jpg"}
            alt={room.name}
            className="w-full h-full object-cover"
          />

          {/* Warm overlay (lighter, not pure black) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

          {/* Title */}
          <div className="absolute bottom-8 left-6 md:left-16">
            <h1 className="text-3xl md:text-5xl font-serif mb-2">
              {room.name}
            </h1>
            <p className="text-amber-400 text-lg font-semibold">
              ₹{isEvent ? room.pricePerHour : room.pricePerNight}{" "}
              / {isEvent ? "hour" : "night"}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 px-6 md:px-16 mt-6 overflow-x-auto">
          {room.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt="room"
              onClick={() => setActiveImage(img.url)}
              className={`h-20 w-28 object-cover rounded-xl cursor-pointer border transition
                ${activeImage === img.url
                  ? "border-amber-400"
                  : "border-white/20 opacity-70 hover:opacity-100"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-3 gap-14">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-16">

            {/* HIGHLIGHTS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Max Guests", value: room.maxGuests },
                { label: "Rooms Available", value: room.totalRooms },
                { label: "Space Type", value: room.roomCategory, hide: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border border-white/10 rounded-2xl px-5 py-4
                              ${item.hide ? "hidden sm:block" : ""}`}
                  style={{ backgroundColor: "var(--rich-brown)" }}
                >
                  <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-2xl font-serif mb-4">
                About this room
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                {room.description || "Experience refined comfort in this thoughtfully designed room, crafted to offer a balance of elegance and relaxation. Premium furnishings and a calm ambience make it ideal for leisure and business travelers alike. Every detail is designed to ensure a peaceful stay with modern amenities and warm hospitality."}
              </p>
            </div>

            {/* AMENITIES */}
            <div>
              <h2 className="text-2xl font-serif mb-6">
                Amenities
              </h2>

              {room.amenities.length === 0 ? (
                <p className="text-white/60">
                  No amenities listed
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3
                                 border border-white/10
                                 rounded-xl px-4 py-3"
                      style={{ backgroundColor: "var(--rich-brown)" }}
                    >
                      <FaCheckCircle className="text-amber-400 text-sm" />
                      <span className="text-sm text-white/90 capitalize">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT CTA */}
          <div className="h-fit">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-amber-400/60 via-amber-500/30 to-transparent">
              <div
                className="rounded-3xl p-6"
                style={{ backgroundColor: "var(--rich-brown)" }}
              >
                <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
                  Price per {isEvent ? "hour" : "night"}
                </p>

                <p className="text-4xl font-bold mb-6">
                  ₹{isEvent ? room.pricePerHour : room.pricePerNight}{" "}
                  <span className="text-base text-white/50 font-medium">
                    {" "}
                    / {isEvent ? "hour" : "night"}
                  </span>
                </p>


                <Link
                  to={`/booking/${room._id}`}
                  className="group relative overflow-hidden block w-full
                             text-center rounded-full
                             bg-gradient-to-r from-amber-400 to-amber-500
                             text-black font-semibold py-4 transition"
                >
                  <span className="relative z-10">
                    Book Your {isEvent ? "Space" : "Stay"}
                  </span>
                  <span className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>

                <p className="text-xs text-white/50 text-center mt-4">
                  Free cancellation · No hidden charges
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RoomDetails;
