import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AdminMessageCard from "../../components/admin/AdminMessageCard";
import AdminMessageSkeleton from "../../components/admin/AdminMessageSkeleton";

const FILTERS = ["ALL", "UNREAD", "READ"];
const ITEMS_PER_PAGE = 5;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH ================= */

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact/admin");
      setMessages(res.data.contacts || []);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [currentPage])

  useEffect(() => {
    fetchMessages();
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  /* ================= ACTIONS ================= */

  const markAsRead = async (id) => {
    try {
      await api.patch(`/contact/admin/${id}/read`);
      toast.success("Message marked as read");
      fetchMessages();
    } catch {
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/admin/${id}`);
      toast.success("Message deleted");
      fetchMessages();
    } catch {
      toast.error("Failed to delete message");
    }
  };

  /* ================= FILTERING ================= */

  const filteredMessages = messages.filter((msg) => {
    if (filter === "UNREAD") return !msg.isRead;
    if (filter === "READ") return msg.isRead;
    return true;
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    filteredMessages.length / ITEMS_PER_PAGE
  );

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= RENDER ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Contact Messages
        </h1>
        <p className="text-sm text-gray-400">
          Messages sent from the contact form
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === item
              ? "bg-amber-500 text-black"
              : "bg-neutral-900 border border-white/10 text-gray-300 hover:text-white"
              }`}
          >
            {item === "ALL" && "All"}
            {item === "UNREAD" && "Unread"}
            {item === "READ" && "Read"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <AdminMessageSkeleton key={i} />
          ))}

        {!loading &&
          paginatedMessages.map((msg) => (
            <AdminMessageCard
              key={msg._id}
              message={msg}
              onMarkRead={() => markAsRead(msg._id)}
              onDelete={() => deleteMessage(msg._id)}
            />
          ))}

        {!loading &&
          paginatedMessages.length === 0 && (
            <p className="text-gray-400">
              No messages found.
            </p>
          )}
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="px-3 py-1 rounded bg-neutral-900 border border-white/10
                       text-gray-300 disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map(
            (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`px-3 py-1 rounded border ${currentPage === page
                    ? "bg-amber-500 text-black border-amber-500"
                    : "bg-neutral-900 text-gray-300 border-white/10 hover:border-white/30"
                    }`}
                >
                  {page}
                </button>
              );
            }
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
            className="px-3 py-1 rounded bg-neutral-900 border border-white/10
                       text-gray-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
