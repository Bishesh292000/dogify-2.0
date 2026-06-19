import {
  Bath,
  Beef,
  Bed,
  Bone,
  CalendarHeart,
  CircleHelp,
  Dog,
  HeartHandshake,
  HeartPulse,
  Home,
  Mail,
  MapPin,
  MessageCircleHeart,
  PackageCheck,
  PawPrint,
  Phone,
  Pill,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Truck,
  Utensils,
  Wifi
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceSlug = "food" | "accessories" | "grooming" | "medicines" | "health-support";

export type ServicePageData = {
  slug: ServiceSlug;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  heroCopy: string;
  icon: LucideIcon;
  accent: string;
  image: string;
  pillars: Array<{ title: string; copy: string; icon: LucideIcon }>;
  collections: Array<{ title: string; copy: string }>;
  process: Array<{ step: string; title: string; copy: string }>;
  metrics: Array<{ value: string; label: string }>;
};

export const heroImage =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=86";

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  food: {
    slug: "food",
    href: "/food",
    eyebrow: "Premium Nutrition",
    title: "Food planned around your pet's daily wellness.",
    description:
      "Curated food, treats, and supplements with clear choices for puppies, adults, seniors, picky eaters, and sensitive stomachs.",
    heroCopy:
      "DOGIFY food is built like a guided nutrition shelf, not a chaotic aisle. Explore trusted meals, treats, toppers, and supplements selected around breed, age, lifestyle, and health goals.",
    icon: Beef,
    accent: "from-dogify-blue to-dogify-cyan",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=86",
    pillars: [
      { title: "Breed-aware picks", copy: "Nutrition ranges for small, medium, large, and giant breeds.", icon: Dog },
      { title: "Clean rewards", copy: "Training treats and chews selected for quality ingredients.", icon: Bone },
      { title: "Wellness support", copy: "Coat, joint, gut, immunity, and recovery supplements.", icon: Pill }
    ],
    collections: [
      { title: "Dog Food", copy: "Daily dry and wet meals for puppies, adults, and seniors." },
      { title: "Cat Food", copy: "Balanced meals for indoor cats, kittens, and sensitive diets." },
      { title: "Treats", copy: "Rewards for training, dental care, and enrichment." },
      { title: "Supplements", copy: "Targeted support for skin, digestion, mobility, and immunity." }
    ],
    process: [
      { step: "01", title: "Understand routine", copy: "Age, breed, activity, allergies, and preferences are mapped first." },
      { step: "02", title: "Recommend cleanly", copy: "The range is narrowed to practical options that fit your pet." },
      { step: "03", title: "Adjust over time", copy: "Diet guidance evolves with weight, coat, energy, and digestion signals." }
    ],
    metrics: [
      { value: "500+", label: "Curated products" },
      { value: "4", label: "Nutrition categories" },
      { value: "24/7", label: "Diet support" }
    ]
  },
  accessories: {
    slug: "accessories",
    href: "/accessories",
    eyebrow: "Lifestyle Essentials",
    title: "Accessories that make pet life calmer and better designed.",
    description:
      "Beds, toys, harnesses, bowls, and travel gear chosen for safety, durability, comfort, and everyday beauty.",
    heroCopy:
      "DOGIFY accessories are selected for homes where pets are family and products should work hard without looking disposable.",
    icon: ShoppingBag,
    accent: "from-dogify-cyan to-dogify-green",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=86",
    pillars: [
      { title: "Comfort-first beds", copy: "Supportive materials for sleep, recovery, and personal space.", icon: Bed },
      { title: "Safer walks", copy: "Harnesses and leashes that balance control with comfort.", icon: ShieldCheck },
      { title: "Smarter enrichment", copy: "Toys selected for play style, chewing habits, and mental stimulation.", icon: Bone }
    ],
    collections: [
      { title: "Beds", copy: "Orthopedic, washable, travel-friendly, and cooling options." },
      { title: "Toys", copy: "Chew, tug, puzzle, plush, and fetch formats." },
      { title: "Harnesses", copy: "Everyday, training, reflective, and travel-safe fits." },
      { title: "Bowls", copy: "Slow feeders, steel bowls, raised diners, and hydration gear." },
      { title: "Travel Gear", copy: "Car seats, carriers, mats, and outdoor essentials." }
    ],
    process: [
      { step: "01", title: "Match lifestyle", copy: "Home, travel, walking style, and pet temperament guide the selection." },
      { step: "02", title: "Check fit and safety", copy: "Sizing, materials, washability, and usage are clearly considered." },
      { step: "03", title: "Build a routine", copy: "Products are grouped into everyday systems, not impulse purchases." }
    ],
    metrics: [
      { value: "5", label: "Core collections" },
      { value: "100%", label: "Pet-safe focus" },
      { value: "Fast", label: "Delivery ready" }
    ]
  },
  grooming: {
    slug: "grooming",
    href: "/grooming",
    eyebrow: "Luxury Grooming",
    title: "Spa-grade grooming with trained hands and calm handling.",
    description:
      "Bathing, trimming, nail care, spa treatments, and home visit grooming designed around hygiene, comfort, and trust.",
    heroCopy:
      "A polished grooming experience for pet parents who want professional care without stress, rushed handling, or messy coordination.",
    icon: Scissors,
    accent: "from-dogify-green to-dogify-cyan",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=86",
    pillars: [
      { title: "Certified groomers", copy: "Professionals trained for coat care, handling, and hygiene.", icon: ShieldCheck },
      { title: "Home visit option", copy: "Calmer grooming for pets who prefer familiar spaces.", icon: Home },
      { title: "Spa products", copy: "Coat-safe shampoos, conditioners, and finishing care.", icon: Sparkles }
    ],
    collections: [
      { title: "Bathing", copy: "Deep cleaning with coat-friendly products and careful drying." },
      { title: "Hair Trimming", copy: "Breed-aware styling, hygiene trims, and seasonal cuts." },
      { title: "Nail Clipping", copy: "Careful clipping and paw handling for comfort." },
      { title: "Spa Treatment", copy: "De-shedding, coat shine, paw care, and gentle finishing." },
      { title: "Home Visit Grooming", copy: "Professional grooming at your doorstep." }
    ],
    process: [
      { step: "01", title: "Book a slot", copy: "Choose service, location, timing, and pet details." },
      { step: "02", title: "Groom with care", copy: "The session is handled with hygiene, patience, and comfort checks." },
      { step: "03", title: "Follow-up guidance", copy: "Get coat, skin, paw, and routine care recommendations." }
    ],
    metrics: [
      { value: "5", label: "Grooming services" },
      { value: "Home", label: "Visit available" },
      { value: "Pro", label: "Certified care" }
    ]
  },
  medicines: {
    slug: "medicines",
    href: "/medicines",
    eyebrow: "Pet Healthcare",
    title: "Medicines and preventive care with professional clarity.",
    description:
      "Supplements, tick and flea care, prescriptions, first aid, and vaccination support managed with a calm healthcare standard.",
    heroCopy:
      "DOGIFY helps pet parents manage recurring health essentials with more confidence, better reminders, and clear guidance.",
    icon: Pill,
    accent: "from-dogify-blue to-slate-900",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=86",
    pillars: [
      { title: "Preventive focus", copy: "Tick, flea, skin, gut, and immunity products organized by need.", icon: ShieldCheck },
      { title: "Prescription support", copy: "Medication coordination with responsible prescription handling.", icon: Stethoscope },
      { title: "Vaccination reminders", copy: "Support for tracking repeat vaccines and preventive schedules.", icon: Syringe }
    ],
    collections: [
      { title: "Supplements", copy: "Coat, digestion, joints, immunity, and senior care." },
      { title: "Tick & Flea Care", copy: "Spot-ons, shampoos, sprays, collars, and prevention guidance." },
      { title: "Prescription Medicines", copy: "Guided prescription fulfilment and refill coordination." },
      { title: "First Aid", copy: "Wound care, recovery basics, and travel emergency essentials." },
      { title: "Vaccination Support", copy: "Reminder-led support for recurring schedules." }
    ],
    process: [
      { step: "01", title: "Clarify the need", copy: "Understand symptom, prescription, prevention, or refill context." },
      { step: "02", title: "Guide safely", copy: "Recommend responsible next steps and required vet involvement." },
      { step: "03", title: "Track follow-ups", copy: "Keep reminders and refills organized for ongoing care." }
    ],
    metrics: [
      { value: "24/7", label: "Health support" },
      { value: "5", label: "Care categories" },
      { value: "Safe", label: "Guided fulfilment" }
    ]
  },
  "health-support": {
    slug: "health-support",
    href: "/health-support",
    eyebrow: "Care OS",
    title: "Digital health support that keeps pet parents prepared.",
    description:
      "Vet consultation, WhatsApp support, diet guidance, emergency assistance, health tracking, and vaccination reminders.",
    heroCopy:
      "The most important DOGIFY layer: a connected care system for questions, routines, urgent moments, and long-term health.",
    icon: HeartPulse,
    accent: "from-dogify-cyan to-dogify-blue",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=86",
    pillars: [
      { title: "Vet consultation", copy: "Get structured guidance when symptoms, diet, or recovery feels unclear.", icon: Stethoscope },
      { title: "WhatsApp support", copy: "Fast assistance for everyday questions and next-step clarity.", icon: MessageCircleHeart },
      { title: "Health tracking", copy: "Track vaccines, diet changes, symptoms, weight, and recurring care.", icon: CalendarHeart }
    ],
    collections: [
      { title: "Vet Consultation", copy: "Guided access to professional advice." },
      { title: "WhatsApp Support", copy: "Care coordination through the channel pet parents already use." },
      { title: "Diet Guidance", copy: "Meal, supplement, and transition recommendations." },
      { title: "Emergency Assistance", copy: "Escalation guidance for urgent situations." },
      { title: "Health Tracking", copy: "Simple visibility into routines and changes." },
      { title: "Vaccination Reminders", copy: "Never lose track of important preventive care." }
    ],
    process: [
      { step: "01", title: "Create the profile", copy: "Breed, age, medical notes, diet, and routines are organized." },
      { step: "02", title: "Connect care", copy: "Questions, reminders, services, and products work together." },
      { step: "03", title: "Respond faster", copy: "When something changes, DOGIFY helps you choose the next step." }
    ],
    metrics: [
      { value: "6", label: "Care features" },
      { value: "24/7", label: "Support layer" },
      { value: "One", label: "Pet profile" }
    ]
  }
};

export const services = Object.values(servicePages);

export const trustMetrics = [
  { value: 1000, suffix: "+", label: "Happy Pets" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 24, suffix: "/7", label: "Health Support" }
];

export const trustBadges = [
  { title: "Fast Delivery", icon: Truck },
  { title: "Certified Groomers", icon: ShieldCheck },
  { title: "Trusted Care", icon: HeartPulse }
];

export const testimonials = [
  {
    quote:
      "DOGIFY made grooming and medicine refills feel effortless. The team actually remembers my beagle's needs.",
    name: "Aarav Mehta",
    pet: "Parent to Bruno"
  },
  {
    quote:
      "The health support is what sold me. Fast replies, proper guidance, and no panic when my cat skipped meals.",
    name: "Neha Iyer",
    pet: "Parent to Miso"
  },
  {
    quote:
      "It feels premium without becoming cold. Great products, clean grooming, and delivery that lands on time.",
    name: "Rhea Kapoor",
    pet: "Parent to Simba"
  }
];

export const companyStats = [
  { value: "1000+", label: "Happy pets supported" },
  { value: "500+", label: "Curated care products" },
  { value: "24/7", label: "Health support direction" },
  { value: "5", label: "Core care verticals" }
];

export const contactChannels = [
  { title: "WhatsApp Care", copy: "Fast support for product, grooming, and health questions.", icon: MessageCircleHeart },
  { title: "Email", copy: "royjada0852@gmail.com for partnerships and support.", icon: Mail },
  { title: "Phone", copy: "+91 6204408318 for booking assistance.", icon: Phone },
  { title: "Care Hub", copy: "Bengaluru, Mumbai, Delhi NCR, and expanding.", icon: MapPin }
];

export const faqItems = [
  {
    question: "Is DOGIFY an ecommerce store?",
    answer:
      "DOGIFY is designed as a pet-care ecosystem, not a simple ecommerce storefront. Products, grooming, medicines, and support are connected around the needs of each pet parent."
  },
  {
    question: "Can I book home grooming?",
    answer:
      "Yes. DOGIFY supports home visit grooming in available service areas, with services such as bathing, trimming, nail care, and spa treatments."
  },
  {
    question: "Do you provide veterinary support?",
    answer:
      "DOGIFY offers health support, consultation coordination, diet guidance, emergency direction, and reminders. Serious medical concerns should always be handled by a licensed veterinarian."
  },
  {
    question: "How are food and accessories selected?",
    answer:
      "The selection is curated around safety, quality, daily usefulness, pet life stage, breed needs, and trust. The goal is to reduce noise and help pet parents choose confidently."
  },
  {
    question: "Can DOGIFY help with recurring medicines?",
    answer:
      "DOGIFY can help organize preventive care, refill reminders, first-aid essentials, and prescription coordination where appropriate documentation is required."
  },
  {
    question: "Which cities does DOGIFY serve?",
    answer:
      "DOGIFY is positioned for major Indian cities first, with service availability expanding by category and location."
  }
];

export const legalSections = {
  privacy: [
    {
      title: "Information we collect",
      copy:
        "DOGIFY may collect contact details, pet profile information, order and service preferences, health-support context shared by you, and communication history needed to provide care."
    },
    {
      title: "How we use information",
      copy:
        "Information is used to personalize recommendations, coordinate grooming and health support, improve service quality, send reminders, and keep pet-care records organized."
    },
    {
      title: "Health information",
      copy:
        "Any health details shared with DOGIFY are handled with care and used only to support requested services, guidance, reminders, and responsible escalation."
    },
    {
      title: "Data protection",
      copy:
        "DOGIFY uses reasonable administrative, technical, and operational safeguards to protect user information from unauthorized access or misuse."
    }
  ],
  terms: [
    {
      title: "Platform use",
      copy:
        "DOGIFY provides pet-care discovery, coordination, product information, grooming booking, medicines support, and health-support workflows for responsible pet parents."
    },
    {
      title: "Medical responsibility",
      copy:
        "DOGIFY health support does not replace emergency veterinary care or diagnosis by a licensed veterinarian. Pet parents are responsible for seeking urgent clinical care when needed."
    },
    {
      title: "Bookings and availability",
      copy:
        "Grooming, delivery, and support availability may vary by city, pet profile, provider schedule, and service category."
    },
    {
      title: "Product and service standards",
      copy:
        "DOGIFY aims to curate trusted products and trained care partners, but suitability can vary by pet. Users should review instructions, labels, and professional advice."
    }
  ]
};

export const footerLinks = [
  { label: "Food", href: "/food" },
  { label: "Accessories", href: "/accessories" },
  { label: "Grooming", href: "/grooming" },
  { label: "Medicines", href: "/medicines" },
  { label: "Health Support", href: "/health-support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" }
];

export const careValues = [
  { title: "Trust before transaction", copy: "Every interaction should make care easier to understand.", icon: ShieldCheck },
  { title: "Premium but warm", copy: "DOGIFY should feel polished, friendly, and useful every day.", icon: HeartHandshake },
  { title: "One pet profile", copy: "Products, services, and reminders should connect around the same pet.", icon: PawPrint },
  { title: "Support that shows up", copy: "Pet parents need direction before, during, and after care moments.", icon: CircleHelp }
];
