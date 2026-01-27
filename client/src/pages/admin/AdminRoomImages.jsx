import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { FaTrash, FaPlus, FaImages } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminRoomImages = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  const fetchRoom = async () => {
    const res = await api.get(`/rooms/${roomId}`);
    setRoom(res.data.room);
  };

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const deleteImage = async (imageId) => {
    try {
      await api.delete(`admin/rooms/${roomId}/images/${imageId}`);
      toast.success("Image deleted");
      fetchRoom();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset:
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: true,
        folder: "hotel_rooms",
      },
      async (error, result) => {
        if (error) {
          toast.error("Upload failed");
          return;
        }

        if (result.event === "success") {
          const { secure_url, public_id } = result.info;

          try {
            await api.post(`admin/rooms/${roomId}/images`, {
              images: [{ url: secure_url, public_id }],
            });

            toast.success("Image uploaded");
            fetchRoom();
          } catch {
            toast.error("Failed to save image");
          }
        }
      }
    );
  };

  if (!room) {
    return <p className="text-gray-400">Loading images…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Images
          </h1>
          <p className="text-sm text-gray-400">
            {room.name}
          </p>
        </div>

        <button
          onClick={openUploadWidget}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg
                     bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium"
        >
          <FaPlus />
          Upload Images
        </button>
      </div>

      {/* IMAGES GRID */}
      {room.images.length === 0 ? (
        <div className="border border-dashed border-white/20 rounded-2xl p-10 text-center text-gray-400">
          <FaImages className="mx-auto mb-3 text-2xl" />
          <p className="mb-2">No images uploaded yet</p>
          <p className="text-sm">
            Upload room images to attract more bookings
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {room.images.map((img) => (
            <div
              key={img._id}
              className="relative rounded-xl overflow-hidden border border-white/10"
            >
              <img
                src={img.url}
                alt="Room"
                className="h-40 w-full object-cover"
              />

              {/* DELETE ICON (always visible) */}
              <button
                onClick={() => deleteImage(img._id)}
                className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center
                           rounded-full bg-black/70 hover:bg-red-600
                           text-white transition"
                title="Delete image"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRoomImages;
