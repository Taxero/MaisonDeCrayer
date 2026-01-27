import { NavLink } from "react-router-dom";
import { FaChartBar, FaCalendarCheck, FaHotel } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition
   ${isActive
    ? "bg-amber-500/10 text-amber-400"
    : "text-gray-400 hover:bg-white/5 hover:text-white"
  }`;

const AdminSidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r border-white/10 bg-black px-4 py-6 hidden md:block">
      {/* LOGO */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-serif text-white">
          Hotel Admin
        </h1>
        <p className="text-xs text-gray-400">
          Management Panel
        </p>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        <NavLink to="/admin" end className={navItemClass}>
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink to="/admin/bookings" className={navItemClass}>
          <FaCalendarCheck />
          Bookings
        </NavLink>

        <NavLink to="/admin/rooms" className={navItemClass}>
          <FaHotel />
          Rooms & Events
        </NavLink>

        <NavLink to="/admin/checkin" className={navItemClass}>
          <RiVerifiedBadgeFill size={18} />
          Verify & Checkin
        </NavLink>

        <NavLink to="/admin/messages" className={navItemClass}>
          <BiSolidMessageSquareDetail size={18} />
          Messages
        </NavLink>


      </nav>
    </aside>
  );
};

export default AdminSidebar;
