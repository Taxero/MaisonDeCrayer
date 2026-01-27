const RoomDetailsSkeleton = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-6 py-16 animate-pulse text-white"
      style={{ backgroundColor: "var(--dark-wood)" }}
    >
      {/* HERO IMAGE */}
      <div className="w-full h-[400px] bg-white/10 rounded-2xl mb-6" />

      {/* THUMBNAILS */}
      <div className="flex gap-3 mb-10 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 w-28 bg-white/10 rounded-xl"
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          <div className="h-8 bg-white/15 rounded w-2/3" />
          <div className="h-4 bg-white/10 rounded w-1/2" />

          {/* DESCRIPTION */}
          <div className="space-y-3 mt-6">
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-5/6" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
          </div>

          {/* AMENITIES */}
          <div className="mt-10 space-y-4">
            <div className="h-5 bg-white/15 rounded w-1/4" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/10 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="h-fit">
          <div
            className="rounded-3xl p-6 space-y-4 border border-white/10"
            style={{ backgroundColor: "var(--rich-brown)" }}
          >
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-10 bg-white/15 rounded w-1/2" />
            <div className="h-12 bg-white/20 rounded-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsSkeleton;
