import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AdminRoomCard from "../../components/admin/AdminRoomCard";
import AdminRoomSkeleton from "../../components/admin/AdminRoomSkeleton";
import AdminRoomsHeader from "../../components/admin/AdminRoomsHeader";
import toast from "react-hot-toast";

const ROOM_TABS = ["STAY", "EVENT"];

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("STAY");

  const navigate = useNavigate();

  /* ================= FETCH ================= */

  const fetchRooms = async () => {
    try {
      const res = await api.get("/admin/rooms");
      setRooms(res.data.rooms || []);
    } catch {
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  /* ================= ACTIONS ================= */

  const toggleRoom = async (room) => {
    try {
      if (room.isActive) {
        await api.delete(`/admin/rooms/${room._id}`);
        toast.success("Room disabled");
      } else {
        await api.patch(`/admin/rooms/${room._id}/enable`);
        toast.success("Room enabled");
      }
      fetchRooms();
    } catch {
      toast.error("Failed to update room");
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room permanently?")) return;

    try {
      await api.delete(`/admin/rooms/${id}/permanent`);
      toast.success("Room deleted");
      fetchRooms();
    } catch {
      toast.error("Failed to delete room");
    }
  };

  /* ================= FILTER BY TAB ================= */

  const visibleRooms = rooms.filter(
    (room) => room.roomCategory === activeTab
  );

  /* ================= RENDER ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-10">
      {/* HEADER */}
      <AdminRoomsHeader
        onCreate={() => navigate("/admin/rooms/new")}
      />

      {/* ===== ROOM TYPE SWITCH ===== */}
      <div className="inline-flex bg-neutral-900 border border-white/10 rounded-full p-1">
        {ROOM_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === tab
                ? "bg-amber-500 text-black"
                : "text-gray-300 hover:text-white"
              }`}
          >
            {tab === "STAY" ? "Stay Rooms" : "Event Rooms"}
          </button>
        ))}
      </div>

      {/* ===== ROOM LIST ===== */}
      <div className="space-y-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <AdminRoomSkeleton key={i} />
          ))}

        {!loading &&
          visibleRooms.map((room) => (
            <AdminRoomCard
              key={room._id}
              room={room}
              onEdit={() =>
                navigate(`/admin/rooms/edit/${room._id}`)
              }
              onImages={() =>
                navigate(`/admin/rooms/${room._id}/images`)
              }
              onToggle={() => toggleRoom(room)}
              onDelete={() => deleteRoom(room._id)}
            />
          ))}

        {!loading && visibleRooms.length === 0 && (
          <p className="text-gray-400">
            No {activeTab === "STAY" ? "stay rooms" : "event rooms"} found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminRooms;
