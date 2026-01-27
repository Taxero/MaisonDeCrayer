import { Link } from "react-router-dom";
import { motion } from "motion/react";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 text-white"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl text-center space-y-6"
      >
        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-serif text-amber-400 tracking-widest">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-serif">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-white/70 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Divider */}
        <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/"
            className="rounded-full bg-amber-500 text-black px-8 py-3
                       font-semibold hover:bg-amber-400 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/rooms"
            className="rounded-full border border-white/30 text-white px-8 py-3
                       font-semibold hover:bg-white/10 transition"
          >
            View Rooms
          </Link>
        </div>

        {/* Subtle footer note */}
        <p className="text-xs text-white/40 pt-6">
          If you believe this is an error, please contact our support team.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
