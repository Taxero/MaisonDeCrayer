import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Heart, Map, Clock, Shield } from 'lucide-react';

export const quickLinks = [
  { name: 'About Us', href: '/' },
  { name: 'Accommodation', href: '/rooms' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events', href: '/rooms' },
  { name: 'Contact', href: '/contact' }
];

export const services = [
  { name: 'Room Service', icon: '🍽️' },
  { name: 'Business Center', icon: '💼' },
  { name: 'Concierge', icon: '🎯' }
];

export const contactInfo = [
  { icon: MapPin, text: 'De Crayerstraat 15 ,1000 Brussel, Belgium' },
  { icon: Phone, text: '+32 456 35 30 08' },
  { icon: Mail, text: 'info@maisondecrayer.com' }
];

export const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

export const stats = [
  { number: '1898', label: 'Founded', icon: Clock },
  { number: '50+', label: 'Suites', icon: Shield },
  { number: '5★', label: 'Rating', icon: Heart },
  { number: '24/7', label: 'Service', icon: Map }
];