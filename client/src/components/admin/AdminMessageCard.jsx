import { FaEnvelopeOpen, FaTrash } from "react-icons/fa";

const AdminMessageCard = ({
  message,
  onMarkRead,
  onDelete,
}) => {
  return (
    <div
      className={`bg-neutral-900 border rounded-xl p-5 ${message.isRead
        ? "border-white/10"
        : "border-amber-400/40"
        }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold text-white">
            {message.name}
          </p>
          <p className="text-sm text-gray-400">
            {message.email} · {message.phone}
          </p>
        </div>

        {message.isRead
          ? (
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-500">
              Read
            </span>
          ) : (
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400">
              Unread
            </span>
          )

        }
      </div>

      {/* MESSAGE */}
      <p className="text-sm text-gray-300 mb-4">
        {message.message}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3">
        {!message.isRead && (
          <button
            onClick={onMarkRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-blue-600/90 hover:bg-blue-600 text-white text-sm"
          >
            <FaEnvelopeOpen />
            Mark as Read
          </button>
        )}

        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-red-500/90 hover:bg-red-500 text-white text-sm"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminMessageCard;
