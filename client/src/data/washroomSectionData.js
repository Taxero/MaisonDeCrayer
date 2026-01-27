import { Droplets, Sparkles, Wind, Shield } from "lucide-react";
import Washroom from "../assets/Washroom.jpg";
import Washroom2 from "../assets/Washroom2.jpg";
import Washroom4 from "../assets/Washroom4.jpg";
import Mirror from "../assets/Mirror.jpg";
import Mirror2 from "../assets/Mirror2.jpg";

export const washroomFeatures = [
  {
    id: 1,
    title: "Luxury Spa Washroom",
    image: Washroom,
    description:
      "Spa-inspired washroom with premium fixtures and tranquil ambiance",
    features: [
      "Marble Finishes",
      "Rain Shower",
      "Premium Fixtures",
      "Spa Amenities",
    ],
    category: "Premium",
  },
  {
    id: 2,
    title: "Modern Executive Washroom",
    image: Washroom2,
    description:
      "Contemporary design with smart technology and eco-friendly features",
    features: [
      "Smart Technology",
      "Eco-Friendly",
      "Touchless Fixtures",
      "LED Lighting",
    ],
    category: "Modern",
  },
  {
    id: 3,
    title: "Grand Suite Washroom",
    image: Washroom4,
    description:
      "Expansive washroom with separate areas and luxury amenities",
    features: [
      "Separate Areas",
      "Jacuzzi Tub",
      "His & Hers",
      "Luxury Amenities",
    ],
    category: "Luxury",
  },
  {
    id: 4,
    title: "Classic Vanity Area",
    image: Mirror,
    description:
      "Elegant vanity area with vintage mirror and premium lighting",
    features: [
      "Vintage Mirror",
      "Premium Lighting",
      "Marble Counter",
      "Ample Storage",
    ],
    category: "Classic",
  },
  {
    id: 5,
    title: "Modern Mirror Design",
    image: Mirror2,
    description:
      "Contemporary mirror design with integrated lighting and storage",
    features: [
      "Integrated Lighting",
      "Smart Mirror",
      "Hidden Storage",
      "Anti-Fog",
    ],
    category: "Modern",
  },
];

export const amenities = [
  { icon: Droplets, name: "Rain Showers", description: "Multi-function shower systems" },
  { icon: Sparkles, name: "Premium Amenities", description: "Luxury toiletries and essentials" },
  { icon: Wind, name: "Climate Control", description: "Individual temperature control" },
  { icon: Shield, name: "Privacy & Security", description: "Enhanced privacy features" },
];

export const washroomStats = [
  { number: "5★", label: "Luxury Rating" },
  { number: "24/7", label: "Hot Water" },
  { number: "100%", label: "Hygiene Standards" },
  { number: "Eco", label: "Friendly Design" },
];
