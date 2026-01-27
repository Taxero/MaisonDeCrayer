const AdminRoomsHeader = ({ onCreate }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Manage Rooms
        </h1>
        <p className="text-sm text-gray-400">
          Create, update, and control room availability
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-green-600/90 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
      >
        + Create Room
      </button>
    </div>
  );
};

export default AdminRoomsHeader;
