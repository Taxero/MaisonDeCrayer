import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Star, Calendar, Play, Sparkles } from 'lucide-react';
import BedroomMain from '../assets/BedroomMain.jpg';
import EntryHall from '../assets/EntryHall.jpg';
import EntryHall2 from '../assets/EntryHall2.jpg';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImages = [
    BedroomMain,
    EntryHall,
    EntryHall2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Luxury Hotel View ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>

      {/* Enhanced Gradient Overlay with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-8 lg:px-16 max-w-7xl mx-auto pt-20">
        <div className={`w-full lg:w-2/3 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>

          {/* Location Badge with enhanced styling */}
          <div className="flex items-center gap-2 mb-6 glass-morphism rounded-full px-4 py-2 hover-lift">
            <MapPin className="text-yellow-400" size={18} />
            <span className="text-white/90 text-sm font-medium tracking-wide">Brussels City Center</span>
          </div>

          {/* Rating with enhanced animation */}
          {/* <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform" size={20} />
            ))}
            
          </div> */}

          {/* Main Heading with gradient effect */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
            Discover
            <span className="block text-gradient-gold mt-2 animate-shimmer">Timeless Elegance</span>
          </h1>

          {/* Enhanced Subtext */}
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
            Immerse yourself in the perfect blend of Belgian heritage and contemporary.
            We offers an extraordinary experience with world-class amenities,
            personalized service, and stunning views of Brussels.
          </p>

          {/* Enhanced Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3 glass-morphism rounded-lg px-4 py-3 hover-lift group">
              <Calendar className="text-yellow-400 group-hover:animate-pulse" size={18} />
              <div>
                <div className="text-white font-medium text-sm">Since 1898</div>
                <div className="text-white/60 text-xs">Heritage Ab</div>
              </div>
            </div>
            <div className="flex items-center gap-3 glass-morphism rounded-lg px-4 py-3 hover-lift group">
              <Sparkles className="text-yellow-400 group-hover:animate-pulse" size={18} />
              <div>
                <div className="text-white font-medium text-sm">50 Suites</div>
                <div className="text-white/60 text-xs">Premium Comfort</div>
              </div>
            </div>
            
          </div>

          {/* Enhanced Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <NavLink to="/rooms" className="group relative btn-3d bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-sm font-bold tracking-wider flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 magnetic-btn">
              <span className="relative z-10">Book Rooms</span>
              <ChevronRight size={18} className="stroke-[3] group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </NavLink>

            <button className="group border border-white/50 text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover-lift">
              <Play size={16} className="group-hover:scale-110 transition-transform" />
              <span>Virtual Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${index === currentImageIndex
              ? 'bg-yellow-400 w-8 animate-pulse'
              : 'bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-wider font-medium">Scroll to Explore</span>
          <div className="w-0.5 h-8 bg-white/40"></div>
        </div>
      </div>

      {/* Mouse follower effect */}
      <div
        className="pointer-events-none fixed w-6 h-6 bg-yellow-400/20 rounded-full blur-xl transition-all duration-200"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />
    </section>
  );
};

export default Hero;
