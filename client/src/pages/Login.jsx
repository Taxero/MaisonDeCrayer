import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">

      {/* subtle background glow */}
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
        {/* LOGO (same vibe as navbar) */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full
                            bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
                            flex items-center justify-center
                            shadow-lg shadow-yellow-400/40
                            hover:shadow-yellow-400/70
                            transition-all duration-300">
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
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400">
            Login to continue your luxury experience
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={isSubmitting}
            className={`w-full py-3 rounded-full font-semibold transition-all duration-300
              ${isSubmitting
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-400/40 hover:shadow-yellow-400/70 hover:scale-[1.02]"
              }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

