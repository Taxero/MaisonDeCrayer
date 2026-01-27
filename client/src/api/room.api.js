import api from "./axios";

export const getAllRooms = async () => {
  const res = await api.get("/rooms");
  return res.data; // { count, rooms }
};

export const getRoomById = async (id) => {
  const res = await api.get(`/rooms/${id}`);
  return res.data; // { room }
};
