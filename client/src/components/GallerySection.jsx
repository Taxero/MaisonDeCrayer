import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/gallerySectionData"

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ["All", ...new Set(galleryImages.map(i => i.category))];

  const filteredImages = useMemo(() => {
    const imgs =
      activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(i => i.category === activeCategory);

    if (activeIndex >= imgs.length) setActiveIndex(0);
    return imgs;
  }, [activeCategory, galleryImages, activeIndex]);

  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % filteredImages.length);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );

  if (!filteredImages.length) return null;

  const activeImage = filteredImages[activeIndex];

  return (
    <section className="py-20 px-6 md:px-10" style={{ backgroundColor: "var(--dark-wood)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-yellow-400 uppercase text-xs tracking-widest">Gallery</span>
          <h2 className="text-white font-serif text-4xl mt-3">Experience Our Luxury</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-sm transition ${activeCategory === cat
                ? "bg-yellow-400 text-black"
                : "border border-white/30 text-white/70 hover:bg-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative mb-6">
          <img
            src={activeImage.src}
            alt={activeImage.title}
            className="w-full h-[60vh] object-cover rounded-xl"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-white text-xl font-medium">{activeImage.title}</h3>
          <p className="text-white/60 text-sm mt-1">
            {activeIndex + 1} / {filteredImages.length}
          </p>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filteredImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${idx === activeIndex
                ? "border-yellow-400"
                : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
