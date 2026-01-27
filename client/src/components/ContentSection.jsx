import Bedroom4 from '../assets/Bedroom4.jpg';
import Bedroom6 from '../assets/Bedroom6.jpg';
import EntryHall from '../assets/EntryHall.jpg';
import EntryHall2 from '../assets/EntryHall2.jpg';
import Stairs from '../assets/Stairs.jpg';
import Stairs3 from '../assets/Stairs3.jpg';
import hall from '../assets/hall.jpg';
import { amenities, features } from "../data/contentSectionData"

const ContentSection = () => {

  return (
    <section id="hotel" className="py-20 px-6 md:px-8 lg:px-16" style={{ backgroundColor: 'var(--dark-wood)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 text-sm tracking-wider uppercase mb-4 block">Welcome to</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Maison De Crayer</h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            A historic landmark since 1898, our hotel combines Belgian heritage with contemporary luxury.
            Nestled in the heart of Brussels, we offer an exclusive retreat for discerning travelers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-lg p-6 border border-yellow-400/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Text Content */}
          <div>
            <h3 className="font-serif text-3xl mb-6 text-white">Timeless Elegance</h3>

            <p className="text-white/70 leading-relaxed mb-6 font-light">
              Step into a world where Belgian sophistication meets modern comfort. Our carefully curated
              spaces reflect the rich cultural heritage of Brussels while providing contemporary amenities
              for the ultimate luxury experience.
            </p>

            <p className="text-white/70 leading-relaxed mb-8 font-light">
              From our meticulously designed suites to our award-winning restaurant, every detail has
              been crafted to exceed your expectations. Our dedicated team ensures your stay is nothing
              short of extraordinary.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-white/60 text-sm">Luxury Suites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">1898</div>
                <div className="text-white/60 text-sm">Established</div>
              </div>
              {/* <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5★</div>
                <div className="text-white/60 text-sm">Luxury Rating</div>
              </div> */}
            </div>
          </div>

          {/* Right Side Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={EntryHall}
                  alt="Grand Entry Hall"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={Stairs}
                  alt="Grand Staircase"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={EntryHall2}
                  alt="Luxury Lobby"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={hall}
                  alt="Hotel Hallway"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Image Showcase */}
        <div className="mb-20">
          <h3 className="font-serif text-3xl text-center mb-12 text-white">Architectural Excellence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <img
                src={Stairs3}
                alt="Elegant Staircase"
                className="w-full h-64 object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-semibold">Grand Staircase</h4>
                  <p className="text-white/70 text-sm">Marble craftsmanship</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <img
                src={Bedroom6}
                alt="Luxury Interior"
                className="w-full h-64 object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-semibold">Premium Suites</h4>
                  <p className="text-white/70 text-sm">Elegant design</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <img
                src={Bedroom4}
                alt="Classic Interior"
                className="w-full h-64 object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-semibold">Classic Rooms</h4>
                  <p className="text-white/70 text-sm">Timeless comfort</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="border-t border-white/10 pt-16">
          <h3 className="font-serif text-3xl text-center mb-12 text-white">Premium Amenities</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">

            {amenities.map((amenity, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <amenity.icon className="text-black" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-2">{amenity.name}</h4>
                <p className="text-white/60 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
