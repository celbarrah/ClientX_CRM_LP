// English version of content.ts: the same content, translated. Shown to visitors outside France and Morocco.
// Prices, payment links, logos, video and contact details are taken from the French file, so they cannot drift apart.
import * as fr from "./content";
import type { Widen } from "./i18n";

type C<K extends keyof typeof fr> = Widen<(typeof fr)[K]>;

export const DEMO_VIDEO: C<"DEMO_VIDEO"> = fr.DEMO_VIDEO;

export const CTA: C<"CTA"> = {
  primary: "Book a Demo",
  secondary: "Explore the platform",
};

export const CONTACT: C<"CONTACT"> = fr.CONTACT;

export const NAV: C<"NAV"> = [
  { label: "Platform", href: "#plateforme" },
  { label: "Modules", href: "#modules" },
  { label: "Use cases", href: "#cas-usage" },
  { label: "Pricing", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "Partners", href: "/en/partners" },
];

export const CLIENTS: C<"CLIENTS"> = fr.CLIENTS;

export const HERO: C<"HERO"> = {
  eyebrow: "Live demo + free audit of your tools",
  title: ["Book your", "free demo", "today."],
  subtitle:
    "The all-in-one AI CRM that brings websites, funnels, pipeline, emails, SMS, WhatsApp, calendars, payments, courses and AI agents together in a single platform.",
  perks: [
    "Personalized demo of your business",
    "Free audit of your current stack",
    "Guided start-up by email and videos + one 30-minute call",
  ],
};

export const VALUE: C<"VALUE"> = {
  eyebrow: "The platform",
  title: "Power up your",
  accent: "business",
  subtitle: "Replace more than 20 tools with a single AI-driven platform and save over €15,000 a year.",
  points: [
    { title: "A demo of your business", text: "Not a generic presentation: an expert builds the demo around your real use cases." },
    { title: "A free audit of your tools", text: "We identify every subscription ClientX AI can replace, and how much you save." },
    { title: "A dedicated eXpert", text: "1:1 onboarding, setup of your domains, DNS, emails and first workflows." },
  ],
};

export const STATS: C<"STATS"> = [
  { value: 0, prefix: "", suffix: " €", label: "in hidden costs" },
  { value: 20, prefix: "+", suffix: "", label: "tools in 1 platform" },
  { value: 9001, prefix: "ISO ", suffix: "", label: "Certified quality management", raw: true },
  { value: 100, prefix: "", suffix: "%", label: "unified and secure workflows" },
];

export const QUESTIONS: C<"QUESTIONS"> = {
  eyebrow: "Why ClientX AI",
  title: "Everything you need to",
  accent: "succeed",
  items: [
    {
      q: "How do I attract more customers?",
      a: "Websites, funnels, forms and booking turn every visit into a qualified lead, automatically tracked in your CRM.",
    },
    {
      q: "How do I convert and retain them?",
      a: "Emails, SMS and WhatsApp orchestrated by workflows and AI agents that follow up, reply and book for you.",
    },
    {
      q: "How do I scale?",
      a: "One tool, one subscription, one source of truth: your teams save time and your costs go down.",
    },
  ],
};

export const ENGINE: C<"ENGINE"> = {
  eyebrow: "The growth engine",
  title: "Build your",
  accent: "sales machine",
  steps: [
    { k: "01", title: "Capture", text: "Attract and qualify leads with websites and funnels that convert." },
    { k: "02", title: "Nurture", text: "Engage them on every channel with personalized sequences and AI." },
    { k: "03", title: "Close", text: "Sign, collect and invoice without ever leaving the platform." },
  ],
};

export const MODULES: C<"MODULES"> = [
  {
    key: "capture",
    eyebrow: "01 — Capture",
    title: "Capture new",
    accent: "leads",
    subtitle: "Build high-performing websites and sales funnels in minutes, without a developer.",
    bullets: [
      { title: "Websites & funnels", text: "Drag-and-drop editor, premium templates and custom domains." },
      { title: "Forms & surveys", text: "Qualify every visitor and send them straight into your pipeline." },
      { title: "A/B tests & analytics", text: "Measure every step and optimize your conversion rates." },
    ],
  },
  {
    key: "nurture",
    eyebrow: "02 — Nurture",
    title: "Turn your leads into",
    accent: "customers",
    subtitle: "The real value starts after the capture: engage every contact on the right channel, at the right time.",
    bullets: [
      { title: "Email, SMS & WhatsApp", text: "Personalized multichannel campaigns from a single screen." },
      { title: "Social planner", text: "Schedule your posts on all your social networks." },
      { title: "Unified inbox", text: "All your conversations, on all your devices." },
    ],
  },
  {
    key: "booking",
    eyebrow: "03 — Book",
    title: "Appointments,",
    accent: "100% automated",
    subtitle: "Your calendars fill themselves, and your leads show up.",
    bullets: [
      { title: "Online calendars", text: "One-click booking, synced with your calendars." },
      { title: "AI booking", text: "An AI agent qualifies and books right inside the conversation." },
      { title: "No-show reminders", text: "Automatic reminders by email, SMS and WhatsApp." },
    ],
  },
  {
    key: "courses",
    eyebrow: "04 — Teach",
    title: "Create your",
    accent: "membership areas",
    subtitle: "Host your courses and run your webinars without any extra tool.",
    bullets: [
      { title: "Courses & e-learning", text: "Modules, lessons, quizzes and progress tracking." },
      { title: "Free or paid access", text: "Sell your programs or offer them to your customers." },
      { title: "Live webinars", text: "Broadcast, engage and convert live." },
    ],
  },
  {
    key: "close",
    eyebrow: "05 — Close",
    title: "Sign more",
    accent: "deals",
    subtitle: "From the first opportunity to the invoice, your whole sales cycle in one place.",
    bullets: [
      { title: "CRM & sales pipeline", text: "See every opportunity and prioritize the right ones." },
      { title: "Stripe & PayPal payments", text: "Get paid online, in one go or by subscription." },
      { title: "Quotes, e-signature & invoicing", text: "Send, get signed and invoice in a few clicks." },
    ],
  },
  {
    key: "automate",
    eyebrow: "06 — Automate",
    title: "Let AI",
    accent: "work for you",
    subtitle: "Automate repetitive tasks and deploy AI agents that work 24/7.",
    bullets: [
      { title: "Automations", text: "Triggers, conditions and actions across all your channels." },
      { title: "Custom workflows", text: "Build your processes visually, without code." },
      { title: "AI agents", text: "They reply to, qualify and follow up with your leads for you." },
    ],
  },
];

export const TESTIMONIALS: C<"TESTIMONIALS"> = [
  {
    quote: "We replaced six subscriptions with ClientX AI. The whole sales team finally works in the same tool.",
    role: "Sales director",
    sector: "assurance",
  },
  {
    quote: "Automatic reminders have almost wiped out missed appointments. The time saved is huge.",
    role: "Manager, wellness center",
    sector: "bienetre",
  },
  {
    quote: "The 1:1 onboarding made all the difference: our first workflows were running in the very first week.",
    role: "Marketing director, training school",
    sector: "ecoles",
  },
  {
    quote: "Quotes, signature and payment in one place: our sales cycle got a lot shorter.",
    role: "Founder, real estate agency",
    sector: "immobilier",
  },
];

export const TOOLS: C<"TOOLS"> = [
  "Website builder", "Sales funnels", "Forms & surveys", "CRM",
  "Sales pipeline", "Email marketing", "SMS marketing", "WhatsApp Business",
  "Social planner", "Inbox", "Online calendars", "Automatic reminders",
  "Course platform", "Webinars", "Online payments", "Quotes",
  "E-signature", "Invoicing", "Automations", "AI agents",
];

export const SUPPORT: C<"SUPPORT"> = {
  eyebrow: "Support",
  title: "Exceptional",
  accent: "support",
  subtitle: "You are never alone: our eXperts support you from migration to success.",
  items: [
    { title: "Easy migration", text: "Guided start-up by email and videos + one 30-minute call: domains, DNS, emails and first workflows." },
    { title: "Support team", text: "A team that knows your account and your goals, reachable on several channels." },
    { title: "99.9% uptime", text: "Reliable infrastructure, encrypted data and ISO 9001 certified quality." },
  ],
};

export const SECTORS_LIST: C<"SECTORS_LIST"> = [
  "Insurance & Banking",
  "Automotive",
  "Schools & Training",
  "E-commerce",
  "Renewable energy & Water",
  "Real estate",
  "Restaurants",
  "Fitness, Beauty & Wellness",
];

export const TRUST: C<"TRUST"> = [
  { value: "ISO 9001", label: "Certified quality management" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "GDPR", label: "Encrypted data that stays yours" },
];

export const CURRENCIES: C<"CURRENCIES"> = {
  eur: { label: "France (€)", symbol: "€ excl. VAT" },
  mad: { label: "Morocco (MAD)", symbol: "DH excl. VAT" },
};

export const BILLING: C<"BILLING"> = {
  monthly: { label: "Monthly", unit: "month" },
  yearly: { label: "Yearly · 2 months free", unit: "year" },
};

const PLANS_EN = [
  {
    problem: "“I miss messages and appointments”",
    intro: "",
    features: [
      "Text AI assistant on Instagram, Facebook and your website",
      "Online calendars",
      "Appointment reminders by email",
      "Follow-up of missed appointments",
      "Google review requests to all your customers",
      "Review on day 12, then every month",
    ],
  },
  {
    problem: "“My customers don't come back enough”",
    intro: "Everything in Essentiel, plus:",
    features: [
      "WhatsApp",
      "Come-back reminders",
      "Follow-up of inactive customers at 60 and 180 days",
      "Reactivation of your customer base",
      "Birthday, referral and seasonal campaigns",
      "Last-minute slots",
    ],
  },
  {
    problem: "“I lose calls and I don't have a storefront that sells”",
    intro: "Everything in Croissance, plus:",
    features: [
      "Voice AI",
      "Automatic SMS on missed calls",
      "Appointment reminders by SMS",
      "Full website",
      "Packages, gift cards and deposits online",
      "Landing pages for your ads",
    ],
  },
];

export const PRICING: C<"PRICING"> = {
  setup: fr.PRICING.setup,
  // Same plans, names, prices and payment links as the French version; only the words are translated.
  plans: fr.PRICING.plans.map((p, i) => ({ ...p, ...PLANS_EN[i] })),
  credits: {
    offer: "$5 of free credits at sign-up.",
    text: "The subscription covers the setup and the whole system. Usage is billed as you go from the credits wallet: messages handled by the AI assistant, emails sent, Meta's WhatsApp fees, SMS and voice AI.",
  },
};

export const FAQ: C<"FAQ"> = [
  {
    q: "Can ClientX AI replace all my current subscriptions?",
    a: "Yes. ClientX AI replaces your funnel tool, your CRM, your email marketing solution, your calendars, your automations, your course hosting and your social planner, for more than €15,000 in savings a year.",
  },
  {
    q: "How do onboarding and support work?",
    a: "Guided start-up by email and videos + one 30-minute call with a ClientX AI eXpert to set up your domains, DNS, emails and your first workflows.",
  },
  {
    q: "Is my data secure and GDPR compliant?",
    a: "Yes. Your data is encrypted, our quality management is ISO 9001 certified, and your data stays yours.",
  },
  {
    q: "Can I try before I commit?",
    a: "Yes: you have a 30-day guarantee. If you are not satisfied, we refund your subscription, minus the value of the setup.",
  },
];

export const PARTNERS: C<"PARTNERS"> = {
  eyebrow: "ClientX Partner Program",
  title: "Recommend or resell the ClientX CRM and earn revenue",
  accent: "every month.",
  cta: "Become a partner",
  plans: [
    {
      key: "apporteur",
      name: "Referral partner",
      who: "Consultants, content creators, customers",
      commission: "20 %",
      period: "commission every month",
      points: [
        "Your personal referral link",
        "20 % commission every month, as long as the customer stays subscribed",
        "Nothing to install: we handle the demo and the setup",
      ],
      popular: false,
    },
    {
      key: "agence",
      name: "Agency partner",
      who: "Marketing or web agencies, integrators",
      commission: "30 %",
      period: "commission every month",
      points: [
        "You sell and install the CRM for your clients",
        "30 % commission every month, as long as the customer stays subscribed",
        "You invoice the setup and the support yourself",
      ],
      popular: true,
    },
  ],
  benefits: [
    { title: "Recurring revenue", text: "You get paid every month, as long as your customer stays subscribed." },
    { title: "No sign-up fee", text: "The program is free: you pay nothing to become a partner." },
    { title: "Dashboard", text: "Track your customers and your commissions in real time." },
    { title: "Marketing kit", text: "Ready-to-use visuals, presentation and demo to convince your contacts." },
    { title: "Training and support", text: "Partner training and a team to support you." },
    { title: "90-day attribution", text: "The customer is attributed to you for 90 days after clicking your link." },
  ],
  steps: [
    { title: "Sign up", text: "Fill in the application form, it's free." },
    { title: "Get your link and kit", text: "Your referral link and your marketing kit." },
    { title: "Recommend", text: "Share ClientX with your contacts, clients or followers." },
    { title: "Get paid every month", text: "Your commission comes in every month, as long as the customer stays subscribed." },
  ],
  faq: [
    {
      q: "How much will I earn?",
      a: "20 % of the subscription of each customer you refer as a referral partner, 30 % as an agency partner. The commission is paid every month, as long as the customer stays subscribed.",
    },
    {
      q: "Which plan should I choose?",
      a: "Referral partner if you recommend ClientX to your network without handling the installation. Agency partner if you sell and install the CRM for your clients, and invoice the setup and the support yourself.",
    },
    {
      q: "How is a customer attributed to me?",
      a: "Through your referral link: the customer is attributed to you for 90 days after their click.",
    },
    {
      q: "Is there a sign-up fee?",
      a: "No, the partner program has no sign-up fee.",
    },
    {
      q: "How do I track my commissions?",
      a: "From your partner dashboard, which lists your customers and your commissions.",
    },
  ],
  form: {
    title: "Your application",
    success: "Thank you! Your application has been received. Our partner team will get back to you shortly.",
  },
};

export const THANK_YOU: C<"THANK_YOU"> = {
  global: {
    path: "/en/thank-you",
    eyebrow: "Request sent",
    steps: [
      { title: "Confirmation", text: "You receive the confirmation of your request by email and SMS." },
      { title: "Getting in touch", text: "A ClientX AI eXpert contacts you within 24 hours to schedule your demo." },
      { title: "Your demo", text: "We present the platform, tailored to your business." },
    ],
    email: fr.CONTACT.email,
    phone: fr.CONTACT.phone,
  },
  MA: {
    path: "/en/thank-you-morocco",
    eyebrow: "Request sent · Morocco",
    steps: [
      { title: "Confirmation", text: "You receive the confirmation of your request by email and SMS." },
      { title: "Getting in touch", text: "A ClientX AI eXpert in Morocco contacts you within 24 hours to schedule your demo." },
      { title: "Your demo", text: "We present the platform, tailored to your business." },
    ],
    email: fr.CONTACT.email,
    phone: fr.CONTACT.phone,
  },
};

export const USE_CASES: C<"USE_CASES"> = [
  {
    key: "assurance",
    sector: "Insurance & Banking",
    tagline: "From quote requests to signed contracts.",
    cases: [
      { title: "Quote request qualification", text: "A smart form sorts the requests and an AI agent qualifies each lead before handing it to the advisor.", tags: ["Forms", "AI agents", "CRM"] },
      { title: "Renewal follow-ups", text: "Automatic reminders before the due date by email, SMS and WhatsApp, with built-in booking.", tags: ["Workflows", "WhatsApp"] },
      { title: "Advisor appointments", text: "Shared calendars per branch, no-show reminders and automatic assignment to the right advisor.", tags: ["Calendars", "Reminders"] },
      { title: "Subscription & e-signature", text: "Quote, e-signature and payment of the first installment in a single journey.", tags: ["Quotes", "E-signature", "Payments"] },
    ],
  },
  {
    key: "auto",
    sector: "Automotive",
    tagline: "More test drives, more sales, more servicing.",
    cases: [
      { title: "Test drive booking", text: "Landing pages per model and one-click test drive booking, synced with the salespeople.", tags: ["Funnels", "Calendars"] },
      { title: "Multi-dealership pipeline", text: "Every lead tracked from request to delivery, by site and by salesperson.", tags: ["CRM", "Pipeline"] },
      { title: "Service reminders", text: "Automatic follow-ups based on date or mileage, with workshop booking.", tags: ["Workflows", "SMS"] },
      { title: "Financing offers", text: "Financing quotes sent and signed electronically, paper-free.", tags: ["Quotes", "E-signature"] },
    ],
  },
  {
    key: "ecoles",
    sector: "Schools & Training",
    tagline: "From the first click to enrollment.",
    cases: [
      { title: "Online enrollment", text: "Application file, registration fee and automatic confirmation in a single funnel.", tags: ["Funnels", "Payments"] },
      { title: "Applicant follow-up", text: "Multichannel sequences that guide each applicant all the way to enrollment.", tags: ["Email", "WhatsApp"] },
      { title: "Open days as webinars", text: "Registration, reminders and automatic replay for your information days.", tags: ["Webinars", "Reminders"] },
      { title: "E-learning area", text: "Courses, quizzes and progress tracking for your students and alumni.", tags: ["Courses"] },
    ],
  },
  {
    key: "ecommerce",
    sector: "E-commerce",
    tagline: "Recover every cart, retain every customer.",
    cases: [
      { title: "Abandoned carts", text: "Follow-ups by email, SMS and WhatsApp at the right time to recover lost sales.", tags: ["Workflows", "WhatsApp"] },
      { title: "AI agent customer service", text: "An AI agent answers order tracking questions 24/7 and escalates when needed.", tags: ["AI agents", "Inbox"] },
      { title: "Loyalty campaigns", text: "Segmentation by purchase history and automatic personalized offers.", tags: ["CRM", "Email"] },
      { title: "Product launches", text: "Sales pages, waiting lists and online payments for every new product.", tags: ["Funnels", "Payments"] },
    ],
  },
  {
    key: "energie",
    sector: "Energy & Water",
    tagline: "Technical projects tracked end to end.",
    cases: [
      { title: "Simulator & qualification", text: "A form-simulator estimates the project and qualifies the lead before the call.", tags: ["Forms", "CRM"] },
      { title: "Technical visits", text: "Technician scheduling by area with automatic reminders to the customer.", tags: ["Calendars", "Reminders"] },
      { title: "Quotes & e-signature", text: "Detailed quotes sent, signed and tracked straight from the pipeline.", tags: ["Quotes", "E-signature"] },
      { title: "Installation tracking", text: "The customer is informed at every stage of the work, without calling in.", tags: ["Workflows", "SMS"] },
    ],
  },
  {
    key: "immobilier",
    sector: "Real estate",
    tagline: "Capture buyers, sign listings.",
    cases: [
      { title: "Buyer lead capture", text: "Property pages and qualifying forms connected straight to the CRM.", tags: ["Funnels", "CRM"] },
      { title: "Viewing scheduling", text: "Online booking of viewing slots with confirmation and reminders.", tags: ["Calendars", "Reminders"] },
      { title: "Listing follow-ups", text: "Automatic sequences for selling owners and valuations.", tags: ["Workflows", "Email"] },
      { title: "Documents & signatures", text: "Offers and documents signed electronically from the contact record.", tags: ["E-signature"] },
    ],
  },
  {
    key: "restauration",
    sector: "Restaurants",
    tagline: "Full tables, customers who come back.",
    cases: [
      { title: "Online reservations", text: "Table booking from your website and social networks, centralized in one calendar.", tags: ["Calendars", "Website"] },
      { title: "No-show prevention", text: "Automatic confirmations and reminders by SMS and WhatsApp.", tags: ["Reminders", "WhatsApp"] },
      { title: "Offers & events", text: "Targeted SMS campaigns for your evenings, menus and new dishes.", tags: ["SMS", "Social"] },
      { title: "Customer reviews", text: "Automatic review request after each visit to boost your reputation.", tags: ["Workflows"] },
    ],
  },
  {
    key: "bienetre",
    sector: "Fitness, Beauty & Wellness",
    tagline: "Full calendars and loyal members.",
    cases: [
      { title: "Session booking", text: "Classes, treatments and coaching bookable online, with automatic reminders.", tags: ["Calendars", "Reminders"] },
      { title: "Recurring memberships", text: "Monthly Stripe payments and member management in the CRM.", tags: ["Payments", "CRM"] },
      { title: "Reactivating inactive members", text: "A workflow detects absent members and follows up with an offer.", tags: ["Workflows", "WhatsApp"] },
      { title: "Online programs", text: "Sell your programs and challenges in a membership area.", tags: ["Courses"] },
    ],
  },
];

export const UI: C<"UI"> = {
  meta: {
    title: "ClientX AI — Book your demo of the all-in-one AI CRM",
    description:
      "Websites, funnels, CRM, emails, SMS, WhatsApp, calendars, payments, courses and AI agents in a single platform. Live demo + free audit of your tools.",
    ogTitle: "ClientX AI — The all-in-one AI CRM",
    ogDescription: "Replace 20+ tools and save over €15,000 a year. Book your free demo.",
    locale: "en_US",
  },
  home: "ClientX AI — home",
  langSwitch: "Language",
  hero: {
    line1: "Book your",
    highlight: "free",
    accent: "demo",
    line3: "today.",
    sticker: "Free audit",
    lead: "& get a free audit of your tools.",
    certified: "Certified",
  },
  logos: "They trust us",
  manifesto: {
    intro: "Who we are:",
    a: "We bring",
    stickerTools: "20+ tools in 1",
    highlight: "your tools",
    b: "together in a single platform.",
    c: "From",
    capture: "capture",
    stickerCosts: "€0 in hidden costs",
    d: "to",
    accent: "signature.",
    video: "The platform in action",
  },
  video: { play: "Play the demo video", watch: "Watch the demo" },
  modules: { eyebrow: "Capture → Nurture → Close", title: "One platform,", accent: "six superpowers" },
  mocks: {
    capture: {
      window: "your-business.com/offer",
      steps: ["Landing page", "Form", "Thank you"],
      step: "Step",
      sent: "Form submitted",
      added: "New lead added to the CRM",
    },
    nurture: {
      window: "Campaign — New lead nurturing",
      steps: [
        { ch: "Email", t: "Welcome aboard", d: "Day 0", rate: "Sent" },
        { ch: "SMS", t: "Your guide is ready", d: "Day 1", rate: "Delivered" },
        { ch: "WhatsApp", t: "A question? Reply here", d: "Day 3", rate: "Replied" },
        { ch: "Social media", t: "Scheduled post", d: "Day 5", rate: "Scheduled" },
      ],
      reply: "“Yes, I'm interested!”",
    },
    booking: {
      window: "Calendar — Demos & appointments",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      byAi: "Booked by AI",
      demo: "Demo",
      botA: "“How about ",
      botTime: "Tuesday at 1 pm",
      botB: " for your demo? Shall I send you the confirmation?”",
      reminder: "SMS reminder sent — D-1",
      confirmed: "Attendance confirmed",
    },
    courses: {
      window: "Membership area — Academy",
      modules: ["Module 1 — The fundamentals", "Module 2 — Taking action", "Module 3 — Advanced strategies"],
      enrolled: "New learner enrolled",
    },
    close: {
      window: "Sales pipeline — Q4",
      cols: ["New", "Demo", "Won"],
      signed: "Quote signed electronically",
      paid: "Payment received · Stripe",
    },
    automate: {
      window: "Workflow — Automatic qualification",
      nodes: [
        { t: "Trigger", d: "Form submitted" },
        { t: "AI agent", d: "Qualifies the lead" },
        { t: "WhatsApp", d: "Personalized message" },
        { t: "CRM", d: "Opportunity created" },
      ],
      active: "AI agent active 24/7",
    },
  },
  archive: {
    eyebrow: "Archives · Use cases",
    title: "Open the file for",
    accent: "your industry",
    subtitle: "Concrete, proven workflows. Click a folder to open it.",
    count: (sectors: number, cases: number) => `${sectors} industries · ${cases} use cases`,
    open: (sector: string) => `Open the ${sector} folder`,
    case: "Case",
    cases: (n: number) => `${n} use cases`,
    dialog: (sector: string) => `Use cases — ${sector}`,
    folder: "Folder",
    close: "Close",
    prev: "Previous folder",
    next: "Next folder",
    cta: (primary: string) => `${primary} for this industry`,
  },
  proof: {
    eyebrow: "They say it better than we do",
    prev: "Previous testimonial",
    next: "Next testimonial",
    item: (k: number) => `Testimonial ${k}`,
    supportA: "And you are never alone: ",
    supportAccent: "guided start-up",
    supportB: " by email and videos + one 30-minute call, and easy migration by our eXperts.",
  },
  tools: {
    eyebrow: "20+ tools vs 1 platform",
    title: "Stop paying for",
    accent: "20 tools",
    subtitle: "Every subscription you drop is one less login, one less invoice and one less source of errors.",
    today: "Today",
    subscriptions: "20+ subscriptions",
    stack: "Your current stack",
    with: "With ClientX AI",
    platform: "A single platform, driven by AI.",
    points: ["1 subscription, 1 login", "1 unified customer database", "1 support team", "Encrypted, GDPR-compliant data"],
    savings: "Estimated savings",
    amount: "€15,000",
    perYear: "/ year",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "How much does",
    accent: "ClientX AI cost?",
    subtitle: "Monthly with no commitment, or yearly with 2 months free.",
    billing: "Billing period",
    currency: "Currency",
    popular: "Most popular",
    monthlyTerms: (setup: string) => `+ ${setup} setup fee, one time · No commitment`,
    yearlyTerms: (setup: string) => `2 months free · + ${setup} setup fee`,
    choose: (name: string) => `Choose ${name}`,
    vat: "Prices excl. VAT, 20% VAT extra.",
  },
  faq: { eyebrow: "FAQ", title: "Your questions,", accent: "our answers", other: "Another question?" },
  footer: {
    eyebrow: "Live demo + free audit",
    title: "Ready to bring everything into",
    accent: "a single platform?",
    text: "An eXpert shows you ClientX AI on your own business, and identifies how much you can save.",
    sticker: "Reply within 24h",
    small: "Free demo · No commitment",
    tagline: "The all-in-one AI CRM that replaces more than 20 tools. ISO 9001 certified.",
    nav: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy policy",
  },
  form: {
    step: (n: number) => `Step ${n} of 2`,
    contactTitle: "Your contact details",
    companyTitle: "Your company",
    firstName: "First name",
    lastName: "Last name",
    workEmail: "Work email",
    email: "Email",
    phone: "Phone",
    emailPlaceholder: "sarah@company.com",
    next: "Continue",
    company: "Company",
    companyPlaceholder: "Your company name",
    sector: "Industry",
    sectorPlaceholder: "Select your industry",
    teamSize: "Team size",
    back: "Back",
    sending: "Sending…",
    redirecting: "Redirecting…",
    error: "Sending failed. Please try again, or email us at contact@clientx.ai.",
    privacy: "Your data is encrypted and never sold. By continuing, you accept our",
    privacyPartner: "Your data is encrypted and never sold. By sending this form, you accept our",
    privacyLink: "privacy policy",
    phoneCountry: "Country code",
    otherCountry: "Other country (full code)",
    phoneNumber: "Phone number",
    phonePlaceholder: "Country code + number",
    phoneFull: "Full number with the country code",
    phoneDigits: (n: string, dial: string) => `${n} digits after +${dial}`,
    range: (min: number, max: number) => `${min} to ${max}`,
  },
  partnerForm: {
    plan: "Plan",
    emailPlaceholder: "sarah@agency.com",
    company: "Company (optional)",
    companyPlaceholder: "Your agency or business",
    link: "Website or social network (optional)",
    message: "Your audience or your clients (optional)",
    messagePlaceholder: "Who do you plan to recommend or equip?",
  },
  partnersPage: {
    title: "ClientX Partner Program — Recommend or resell the ClientX CRM",
    description:
      "Referral partner (20 %) or agency partner (30 %): commissions every month, as long as your customers stay subscribed.",
    sticker: "Up to 30 % every month",
    benefits: { eyebrow: "Benefits", title: "Why become a", accent: "partner?" },
    steps: { eyebrow: "How it works", title: "4 steps to", accent: "get started" },
    apply: { eyebrow: "Application", title: "Become a", accent: "ClientX partner" },
    applyText: "Choose your plan and leave us your details: we send you your link and your marketing kit.",
  },
  thankYou: {
    title: "Thank you — Your ClientX AI demo request has been sent",
    titleMA: "Thank you — Your ClientX AI demo request (Morocco) has been sent",
    thanks: "Thank you",
    received: "! Your request has been ",
    accent: "received",
    next: "Here are the next steps.",
    back: "Back to the website",
    question: "A question?",
  },
  legal: { title: "Legal notice — ClientX AI", privacyTitle: "Privacy policy — ClientX AI" },
};

/** Industry values stay in French (the CRM receives the same values as from the French site). */
export const SECTOR_LABELS: C<"SECTOR_LABELS"> = {
  "Assurance & Banque": "Insurance & Banking",
  Automobile: "Automotive",
  "Écoles & Formation": "Schools & Training",
  "E-commerce": "E-commerce",
  "Énergies renouvelables & Traitement de l'eau": "Renewable energy & Water treatment",
  Immobilier: "Real estate",
  Restauration: "Restaurants",
  "Fitness, Beauté & Bien-être": "Fitness, Beauty & Wellness",
  Autre: "Other",
};

/** Plan values stay in French: they become the CRM tags. */
export const PARTNER_PLAN_LABELS: C<"PARTNER_PLAN_LABELS"> = {
  "Apporteur d'affaires": "Referral partner",
  "Partenaire agence": "Agency partner",
};

export const PHONE_NAMES: C<"PHONE_NAMES"> = {
  MA: "Morocco", FR: "France", BE: "Belgium", CH: "Switzerland", CA: "Canada / United States", DZ: "Algeria",
  TN: "Tunisia", SN: "Senegal", CI: "Côte d'Ivoire", AE: "United Arab Emirates", SA: "Saudi Arabia", DE: "Germany",
  BH: "Bahrain", BF: "Burkina Faso", CM: "Cameroon", CD: "DR Congo", EG: "Egypt", ES: "Spain", GA: "Gabon",
  GN: "Guinea", IE: "Ireland", IT: "Italy", KW: "Kuwait", LU: "Luxembourg", ML: "Mali", MR: "Mauritania",
  NL: "Netherlands", OM: "Oman", PT: "Portugal", QA: "Qatar", GB: "United Kingdom", TR: "Turkey",
};

export const ERRORS: C<"ERRORS"> = {
  "Prénom requis": "First name required",
  "Nom requis": "Last name required",
  "E-mail invalide": "Invalid email",
  "Numéro invalide : vérifiez le pays et le nombre de chiffres": "Invalid number: check the country and the number of digits",
  "Entreprise requise": "Company required",
  "Choisissez un secteur": "Choose an industry",
  "Choisissez une taille d'équipe": "Choose a team size",
  "Choisissez une formule": "Choose a plan",
};
