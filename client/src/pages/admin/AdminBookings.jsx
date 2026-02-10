import { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../../api/axios";
import BookingSkeleton from "../../components/BookingSkeleton";
import AdminBookingRow from "../../components/admin/AdminBookingRow";
import AdminBookingsFilters from "../../components/admin/AdminBookingsFilters";

const BOOKING_TABS = ["STAY", "EVENT"];
const ITEMS_PER_PAGE = 5;

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("STAY");

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [checkedInFilter, setCheckedInFilter] = useState("ALL");

  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const [expandedBookingId, setExpandedBookingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === "EVENT"
          ? "/admin/bookings/event"
          : "/admin/bookings";

      const res = await api.get(url);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  /* ================= RESET PAGE ON FILTER CHANGE ================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, checkedInFilter, dateFilter, timeFilter, activeTab]);

  /* ================= TOGGLE EXPAND ================= */

  const toggleBooking = (id) => {
    setExpandedBookingId((prev) =>
      prev === id ? null : id
    );
  };

  /* ================= FILTER LOGIC ================= */

  const filteredBookings = bookings.filter((b) => {
    const statusMatch =
      statusFilter === "ALL" || b.status === statusFilter;

    const checkedInMatch =
      checkedInFilter === "ALL" ||
      (checkedInFilter === "CHECKED_IN" && b.checkedIn) ||
      (checkedInFilter === "NOT_CHECKED_IN" && !b.checkedIn);

    // STAY date filter → checkIn
    // EVENT date filter → date
    const dateMatch =
      !dateFilter ||
      (activeTab === "STAY"
        ? new Date(b.checkIn)
          .toISOString()
          .slice(0, 10) === dateFilter
        : new Date(b.date)
          .toISOString()
          .slice(0, 10) === dateFilter);

    // EVENT time filter only
    const timeMatch =
      activeTab === "STAY" ||
      !timeFilter ||
      b.startTime === timeFilter;

    return (
      statusMatch &&
      checkedInMatch &&
      dateMatch &&
      timeMatch
    );
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    filteredBookings.length / ITEMS_PER_PAGE
  );

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= RENDER ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          All Bookings
        </h1>
        <p className="text-sm text-gray-400">
          Manage and monitor hotel & event bookings
        </p>
      </div>

      {/* ===== BOOKING TYPE SWITCH ===== */}
      <div className="inline-flex bg-neutral-900 border border-white/10 rounded-full p-1">
        {BOOKING_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === tab
                ? "bg-amber-500 text-black"
                : "text-gray-300 hover:text-white"
              }`}
          >
            {tab === "STAY"
              ? "Stay Bookings"
              : "Event Bookings"}
          </button>
        ))}
      </div>

      {/* FILTERS */}
      <AdminBookingsFilters
        // statusFilter={statusFilter}
              statusFilter='Paid'
        setStatusFilter={setStatusFilter}
        checkedInFilter={checkedInFilter}
        setCheckedInFilter={setCheckedInFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        isEvent={activeTab === "EVENT"}
      />

      {/* LIST */}
      <motion.div layout className="space-y-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <BookingSkeleton key={i} />
          ))}

        {!loading &&
          paginatedBookings.map((booking) => (
            <AdminBookingRow
              key={booking._id}
              booking={booking}
              isExpanded={
                expandedBookingId === booking._id
              }
              bookingType={activeTab}
              onToggle={() =>
                toggleBooking(booking._id)
              }
            />
          ))}

        {!loading && paginatedBookings.length === 0 && (
          <p className="text-gray-400">
            No bookings match the selected filters.
          </p>
        )}
      </motion.div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`px-4 py-2 rounded-md text-sm ${currentPage === i + 1
                    ? "bg-amber-500 text-black"
                    : "bg-neutral-900 text-gray-300 hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
