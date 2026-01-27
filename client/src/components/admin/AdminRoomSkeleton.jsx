const AdminRoomSkeleton = () => {
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-white/10 rounded" />
          <div className="h-3 w-24 bg-white/10 rounded" />
          <div className="h-3 w-20 bg-white/10 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-20 bg-white/10 rounded-lg" />
          <div className="h-9 w-20 bg-white/10 rounded-lg" />
          <div className="h-9 w-20 bg-white/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default AdminRoomSkeleton;
