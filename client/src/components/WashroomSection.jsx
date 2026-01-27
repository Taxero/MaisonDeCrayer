import { useEffect, useState } from "react";
import { washroomFeatures, amenities, washroomStats } from "../data/washroomSectionData"
import { Maximize2, Bath, X } from "lucide-react";

const WashroomSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  /* 🔒 Prevent background scroll when modal is open */
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [selectedImage]);


  return (
    <section
      className="py-20 px-6 md:px-8 lg:px-16"
      style={{ backgroundColor: "var(--rich-brown)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ✅ INTRO — UNCHANGED */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Bath className="text-black" size={32} />
          </div>
          <span className="text-yellow-400 text-sm tracking-wider uppercase mb-4 block">
            Luxury Amenities
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">
            Premium Washrooms
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of luxury in our meticulously designed washrooms. From spa-inspired retreats
            to modern executive facilities, each space combines elegance, functionality, and cutting-edge technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {washroomStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {washroomFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group cursor-pointer transition-transform hover:scale-[1.03]"
              onClick={() => setSelectedImage(feature)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 shadow-xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {feature.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-yellow-400 transition">
                      <Maximize2 className="text-white group-hover:text-black" size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {feature.features.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="border-t border-white/10 pt-16">
          <h3 className="font-serif text-3xl text-center mb-12 text-white">
            Washroom Amenities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                  <amenity.icon className="text-black" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-2">
                  {amenity.name}
                </h4>
                <p className="text-white/60 text-sm">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg p-8 border border-yellow-400/20 text-center">
          <h3 className="font-serif text-2xl text-white mb-4">
            Quality Assurance
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            All our washrooms meet the highest international standards of hygiene, luxury, and comfort.
            Regular quality checks ensure consistently exceptional experiences for our guests.
          </p>
        </div>

        {/* 🔒 OPTIMIZED MODAL */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
            <div
              className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Header */}
              <div className="relative h-64 flex-shrink-0">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white hover:bg-black/80"
                >
                  <X size={20} />
                </button>
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {selectedImage.category}
                  </span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto">
                <h3 className="font-serif text-3xl text-white mb-4">
                  {selectedImage.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  {selectedImage.description}
                </p>

                <h4 className="text-white font-semibold mb-3">
                  Key Features:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedImage.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default WashroomSection;
