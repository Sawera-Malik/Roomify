import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";
import gellary1 from "../assets/gellary1.png";
import gellary2 from "../assets/gellary2.png";
import gellary3 from "../assets/gellary3.png";
import gellary4 from "../assets/gellary4.png";
import gellary5 from "../assets/gellary5.png";
import gellary6 from "../assets/gellary6.png";
import moodboard from "../assets/moodboard.png";
import moodboard2 from "../assets/moodboard2.png";
import moodboard3 from "../assets/moodboard3.png";
import trendpost from "../assets/trendspost.png";

export const furnitureCategories = ["Furniture", "Seating", "Tables", "Beds", "Storage", "Lighting", "Plants", "Decor", "Rugs", "Wall Art"];

export const furnitureItems = [
  { name: "Sofa", category: "Seating", emoji: "🛋️" },
  { name: "Armchair", category: "Seating", emoji: "🪑" },
  { name: "Dining Chair", category: "Seating", emoji: "🪑" },
  { name: "Lounge Chair", category: "Seating", emoji: "💺" },
  { name: "Coffee Table", category: "Tables", emoji: "▭" },
  { name: "Dining Table", category: "Tables", emoji: "◻" },
  { name: "Side Table", category: "Tables", emoji: "◫" },
  { name: "Floor Lamp", category: "Lighting", emoji: "💡" },
  { name: "Pendant Light", category: "Lighting", emoji: "🔆" },
  { name: "Bookshelf", category: "Storage", emoji: "📚" },
  { name: "Cabinet", category: "Storage", emoji: "🗄️" },
  { name: "Plant", category: "Plants", emoji: "🌿" },
  { name: "Fiddle Leaf", category: "Plants", emoji: "🌱" },
  { name: "Abstract Print", category: "Wall Art", emoji: "🖼️" },
  { name: "Mirror", category: "Decor", emoji: "⬡" },
  { name: "Area Rug", category: "Rugs", emoji: "▦" },
  { name: "Bed Frame", category: "Beds", emoji: "🛏️" },
  { name: "King Bed", category: "Beds", emoji: "🛏️" },
  { name: "Bunk Bed", category: "Beds", emoji: "🛌" },
  { name: "Nightstand", category: "Storage", emoji: "◫" },
  { name: "Wardrobe", category: "Storage", emoji: "🚪" },
  { name: "Desk", category: "Tables", emoji: "🖥️" },
];

export const roomTypes = ["Living Room", "Bedroom", "Office"];
export const wallColors = ["#F7F5F0", "#E8E1D5", "#D4C4A8", "#C5D5C5", "#B8C4D4", "#E8C4B8", "#252525", "#1F2933"];
export const floorTypes = ["Light Wood", "Dark Wood", "Marble", "Concrete", "Tiles"];

export const floorBg: Record<string, string> = {
  "Light Wood": "repeating-linear-gradient(90deg, #D4B896 0px, #D4B896 40px, #C9A97D 40px, #C9A97D 41px)",
  "Dark Wood": "repeating-linear-gradient(90deg, #5C3D2E 0px, #5C3D2E 40px, #4A2F23 40px, #4A2F23 41px)",
  "Marble": "radial-gradient(ellipse at 20% 30%, #E8E4DC 0%, #F5F3EE 40%, #E0DDD5 70%, #F5F3EE 100%)",
  "Concrete": "#B8B4AE",
  "Tiles": "repeating-conic-gradient(#E8E4DC 0% 25%, #D8D4CC 0% 50%) 0 0/40px 40px",
};

export const ADMIN_EMAILS = [import.meta.env.VITE_ADMIN_EMAIL, 'admin@roomify.com'];

export const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Minimal", "Modern", "Scandinavian", "Luxury", "Cozy"];

export const designs = [
  { title: "Nordic Sanctuary", room: "Bedroom", style: "Scandinavian", img: "https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?w=600&h=700&fit=crop&auto=format", h: "h-72", saved: false },
  { title: "Urban Minimalist", room: "Living Room", style: "Minimal", img: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=600&h=500&fit=crop&auto=format", h: "h-60", saved: true },
  { title: "Warm Study", room: "Office", style: "Cozy", img: "https://images.unsplash.com/photo-1560890264-4b92305ee66e?w=600&h=450&fit=crop&auto=format", h: "h-56", saved: false },
  { title: "Marble & Stone", room: "Kitchen", style: "Luxury", img: "https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=600&h=600&fit=crop&auto=format", h: "h-64", saved: false },
  { title: "Golden Hour Loft", room: "Living Room", style: "Modern", img: "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?w=600&h=480&fit=crop&auto=format", h: "h-60", saved: true },
  { title: "Pine & Linen", room: "Bedroom", style: "Scandinavian", img: "https://images.unsplash.com/photo-1786107727673-dfb789a4e5c8?w=600&h=700&fit=crop&auto=format", h: "h-72", saved: false },
  { title: "Dark Glamour", room: "Living Room", style: "Luxury", img: "https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=600&h=550&fit=crop&auto=format", h: "h-64", saved: false },
  { title: "Open Kitchen", room: "Kitchen", style: "Modern", img: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=600&h=480&fit=crop&auto=format", h: "h-56", saved: true },
  { title: "Soft Focus Study", room: "Office", style: "Minimal", img: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=600&h=540&fit=crop&auto=format", h: "h-64", saved: false },
  { title: "Terrazzo & Sage", room: "Kitchen", style: "Modern", img: "https://images.unsplash.com/photo-1725257928373-dc6d2ac7b145?w=600&h=400&fit=crop&auto=format", h: "h-48", saved: false },
  { title: "Cotton Calm", room: "Bedroom", style: "Minimal", img: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&h=700&fit=crop&auto=format", h: "h-72", saved: false },
  { title: "Brass & Velvet", room: "Living Room", style: "Luxury", img: "https://images.unsplash.com/photo-1663811397219-c572550dffc5?w=600&h=500&fit=crop&auto=format", h: "h-60", saved: true },
];

export const featuredDesigns = [
  {
    title: "Modern Living Room",
    style: "Modern",
    img: feature1,
    tag: "Popular",
  },
  {
    title: "Scandinavian Bedroom",
    style: "Scandinavian",
    img: feature2,
    tag: "Trending",
  },
  {
    title: "Cozy Workspace",
    style: "Minimal",
    img: feature3,
    tag: "New",
  },
  {
    title: "Luxury Lounge",
    style: "Luxury",
    img: feature4,
    tag: "Editor's Pick",
  },
];

export const styles = [
  { name: "Scandinavian", desc: "Warm, minimal, natural", color: "#E8E1D5" },
  { name: "Modern", desc: "Clean lines, bold forms", color: "#D8D2C8" },
  { name: "Luxury", desc: "Rich textures, deep tones", color: "#C8BC9E" },
  { name: "Minimal", desc: "Less is more", color: "#EDEDEA" },
  { name: "Cozy", desc: "Warm, inviting, layered", color: "#DDD0BB" },
];

export const steps = [
  {
    n: "01",
    title: "Choose your room",
    desc: "Select from living rooms, bedrooms, kitchens, offices and more.",
  },
  {
    n: "02",
    title: "Pick a style",
    desc: "Browse curated interior styles from Scandinavian to Luxury.",
  },
  {
    n: "03",
    title: "Customize everything",
    desc: "Change walls, floors, lighting and arrange furniture freely.",
  },
  {
    n: "04",
    title: "Save & share",
    desc: "Export your design and bring it to life with your team.",
  },
];

export const galleryImages = [
  { img: gellary1, h: "h-48" },
  { img: gellary2, h: "h-72" },
  { img: gellary3, h: "h-56" },
  { img: gellary4, h: "h-48" },
  { img: gellary5, h: "h-64" },
  { img: gellary6, h: "h-48" },
];

export const testimonials = [
  {
    name: "Sofia Andersson",
    role: "Interior Designer, Stockholm",
    quote:
      "Roomify changed the way I present concepts to clients. The studio feels professional and the results are stunning.",
    avatar: "SA",
  },
  {
    name: "James Thornton",
    role: "Homeowner, London",
    quote:
      "I redesigned my entire apartment virtually before touching a single piece of furniture. Saved me so much time and money.",
    avatar: "JT",
  },
  {
    name: "Mei-Lin Chen",
    role: "Architect, Singapore",
    quote:
      "The depth of customization is remarkable. Wall textures, lighting warmth, furniture scale — all beautifully executed.",
    avatar: "MC",
  },
];

export const collections = [
  {
    title: "The Nordic Edit",
    desc: "Quiet whites, raw wood, linen textures — a celebration of functional beauty.",
    cover: feature2,
    count: 18,
    tag: "Scandinavian",
    accent: "#C4B99A",
  },
  {
    title: "Warm Modernism",
    desc: "Structured forms softened by earthy tones and organic materials.",
    cover: feature1,
    count: 24,
    tag: "Modern",
    accent: "#B08D57",
  },
  {
    title: "Dark Luxury",
    desc: "Moody palettes, velvet surfaces, and the drama of low light.",
    cover: feature4,
    count: 12,
    tag: "Luxury",
    accent: "#7B5E3A",
  },
  {
    title: "The Quiet Office",
    desc: "Thoughtful workspaces that encourage focus and calm creativity.",
    cover: feature3,
    count: 9,
    tag: "Minimal",
    accent: "#8FA89A",
  },
];

export const moodboards = [
  {
    title: "Golden Hour",
    palette: ["#F5E6C8", "#D4A96A", "#8B6340", "#3D2B1F", "#F7F2EA"],
    mood: "Warm · Intimate · Rich",
    img: gellary3,
    rooms: ["Living Room", "Bedroom"],
  },
  {
    title: "Arctic White",
    palette: ["#F8F7F4", "#E4DDD3", "#B0A898", "#6B6360", "#2C2A28"],
    mood: "Clean · Spacious · Minimal",
    img: moodboard,
    rooms: ["Bedroom", "Office"],
  },
  {
    title: "Forest & Stone",
    palette: ["#3D5A40", "#6B8C6E", "#C4B5A0", "#8B7355", "#F0EBE3"],
    mood: "Natural · Earthy · Grounded",
    img: moodboard2,
    rooms: ["Office", "Living Room"],
  },
  {
    title: "Midnight Marble",
    palette: ["#1A1814", "#2E2B27", "#5C5249", "#B08D57", "#F7F5F0"],
    mood: "Dramatic · Bold · Luxe",
    img: moodboard3,
    rooms: ["Kitchen", "Living Room"],
  },
];

export const trendPosts = [
  {
    title: "Boucle is back — and softer than ever",
    excerpt: "The tactile fabric of the moment is finding its way into every room of the house.",
    img: gellary2,
    readTime: "3 min read",
    category: "Trends",
    date: "Sep 14, 2026",
  },
  {
    title: "How curves replaced corners in modern interiors",
    excerpt: "Rounded edges are reshaping the way we think about furniture and architecture.",
    img: gellary3,
    readTime: "4 min read",
    category: "Design",
    date: "Sep 10, 2026",
  },
  {
    title: "The case for a single statement piece",
    excerpt: "One bold item — a sofa, a light, a rug — can anchor an entire room's identity.",
    img:trendpost,
    readTime: "5 min read",
    category: "Styling",
    date: "Sep 4, 2026",
  },
];

export const designerSpotlights = [
  {
    name: "Kelly Wearstler",
    title: "Kelly Wearstler Studio",
    specialty: "Luxury Interior Design",
    works: 34,
    quote: "Design is a journey of discovery.",
    portfolio: "https://www.kellywearstler.com/pages/interior-projects"
  },
  {
    name: "Patricia Urquiola",
    title: "Studio Urquiola",
    specialty: "Contemporary Residential",
    works: 32,
    quote: "Design is about creating experiences.",
    portfolio: "https://patriciaurquiola.com/architecture/"
  },
  {
    name: "Nimra Iftikhar",
    title: "Independent / Freelance",
    specialty: "Residential Interior Design",
    works: 28,
    quote: "Empty space is the loudest voice.",
    portfolio: "https://www.behance.net/nimraiftikhar7"
  },
];

export const tabs = ["Collections", "Moodboards", "Trends", "Designers"];

