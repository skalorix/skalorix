// Brand Colors
export const COLORS = {
  deepForest: '#0F231B',
  forest2: '#132E24',
  forest3: '#1B3D2F',
  softOchre: '#C5A67A',
  goldLight: '#D9C19E',
  goldDeep: '#A68A62',
  ivory: '#FDFBF6',
  ivory2: '#F7F0E6',
  cream: '#EFE6D5',
  parchment: '#F8F4EA',
  stone: '#A69E93',
  charcoal: '#171D1A',
};

// Three.js colors (hex numbers)
export const THREE_COLORS = {
  deepForest: 0x0F231B,
  forest2: 0x132E24,
  softOchre: 0xC5A67A,
  goldLight: 0xD9C19E,
  parchment: 0xFDFBF6,
  stone: 0xA69E93,
  charcoal: 0x171D1A,
  black: 0x000000,
  white: 0xffffff,
};

// Navigation
export const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

// Services (6 Core Disciplines with interactive tags and themed visual artwork)
export const SERVICES = [
  {
    num: '01',
    name: 'Web Development',
    tagline: 'Digital Experiences That Perform.',
    desc: 'High-performance, SEO-ready web platforms engineered with modern frameworks, edge rendering, and obsessive attention to speed and craft.',
    tags: ['React', 'Next.js', 'Performance', 'Full-Stack'],
    capabilities: ['UI/UX Design', 'Frontend Engineering', 'CMS Integration', 'E-Commerce', 'Performance Optimization', 'Responsive Layouts'],
    image: '/assets/services/service-web-development.jpg',
  },
  {
    num: '02',
    name: 'Software Development',
    tagline: 'Systems Built Around Your Business.',
    desc: 'Custom business software and application ecosystems that replace chaos with clarity. Scalable, modular, secure, and built to evolve.',
    tags: ['Custom Architecture', 'Cloud APIs', 'Databases', 'Modular'],
    capabilities: ['Web Applications', 'Mobile Development', 'API Design', 'Database Architecture', 'Cloud Infrastructure', 'Automation'],
    image: '/assets/services/service-software-development.jpg',
  },
  {
    num: '03',
    name: 'Search Engine Optimization',
    tagline: 'Be Found. Be Relevant.',
    desc: 'Technical SEO, search intelligence, and structured content architecture for compounding organic visibility — not tricks, but lasting authority.',
    tags: ['Technical Audits', 'Keyword Strategy', 'Search Intelligence'],
    capabilities: ['Technical Audits', 'Keyword Strategy', 'Content Optimization', 'Link Building', 'Local SEO', 'Analytics & Reporting'],
    image: '/assets/services/service-seo.jpg',
  },
  {
    num: '04',
    name: 'Creative Services',
    tagline: 'Make People Remember.',
    desc: 'From distinct brand identity to editorial design systems and campaign visuals, we craft work that cuts through noise and builds lasting recognition.',
    tags: ['Brand Identity', 'Editorial Design', 'Motion Art'],
    capabilities: ['Brand Identity', 'Visual Design', 'Motion Graphics', 'Campaign Creative', 'Packaging Design', 'Typography Direction'],
    image: '/assets/services/service-creative-services.jpg',
  },
  {
    num: '05',
    name: 'Social Media Marketing',
    tagline: 'Turn Attention Into Action.',
    desc: 'Strategic paid social campaigns that acquire qualified audiences, accelerate growth loops, and turn attention into measurable business outcomes.',
    tags: ['Paid Media', 'Targeting', 'Conversion Optimization'],
    capabilities: ['Paid Social Campaigns', 'Audience Targeting', 'A/B Testing', 'Conversion Optimization', 'Performance Analytics', 'Growth Loops'],
    image: '/assets/services/service-social-media-marketing.jpg',
  },
  {
    num: '06',
    name: 'Social Media Management',
    tagline: 'Build Consistency. Build Community.',
    desc: 'We cultivate your digital presence with intention — editorial content ecosystems, consistent brand voice, and genuine community engagement.',
    tags: ['Content Strategy', 'Community Growth', 'Brand Voice'],
    capabilities: ['Content Calendars', 'Community Management', 'Platform Strategy', 'Content Creation', 'Engagement Analysis', 'Brand Voice'],
    image: '/assets/services/service-social-media-management.jpg',
  },
];

// Process Steps (4-Step Connected Timeline)
export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand the business, users, and goals. Deep discovery, competitive audits, and honest diagnosis.',
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Create a clear strategy and architectural roadmap. Scope, tech stack, timeline, and measurable milestones.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Design and develop with precision. Iterative sprints, senior craftsmanship, and transparent reviews.',
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'Launch, improve, and scale. Monitoring, conversion optimization, and long-term strategic partnership.',
  },
];

// Why Skalorix (Why Skalorix Feels Different)
export const WHY_POINTS = [
  {
    icon: 'heart-handshake',
    title: 'Human-centered thinking',
    desc: 'We design for people first. Every interaction is tested against real human behavior, clarity, and accessibility.',
  },
  {
    icon: 'layers',
    title: 'Scalable technology',
    desc: 'Modular architecture, clean code, and cloud-native foundations engineered to support your long-term business growth.',
  },
  {
    icon: 'eye',
    title: 'Transparent collaboration',
    desc: 'Regular updates, shared ownership, and direct communication. You see progress, challenges, and decisions in real time.',
  },
  {
    icon: 'shield-check',
    title: 'Quality-driven execution',
    desc: 'Senior reviews, performance budgets, and rigorous testing ensure your product launches with absolute polish.',
  },
  {
    icon: 'infinity',
    title: 'Long-term partnership',
    desc: 'We stay beyond launch. Continuous optimization, ongoing support, and strategic guidance as your business expands.',
  },
];

// Featured Project
export const PROJECTS = [
  {
    id: 1,
    name: 'SNPIT Official Campus Mobile App',
    category: 'Cross-Platform Mobile App — Flutter & Dart',
    client: 'S. N. Patel Institute of Technology',
    tagline: 'Empowering Campus Connectivity & Academic Workflow',
    description: 'An official cross-platform mobile application engineered for S. N. Patel Institute of Technology using Flutter & Dart. Delivers a native 60fps mobile experience across Android & iOS, synchronizing real-time official notices, academic timetables, mid-sem exam schedules, attendance analytics, and faculty directories in one unified, calm, and performance-driven mobile ecosystem.',
    year: '2026',
    metrics: [
      { label: 'Timeline', value: '8 Weeks' },
      { label: 'Engine', value: 'Flutter • Dart' },
      { label: 'Platform', value: 'Android & iOS' },
    ],
    tags: ['Flutter', 'Dart', 'Cross-Platform', 'Mobile App', 'Campus ERP', 'UI/UX Design', 'Real-Time Sync'],
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: 'Skalorix brought editorial clarity and technological polish to our campus platform. The experience is calm, reliable, and deeply appreciated by our students and faculty.',
    author: 'SNPIT Project Lead',
    role: 'Campus Academic Technology Lead',
    tag: 'Mobile App Ecosystem',
    rating: 5,
    highlight: 'No generic agency feel. Every detail was intentional, responsive, and crafted around real student workflow.',
  }
];

// Social Links
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/skalorixofficial/' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://x.com/skalorix' },
];
