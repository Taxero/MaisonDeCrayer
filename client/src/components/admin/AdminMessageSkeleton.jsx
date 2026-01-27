const AdminMessageSkeleton = () => {
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl p-5 animate-pulse space-y-3">
      <div className="h-4 w-40 bg-white/10 rounded" />
      <div className="h-3 w-64 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 w-24 bg-white/10 rounded-lg" />
        <div className="h-8 w-24 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
};

export default AdminMessageSkeleton;
