const BookingSkeleton = () => {
  return (
    <div
      className="border border-white/10 rounded-2xl p-5 animate-pulse"
      style={{ backgroundColor: "var(--rich-brown)" }}
    >
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-white/15 rounded" />
          <div className="h-3 w-56 bg-white/10 rounded" />
        </div>

        <div className="space-y-2 text-right">
          <div className="h-4 w-20 bg-white/15 rounded ml-auto" />
          <div className="h-5 w-24 bg-white/15 rounded-full ml-auto" />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-white/10 my-4" />

      {/* DETAILS */}
      <div className="space-y-2">
        <div className="h-3 w-1/3 bg-white/10 rounded" />
        <div className="h-3 w-1/2 bg-white/10 rounded" />
      </div>
    </div>
  );
};

export default BookingSkeleton;
