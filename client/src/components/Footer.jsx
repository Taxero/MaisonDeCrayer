import { ChevronRight, Heart } from 'lucide-react';
import { quickLinks, services, contactInfo, socialLinks, stats } from "../data/footerData"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black border-t border-white/10">
      {/* Stats Section */}
      <div className="py-12 px-6 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="text-yellow-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-20 px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Hotel Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-black font-bold text-lg font-serif">B</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-white leading-tight">
                    MAISORE
                  </h4>
                  <p className="text-xs text-yellow-400 font-medium tracking-widest uppercase">
                    DE CYAYER
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Experience the perfect blend of Belgian elegance and modern luxury in the heart of Brussels.
                Your unforgettable journey awaits.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Our Services</h4>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                    <span className="text-lg">{service.icon}</span>
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <info.icon className="text-yellow-400 mt-1" size={18} />
                    <span className="text-white/70 text-sm">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="mt-6 p-4 glass-morphism rounded-lg border border-white/20">
                <h5 className="text-white font-medium mb-2">Operating Hours</h5>
                <div className="text-white/60 text-sm space-y-1">
                  <p>Reception: 24/7</p>
                  <p>Restaurant: 7:00 AM - 11:00 PM</p>
                  <p>Spa: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm flex items-center gap-2">
            &copy; 2026 Maisore De Crayer. All rights reserved.
            <span className="text-yellow-400">Made with</span>
            <Heart className="text-yellow-400 inline-block" size={14} />
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
