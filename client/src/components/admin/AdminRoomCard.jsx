import {
  FaEdit,
  FaImages,
  FaToggleOn,
  FaToggleOff,
  FaBed,
  FaRupeeSign,
  FaTrash
} from "react-icons/fa";

const AdminRoomCard = ({
  room,
  onEdit,
  onImages,
  onToggle,
  onDelete
}) => {
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl px-5 py-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* ================= ROOM INFO ================= */}
        <div className="md:col-span-4">
          <p className="text-base font-semibold text-white">
            {room.name}
          </p>

          <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaBed className="text-xs" />
              Room Type
            </span>

            <span
              className={`px-2 py-[2px] rounded-full text-xs ${room.isActive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
                }`}
            >
              {room.isActive ? "Active" : "Disabled"}
            </span>
          </div>
        </div>

        {/* ================= PRICING ================= */}
        <div className="md:col-span-3 flex items-center gap-2 text-gray-300">
          <FaRupeeSign className="text-sm text-amber-400" />
          <span className="font-medium">
            € {room.roomCategory == "STAY" ? room.pricePerNight : room.pricePerHour}
          </span>
          <span className="text-xs text-gray-500">
            / {room.roomCategory == "STAY" ? "night" : "hour"}
          </span>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="md:col-span-5 flex flex-wrap md:justify-end gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md
                       bg-indigo-600/90 hover:bg-indigo-600
                       text-white text-sm"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={onImages}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md
                       bg-blue-600/90 hover:bg-blue-600
                       text-white text-sm"
          >
            <FaImages />
            Images
          </button>

          <button
            onClick={onToggle}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md
                        text-white text-sm ${room.isActive
                ? "bg-red-500/90 hover:bg-red-500"
                : "bg-green-500/90 hover:bg-green-500"
              }`}
          >
            {room.isActive ? (
              <>
                <FaToggleOff />
                Disable
              </>
            ) : (
              <>
                <FaToggleOn />
                Enable
              </>
            )}
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white text-sm  bg-red-500/90 hover:bg-red-500"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomCard;
