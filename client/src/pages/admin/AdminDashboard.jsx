import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  FaCalendarCheck,
  FaHotel,
  FaArrowRight,
} from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-serif mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage bookings, rooms, and hotel operations
          </p>
        </div>

        {/* QUICK STATS (DUMMY FOR NOW) */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { label: "Total Bookings", value: "—" },
            { label: "Active Rooms", value: "—" },
            { label: "Pending Actions", value: "—" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-5"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN ACTIONS */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* MANAGE BOOKINGS */}
          <NavLink to="/admin/bookings" className="group">
            <div className="h-full bg-neutral-900 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-xl">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Manage Bookings
                    </h2>
                    <p className="text-sm text-gray-400">
                      Reservations & payments
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-amber-400 transition" />
              </div>

              <p className="text-sm text-gray-400">
                View, approve, cancel bookings and track payment or
                refund status in one place.
              </p>
            </div>
          </NavLink>


          <NavLink to="/admin/rooms" className="group">
            <div className="h-full bg-neutral-900 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-xl">
                    <FaHotel />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Manage Rooms
                    </h2>
                    <p className="text-sm text-gray-400">
                      Inventory & pricing
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-amber-400 transition" />
              </div>

              <p className="text-sm text-gray-400">
                Create, edit rooms, update pricing, amenities, and
                manage room images.
              </p>
            </div>
          </NavLink>
          <NavLink to="/admin/checkin" className="group">
            <div className="h-full bg-neutral-900 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 text-xl">
                    <RiVerifiedBadgeFill />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Verify & Checkin
                    </h2>
                    <p className="text-sm text-gray-400">
                      Validate the user bookings and marked checkedin
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-amber-400 transition" />
              </div>
            </div>
          </NavLink>

          <NavLink to="/admin/messages" className="group">
            <div className="h-full bg-neutral-900 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 text-xl">
                    <BiSolidMessageSquareDetail />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Messages
                    </h2>
                    <p className="text-sm text-gray-400">
                      Manage all user messages and mark them read and delete
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-amber-400 transition" />
              </div>

            </div>
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
