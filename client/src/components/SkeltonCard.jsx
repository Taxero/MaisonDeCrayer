const SkeletonCard = () => {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 animate-pulse"
      style={{ backgroundColor: "var(--rich-brown)" }}
    >
      {/* IMAGE */}
      <div className="h-56 bg-white/10" />

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        <div className="h-4 bg-white/15 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />

        <div className="flex justify-end">
          <div className="h-4 w-4 bg-white/15 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
