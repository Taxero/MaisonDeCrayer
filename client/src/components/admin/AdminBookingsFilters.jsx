const AdminBookingsFilters = ({
  statusFilter,
  setStatusFilter,
  checkedInFilter,
  setCheckedInFilter,
  dateFilter,
  setDateFilter,
  timeFilter,
  setTimeFilter,
  isEvent,
}) => {
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl p-5">
      <div className="flex flex-wrap gap-4">
        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="min-w-[180px] bg-black border border-white/10 text-white px-4 py-2 rounded-lg"
        >
          <option value="ALL">All Status</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>

        {/* CHECK-IN FLAG */}
        <select
          value={checkedInFilter}
          onChange={(e) =>
            setCheckedInFilter(e.target.value)
          }
          className="min-w-[180px] bg-black border border-white/10 text-white px-4 py-2 rounded-lg"
        >
          <option value="ALL">All Guests</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="NOT_CHECKED_IN">
            Not Checked In
          </option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
          className="min-w-[180px] bg-black border border-white/10 text-white px-4 py-2 rounded-lg [color-scheme:dark]"
        />

        {/* EVENT TIME FILTER */}
        {isEvent && (
          <input
            type="time"
            value={timeFilter}
            onChange={(e) =>
              setTimeFilter(e.target.value)
            }
            className="min-w-[180px] bg-black border border-white/10 text-white px-4 py-2 rounded-lg [color-scheme:dark]"
          />
        )}
      </div>
    </div>
  );
};

export default AdminBookingsFilters;
