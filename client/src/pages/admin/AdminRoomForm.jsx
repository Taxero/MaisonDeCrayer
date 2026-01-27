import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import {
  FaBed,
  FaRupeeSign,
  FaUsers,
  FaWarehouse,
  FaListUl,
  FaAlignLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";

const AdminRoomForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(roomId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roomCategory: "STAY",
    },
  });

  const roomCategory = watch("roomCategory");

  /* ================= FETCH EDIT DATA ================= */

  useEffect(() => {
    if (isEdit) {
      const fetchRoom = async () => {
        const res = await api.get(`/rooms/${roomId}`);
        const room = res.data.room;

        setValue("name", room.name);
        setValue("roomCategory", room.roomCategory || "STAY");
        setValue("price", room.pricePerNight || room.pricePerHour);
        setValue("maxGuests", room.maxGuests);
        setValue("totalRooms", room.totalRooms);
        setValue("amenities", room.amenities.join(", "));
        setValue("description", room.description || "");
      };

      fetchRoom();
    }
  }, [isEdit, roomId, setValue]);

  /* ================= SUBMIT ================= */

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      roomCategory: data.roomCategory,
      maxGuests: Number(data.maxGuests),
      description: data.description,
      amenities: data.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      totalRooms: Number(data.totalRooms)

    };
    if (data.roomCategory === "STAY") {
      payload.pricePerNight = data.price
    }
    else {
      payload.pricePerHour = data.price
    }

    try {
      if (isEdit) {
        await api.put(`/admin/rooms/${roomId}`, payload);
        toast.success("Room updated!");
      } else {
        await api.post("/admin/rooms", payload);
        toast.success("Room created!");
      }
      navigate("/admin/rooms");
    } catch {
      toast.error("Failed to save room");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Room or Event " : "Create Room or Event"}
        </h1>
        <p className="text-sm text-gray-400">
          Define room or event details and pricing
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* ROOM TYPE */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Room Type
          </label>
          <select
            {...register("roomCategory", {
              required: true,
            })}
            className="w-full bg-black border border-white/10 text-white px-4 py-2 rounded-lg"
          >
            <option value="STAY">Stay Room</option>
            <option value="EVENT">Event Space</option>
          </select>
        </div>

        {/* NAME + PRICE */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Name
            </label>
            <div className="relative">
              <FaBed className="absolute left-3 top-3 text-gray-500 text-sm" />
              <input
                className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              {roomCategory === "EVENT"
                ? "Price Per Hour"
                : "Price per Night"}
            </label>
            <div className="relative">
              <FaRupeeSign className="absolute left-3 top-3 text-gray-500 text-sm" />
              <input
                type="number"
                className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg"
                {...register("price", {
                  required: "Price is required",
                  min: 1,
                })}
              />
            </div>
          </div>
        </div>

        {/* CAPACITY */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Max Guests
            </label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-3 text-gray-500 text-sm" />
              <input
                type="number"
                className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg"
                {...register("maxGuests", {
                  required: true,
                  min: 1,
                })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Total Rooms
            </label>
            <div className="relative">
              <FaWarehouse className="absolute left-3 top-3 text-gray-500 text-sm" />
              <input
                type="number"
                className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg"
                {...register("totalRooms", {
                  required: "Required for stay rooms",
                  min: 1,
                })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Amenities
          </label>
          <div className="relative">
            <FaListUl className="absolute left-3 top-3 text-gray-500 text-sm" />
            <input
              className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg"
              {...register("amenities", {
                required: "Amenities required for stay rooms",
              })}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Description
          </label>
          <div className="relative">
            <FaAlignLeft className="absolute left-3 top-3 text-gray-500 text-sm" />
            <textarea
              rows={4}
              className="w-full bg-black border border-white/10 text-white pl-10 pr-3 py-2 rounded-lg resize-none"
              {...register("description", {
                required: true,
                minLength: 20,
              })}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate("/admin/rooms")}
            className="px-5 py-2 text-gray-300"
          >
            Cancel
          </button>

          <button
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-amber-500 text-black"
          >
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update"
                : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRoomForm;
