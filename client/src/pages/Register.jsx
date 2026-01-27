import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden pt-25">

      {/* subtle gold glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15),transparent_55%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md
                   bg-black/80 backdrop-blur-xl
                   border border-white/10
                   rounded-2xl shadow-2xl
                   p-8 z-10"
      >
        {/* LOGO (same as navbar & login) */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="w-14 h-14 rounded-full
                         bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
                         flex items-center justify-center
                         shadow-lg shadow-yellow-400/40
                         hover:shadow-yellow-400/70
                         transition-all duration-300"
            >
              <span className="text-black font-serif font-bold text-xl">
                B
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-white mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-400">
            Join us for a premium hotel experience
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* NAME */}
          <div>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                placeholder="Full Name"
                className="w-full bg-black/70
                           border border-white/20
                           text-white
                           pl-11 pr-4 py-3 rounded-lg
                           outline-none
                           focus:border-yellow-400
                           focus:ring-1 focus:ring-yellow-400/50
                           transition"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-black/70
                           border border-white/20
                           text-white
                           pl-11 pr-4 py-3 rounded-lg
                           outline-none
                           focus:border-yellow-400
                           focus:ring-1 focus:ring-yellow-400/50
                           transition"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                placeholder="Phone number"
                className="w-full bg-black/70
                           border border-white/20
                           text-white
                           pl-11 pr-4 py-3 rounded-lg
                           outline-none
                           focus:border-yellow-400
                           focus:ring-1 focus:ring-yellow-400/50
                           transition"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-black/70
                           border border-white/20
                           text-white
                           pl-11 pr-12 py-3 rounded-lg
                           outline-none
                           focus:border-yellow-400
                           focus:ring-1 focus:ring-yellow-400/50
                           transition"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {passwordValue && (
              <p className="text-xs mt-1 text-gray-500">
                Use at least 6 characters for a secure password
              </p>
            )}

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={isSubmitting}
            className={`w-full py-3 rounded-full font-semibold
              transition-all duration-300
              ${isSubmitting
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg    shadow-yellow-400/40 hover:shadow-yellow-400/70 hover:scale-[1.02]"
              }`}
          >
            {isSubmitting ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div >
  );
};

export default Register;
