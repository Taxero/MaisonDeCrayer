import { useForm } from "react-hook-form";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  FaKey,
  FaHashtag,
  FaCheckCircle,
  FaUser,
  FaBed,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaClock,
} from "react-icons/fa";
import { useState } from "react";

const CHECKIN_TABS = ["STAY", "EVENT"];

const AdminCheckIn = () => {
  const [activeTab, setActiveTab] = useState("STAY");
  const [successData, setSuccessData] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setSuccessData(null);
    setErrorData(null);

    try {
      const endpoint =
        activeTab === "EVENT"
          ? "/admin/bookings/event/checkin"
          : "/admin/bookings/checkin";

      const res = await api.post(endpoint, {
        bookingReference: data.bookingReference,
        otp: data.otp,
      });

      toast.success(res.data.message || "Check-in successful");
      setSuccessData(res.data.booking);
      reset();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Invalid booking reference or OTP";

      toast.error(msg);
      setErrorData({
        status: err.response?.status,
        message: msg,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Guest Check-In
        </h1>
        <p className="text-sm text-gray-400">
          Verify booking using reference number and OTP
        </p>
      </div>

      {/* CHECK-IN TYPE SWITCH */}
      <div className="inline-flex bg-neutral-900 border border-white/10 rounded-full p-1">
        {CHECKIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSuccessData(null);
              setErrorData(null);
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === tab
              ? "bg-amber-500 text-black"
              : "text-gray-300 hover:text-white"
              }`}
          >
            {tab === "STAY"
              ? "Stay Check-In"
              : "Event Check-In"}
          </button>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* BOOKING REFERENCE */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Booking Reference
          </label>
          <div className="relative">
            <FaHashtag className="absolute left-3 top-3 text-gray-500 text-sm" />
            <input
              className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg focus:border-amber-400 outline-none"
              placeholder="HOTEL-20260125-XXXXX"
              {...register("bookingReference", {
                required: "Booking reference is required",
              })}
            />
          </div>
          {errors.bookingReference && (
            <p className="text-xs text-red-400 mt-1">
              {errors.bookingReference.message}
            </p>
          )}
        </div>

        {/* OTP */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            OTP
          </label>
          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-500 text-sm" />
            <input
              type="number"
              className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg focus:border-amber-400 outline-none"
              placeholder="Enter OTP"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be at least 4 digits",
                },
              })}
            />
          </div>
          {errors.otp && (
            <p className="text-xs text-red-400 mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isSubmitting}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold ${isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 text-black"
            }`}
        >
          {isSubmitting
            ? "Verifying..."
            : "Verify & Check-In"}
        </button>
      </form>

      {/* ERROR RESULT */}
      {errorData && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
          <p className="text-red-400 font-semibold mb-1">
            Check-In Failed
          </p>
          <p className="text-sm text-gray-300">
            {errorData.message}
          </p>
        </div>
      )}

      {/* SUCCESS RESULT */}
      {successData && (
        <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-400">
            <FaCheckCircle />
            <h2 className="font-semibold">
              Guest Checked In Successfully
            </h2>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <FaUser className="text-amber-400" />
            <div>
              <p className="text-white font-medium">
                {successData.user.name}
              </p>
              <p className="text-sm text-gray-400">
                {successData.user.email} ·{" "}
                {successData.user.phone}
              </p>
            </div>
          </div>

          {/* ROOM */}
          <div className="flex items-center gap-3">
            <FaBed className="text-amber-400" />
            <p className="text-gray-300">
              {successData.room.name}
            </p>
          </div>

          {/* DATE / TIME */}
          {activeTab === "STAY" ? (
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-amber-400" />
              <p className="text-gray-300">
                {new Date(
                  successData.checkIn
                ).toDateString()}{" "}
                →{" "}
                {new Date(
                  successData.checkOut
                ).toDateString()}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-amber-400" />
                <p className="text-gray-300">
                  {new Date(
                    successData.date
                  ).toDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-amber-400" />
                <p className="text-gray-300">
                  {successData.startTime} →{" "}
                  {successData.endTime}
                </p>
              </div>
            </>
          )}

          {/* PAYMENT */}
          <div className="flex items-center gap-3">
            <FaMoneyCheckAlt className="text-amber-400" />
            <p className="text-gray-300">
              Paid €{(successData.totalAmount).toFixed(2)} ·{" "}
              {successData.payment.status}
            </p>
          </div>

          {/* META */}
          <div className="text-sm text-gray-400 pt-2 border-t border-white/10">
            Booking Ref:{" "}
            <strong className="text-white">
              {successData.bookingReference}
            </strong>
            <br />
            Checked in at:{" "}
            {new Date(
              successData.checkedInAt
            ).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCheckIn;
