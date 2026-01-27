import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { Globe, Menu, X, User, LogIn } from 'lucide-react';
import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState("EN");

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  /* Scroll glass effect */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-all duration-300 group
     ${isActive ? "text-yellow-400" : "text-white/80 hover:text-white"}`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-black/95 backdrop-blur-xl border-b border-yellow-400/20 shadow-2xl"
        : "bg-black/40 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* 🔥 EXACT GLOWING LOGO */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-400/40 hover:shadow-yellow-400/70 transition-all duration-300 hover:scale-110">
                <span className="text-black font-bold text-lg md:text-xl font-serif">
                  M
                </span>
              </div>

              {/* Glow dots */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-1000"></div>
            </div>

            <div className="hidden md:block">
              <h1 className="font-serif text-2xl font-bold text-white group-hover:text-yellow-400 transition">
                Maison
              </h1>
              <p className="text-xs text-yellow-400 tracking-widest uppercase">
                De Crayer
              </p>
            </div>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center justify-end gap-8">
            {[
              { name: "Home", to: "/" },
              { name: "Accommondation", to: "/rooms" },
              { name: "Gallery", to: "/gallery" },
              { name: "Contact", to: "/contact" },
              ...(user ? [{ name: "My Bookings", to: "/my-bookings" }] : []),
              ...(user?.role === "ADMIN" ? [{ name: "Admin", to: "/admin" }] : []),
            ].map((item) => (
              <NavLink key={item.name} to={item.to} className={navClass}>
                {item.name}
                {/* ✨ GLOW UNDERLINE */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition"></span>
              </NavLink>
            ))}
          </div>

          {/* RIGHT AREA */}
          <div className="flex items-center gap-4">

            {/* 🌍 LANGUAGE SELECTOR (EXACT STYLE) */}
            <div className="hidden md:flex items-center gap-2 rounded-full px-3 py-1.5 border border-white/20 backdrop-blur-md hover:bg-white/10 transition">
              <Globe size={14} className="text-yellow-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
              >
                {["EN", "FR", "NL", "DE"].map((l) => (
                  <option key={l} value={l} className="bg-gray-900">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* PHONE */}
            {/* <div className="hidden lg:flex items-center gap-2 text-white/70">
              <Phone size={14} className="text-yellow-400" />
              <span>+32 2 123 45 67</span>
            </div> */}

            {/* AUTH (DESKTOP) */}
            {/* AUTH (DESKTOP) */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">

                {/* Sign In */}
                <NavLink
                  to="/login"
                  className="group relative border border-white/50 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all duration-300 hover-lift"
                >
                  <LogIn size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Sign In</span>
                </NavLink>

                <NavLink
                  to="/register"
                  className="group relative btn-3d bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 magnetic-btn">
                  <User size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="relative z-10 hidden sm:inline">Sign Up</span>
                </NavLink>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden md:flex items-center gap-4"
              >
                <span className="flex items-center gap-2 text-white/80">
                  <FaUserCircle className="text-yellow-400" />
                  <strong>{user.name}</strong>
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </motion.div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {
        open && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 ">
            <div className="px-6 py-6 space-y-4">
              {[
                { name: "Home", to: "/" },
                { name: "Accommondation", to: "/rooms" },
                { name: "Gallery", to: "/gallery" },
                { name: "Contact", to: "/contact" },
                ...(user ? [{ name: "My Bookings", to: "/my-bookings" }] : []),
                ...(user?.role === "ADMIN" ? [{ name: "Admin", to: "/admin" }] : []),
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={closeMenu}
                  className="block text-white/80 hover:text-yellow-400 text-lg font-medium py-2"
                >
                  {item.name}
                </NavLink>
              ))}

              {!user ? (
                <div className="pt-4 space-y-3">
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center gap-2 border border-white/50 text-white px-4 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300 hover-lift"
                  >
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center gap-2 btn-3d bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 magnetic-btn"
                  >
                    <User size={18} />
                    <span>Sign Up</span>
                  </NavLink>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-full"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              )}
            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
