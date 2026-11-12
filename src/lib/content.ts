// All landing page copy lives here so it can be edited without touching components.
// Items marked PLACEHOLDER must be replaced with real client data before going live.

export const DEMO_VIDEO =
  // #t=0.5 shows a frame of the video as its thumbnail before play.
  "https://res.cloudinary.com/dofyrwzop/video/upload/v1792158049/Explainer_V2_AI_Employee_1__fr-FR_dubbed_a8ogus.mp4#t=0.5";

export const CTA = {
  primary: "Réserver une Démo",
  secondary: "Découvrir la plateforme",
};

export const CONTACT = {
  email: "contact@clientx.ai",
  phone: "+33 (0)7 83 65 33 84",
  phoneHref: "+33783653384",
  entities: "ClientX AI by Webeuz · ClientX Ltd · WBX SARL",
};

export const NAV = [
  { label: "Plateforme", href: "#plateforme" },
  { label: "Modules", href: "#modules" },
  { label: "Cas d'usage", href: "#cas-usage" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "Partenaires", href: "/partenaires" },
];

// Logos are served from /public/clients. tone "gray" = logo with filled shapes that would become a blob as a silhouette.
export const CLIENTS: { name: string; src: string; tone?: "gray" }[] = [
  { name: "Inwi", src: "/clients/inwi.webp" },
  { name: "CNSS", src: "/clients/cnss.webp" },
  { name: "Volvo", src: "/clients/volvo.webp" },
  { name: "SOFAC", src: "/clients/sofac.webp" },
  { name: "Tanger Med", src: "/clients/tanger-med.webp" },
  { name: "Autocaz", src: "/clients/autocaz.webp" },
  { name: "Fuso", src: "/clients/fuso.webp" },
  { name: "Kapset Group", src: "/clients/kapset-group.webp" },
  { name: "CIMR", src: "/clients/cimr.webp" },
  { name: "Groupe Allali", src: "/clients/groupe-allali.webp" },
  { name: "Centrale", src: "/clients/centrale.webp" },
  { name: "Panzani", src: "/clients/panzani.webp" },
  { name: "Honoris United Universities", src: "/clients/honoris.webp" },
  { name: "Ostelea", src: "/clients/ostelea.webp" },
  { name: "Barry Callebaut", src: "/clients/barry.webp" },
  { name: "Miamia", src: "/clients/miami.webp" },
  { name: "Filipinos", src: "/clients/filipinos.webp", tone: "gray" },
  { name: "Quintessence", src: "/clients/quintessence.webp" },
  { name: "American Academy", src: "/clients/american-academy.webp" },
  { name: "Peugeot", src: "/clients/peugeot.webp" },
  { name: "Mafoder", src: "/clients/mafoder.webp" },
  { name: "Jamain Baco", src: "/clients/jamain.webp" },
  { name: "Comicom", src: "/clients/comicom.webp" },
  { name: "Dimateq", src: "/clients/dimateq.webp" },
  { name: "Alamana", src: "/clients/alamana.webp" },
  { name: "Eqdom", src: "/clients/ecdome.webp" },
  { name: "Khayatey Living", src: "/clients/khayatey.webp" },
  { name: "Maserati", src: "/clients/maserati.webp" },
  { name: "Chery", src: "/clients/chery.webp" },
  { name: "Land Rover", src: "/clients/land-rover.webp" },
  { name: "Citroen", src: "/clients/citroen.webp" },
  { name: "Epil Tech", src: "/clients/epil-tech.webp" },
  { name: "Auto Hall", src: "/clients/auto-hall.webp" },
  { name: "Jaguar", src: "/clients/jaguar.webp" },
  { name: "Ford", src: "/clients/ford.webp" },
  { name: "Aston Martin", src: "/clients/aston-martin.webp" },
  { name: "Opel", src: "/clients/opel.webp" },
  { name: "Renault Trucks", src: "/clients/renault.webp", tone: "gray" },
  { name: "OCP", src: "/clients/ocp.webp" },
  { name: "Ayvens", src: "/clients/ayven.webp" },
  { name: "Menara", src: "/clients/menara.webp" },
  { name: "Chronopost", src: "/clients/chronopost.webp" },
  { name: "GSK", src: "/clients/gsk.webp" },
  { name: "Bayer", src: "/clients/bayer.webp" },
  { name: "Leo", src: "/clients/leo.webp" },
  { name: "Prestigia", src: "/clients/prestigia.webp" },
  { name: "Coralia", src: "/clients/coralia.webp", tone: "gray" },
  { name: "Addoha", src: "/clients/addoha.webp" },
  { name: "DS Automobiles", src: "/clients/automobile.webp" },
  { name: "Omoda", src: "/clients/omoda.webp" },
  { name: "Suzuki", src: "/clients/suzuki.webp" },
  { name: "CFAO", src: "/clients/cfao.webp" },
  { name: "Ford Trucks", src: "/clients/ford-trucks.webp" },
];

export const HERO = {
  eyebrow: "Démo live + audit gratuit de vos outils",
  title: ["Réservez votre", "démo gratuite", "aujourd'hui."],
  subtitle:
    "Le CRM IA tout-en-un qui réunit sites, funnels, pipeline, e-mails, SMS, WhatsApp, agendas, paiements, formations et agents IA dans une seule plateforme.",
  perks: [
    "Démo personnalisée sur votre activité",
    "Audit offert de votre stack actuelle",
    "Mise en route guidée par e-mail et vidéos + 1 appel de 30 min",
  ],
};

export const VALUE = {
  eyebrow: "La plateforme",
  title: "Propulsez votre",
  accent: "entreprise",
  subtitle:
    "Remplacez plus de 20 outils par une seule plateforme pilotée par l'IA et économisez plus de 15 000 € par an.",
  points: [
    { title: "Une démo sur votre business", text: "Pas une présentation générique : un expert configure la démo autour de vos vrais cas d'usage." },
    { title: "Un audit de vos outils offert", text: "Nous identifions chaque abonnement que ClientX AI peut remplacer, et ce que vous économisez." },
    { title: "Un eXpert dédié", text: "Onboarding 1:1, configuration des domaines, DNS, e-mails et premiers workflows." },
  ],
};

export const STATS = [
  { value: 0, prefix: "", suffix: " €", label: "de coûts cachés" },
  { value: 20, prefix: "+", suffix: "", label: "outils réunis en 1 plateforme" },
  { value: 9001, prefix: "ISO ", suffix: "", label: "Management de la qualité certifié", raw: true },
  { value: 100, prefix: "", suffix: "%", label: "workflows unifiés et sécurisés" },
];

export const QUESTIONS = {
  eyebrow: "Pourquoi ClientX AI",
  title: "Tout ce qu'il faut pour",
  accent: "réussir",
  items: [
    {
      q: "Comment attirer plus de clients ?",
      a: "Sites, funnels, formulaires et prises de rendez-vous transforment chaque visite en prospect qualifié, automatiquement suivi dans votre CRM.",
    },
    {
      q: "Comment les convertir et les fidéliser ?",
      a: "E-mails, SMS et WhatsApp orchestrés par des workflows et des agents IA qui relancent, répondent et réservent à votre place.",
    },
    {
      q: "Comment passer à l'échelle ?",
      a: "Un seul outil, un seul abonnement, une seule source de vérité : vos équipes gagnent du temps et vos coûts baissent.",
    },
  ],
};

export const ENGINE = {
  eyebrow: "Le moteur de croissance",
  title: "Construisez votre",
  accent: "machine commerciale",
  steps: [
    { k: "01", title: "Capturer", text: "Attirez et qualifiez vos prospects avec des sites et des funnels qui convertissent." },
    { k: "02", title: "Nourrir", text: "Engagez-les sur chaque canal avec des séquences personnalisées et l'IA." },
    { k: "03", title: "Conclure", text: "Signez, encaissez et facturez sans jamais quitter la plateforme." },
  ],
};

export type ModuleKey = "capture" | "nurture" | "booking" | "courses" | "close" | "automate";

export const MODULES: {
  key: ModuleKey;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  bullets: { title: string; text: string }[];
}[] = [
  {
    key: "capture",
    eyebrow: "01 — Capturer",
    title: "Captez de nouveaux",
    accent: "prospects",
    subtitle: "Créez des sites et des tunnels de vente performants en quelques minutes, sans développeur.",
    bullets: [
      { title: "Sites web & funnels", text: "Éditeur glisser-déposer, modèles premium et domaines personnalisés." },
      { title: "Formulaires & sondages", text: "Qualifiez chaque visiteur et envoyez-le directement dans votre pipeline." },
      { title: "Tests A/B & analytics", text: "Mesurez chaque étape et optimisez vos taux de conversion." },
    ],
  },
  {
    key: "nurture",
    eyebrow: "02 — Nourrir",
    title: "Transformez vos prospects en",
    accent: "clients",
    subtitle: "La vraie valeur commence après la capture : engagez chaque contact sur le bon canal, au bon moment.",
    bullets: [
      { title: "E-mail, SMS & WhatsApp", text: "Campagnes multicanales personnalisées depuis un seul écran." },
      { title: "Planificateur social", text: "Programmez vos publications sur tous vos réseaux sociaux." },
      { title: "Boîte de réception unifiée", text: "Toutes vos conversations, sur tous vos appareils." },
    ],
  },
  {
    key: "booking",
    eyebrow: "03 — Réserver",
    title: "Des rendez-vous",
    accent: "100% automatisés",
    subtitle: "Vos agendas se remplissent seuls, et vos prospects se présentent.",
    bullets: [
      { title: "Agendas en ligne", text: "Réservation en un clic, synchronisée avec vos calendriers." },
      { title: "Rendez-vous par IA", text: "Un agent IA qualifie et réserve directement dans la conversation." },
      { title: "Rappels anti no-show", text: "Rappels automatiques par e-mail, SMS et WhatsApp." },
    ],
  },
  {
    key: "courses",
    eyebrow: "04 — Former",
    title: "Créez vos espaces",
    accent: "membres",
    subtitle: "Hébergez vos formations et animez vos webinaires sans outil supplémentaire.",
    bullets: [
      { title: "Formations & e-learning", text: "Modules, leçons, quiz et suivi de progression." },
      { title: "Accès gratuits ou payants", text: "Vendez vos programmes ou offrez-les à vos clients." },
      { title: "Webinaires live", text: "Diffusez, engagez et convertissez en direct." },
    ],
  },
  {
    key: "close",
    eyebrow: "05 — Conclure",
    title: "Signez plus de",
    accent: "contrats",
    subtitle: "De la première opportunité à la facture, tout votre cycle de vente au même endroit.",
    bullets: [
      { title: "CRM & pipeline de ventes", text: "Visualisez chaque opportunité et priorisez les bonnes." },
      { title: "Paiements Stripe & PayPal", text: "Encaissez en ligne, en une fois ou par abonnement." },
      { title: "Devis, e-signature & facturation", text: "Envoyez, faites signer et facturez en quelques clics." },
    ],
  },
  {
    key: "automate",
    eyebrow: "06 — Automatiser",
    title: "Laissez l'IA",
    accent: "travailler pour vous",
    subtitle: "Automatisez les tâches répétitives et déployez des agents IA qui travaillent 24h/24.",
    bullets: [
      { title: "Automatisations", text: "Déclencheurs, conditions et actions sur tous vos canaux." },
      { title: "Workflows sur mesure", text: "Construisez vos processus visuellement, sans code." },
      { title: "Agents IA", text: "Répondent, qualifient et relancent vos prospects à votre place." },
    ],
  },
];

// PLACEHOLDER quotes — replace with real testimonials. Shown anonymised (role + sector), no client name.
export const TESTIMONIALS = [
  {
    quote:
      "Nous avons remplacé six abonnements par ClientX AI. Toute l'équipe commerciale travaille enfin dans le même outil.",
    role: "Directeur commercial",
    sector: "assurance" as SectorKey,
  },
  {
    quote:
      "Les rappels automatiques ont presque fait disparaître les rendez-vous manqués. Le gain de temps est énorme.",
    role: "Gérante, centre de bien-être",
    sector: "bienetre" as SectorKey,
  },
  {
    quote:
      "L'onboarding 1:1 a fait toute la différence : nos premiers workflows tournaient dès la première semaine.",
    role: "Directrice marketing, école de formation",
    sector: "ecoles" as SectorKey,
  },
  {
    quote:
      "Devis, signature et paiement au même endroit : notre cycle de vente s'est considérablement raccourci.",
    role: "Fondateur, agence immobilière",
    sector: "immobilier" as SectorKey,
  },
];

export const TOOLS = [
  "Créateur de sites", "Tunnels de vente", "Formulaires & sondages", "CRM",
  "Pipeline de ventes", "E-mailing", "SMS marketing", "WhatsApp Business",
  "Planificateur social", "Boîte de réception", "Agendas en ligne", "Rappels automatiques",
  "Plateforme de formation", "Webinaires", "Paiements en ligne", "Devis",
  "Signature électronique", "Facturation", "Automatisations", "Agents IA",
];

export const SUPPORT = {
  eyebrow: "Accompagnement",
  title: "Un accompagnement",
  accent: "d'eXception",
  subtitle: "Vous n'êtes jamais seul : nos eXperts vous accompagnent de la migration au succès.",
  items: [
    { title: "Migration simplifiée", text: "Mise en route guidée par e-mail et vidéos + 1 appel de 30 min : domaines, DNS, e-mails et premiers workflows." },
    { title: "Équipe support", text: "Une équipe qui connaît votre compte et vos objectifs, joignable sur plusieurs canaux." },
    { title: "99,9% de disponibilité", text: "Une infrastructure fiable, des données chiffrées et une qualité certifiée ISO 9001." },
  ],
};

export const SECTORS_LIST = [
  "Assurance & Banque",
  "Automobile",
  "Écoles & Formation",
  "E-commerce",
  "Énergies renouvelables & Eau",
  "Immobilier",
  "Restauration",
  "Fitness, Beauté & Bien-être",
];

export const TRUST = [
  { value: "ISO 9001", label: "Management de la qualité certifié" },
  { value: "99,9%", label: "Disponibilité de la plateforme" },
  { value: "RGPD", label: "Données chiffrées, et qui restent les vôtres" },
];

// Visitors in Morocco see DH (HT) by default plus a switch; everyone else sees euros.
// France buys online (payment links, the account is created after payment); Morocco books a demo (Payzone invoice after it).
export const CURRENCIES = { eur: { label: "France (€)", symbol: "€ HT" }, mad: { label: "Maroc (MAD)", symbol: "DH HT" } } as const;
export type Currency = keyof typeof CURRENCIES;

export const BILLING = { monthly: { label: "Mensuel", unit: "mois" }, yearly: { label: "Annuel · 2 mois offerts", unit: "an" } } as const;
export type Billing = keyof typeof BILLING;

export const PRICING = {
  setup: { eur: "490", mad: "4 900" },
  plans: [
    {
      name: "Essentiel",
      problem: "« Je rate des messages et des rendez-vous »",
      price: { monthly: { eur: "149", mad: "1 490" }, yearly: { eur: "1 490", mad: "14 900" } },
      paymentLinks: {
        monthly: "https://link.clientx.ai/payment-link/6aeb07025b49394de8f594fc",
        yearly: "https://link.clientx.ai/payment-link/6aeb07045b49394de8f594fd",
      },
      intro: "",
      features: [
        "Assistant IA texte sur Instagram, Facebook et votre site",
        "Agendas en ligne",
        "Rappels de rendez-vous par e-mail",
        "Relance des rendez-vous manqués",
        "Demande d'avis Google à tous vos clients",
        "Bilan à J12, puis chaque mois",
      ],
      note: "",
      popular: false,
    },
    {
      name: "Croissance",
      problem: "« Mes clients ne reviennent pas assez »",
      price: { monthly: { eur: "249", mad: "2 490" }, yearly: { eur: "2 490", mad: "24 900" } },
      paymentLinks: {
        monthly: "https://link.clientx.ai/payment-link/6aeb07055b49394de8f594fe",
        yearly: "https://link.clientx.ai/payment-link/6aeb07075b49394de8f594ff",
      },
      intro: "Tout Essentiel, plus :",
      features: [
        "WhatsApp",
        "Rappels de retour",
        "Relance des clients inactifs à 60 et 180 jours",
        "Réactivation de votre base clients",
        "Campagnes anniversaire, parrainage et saisonnières",
        "Créneaux de dernière minute",
      ],
      note: "",
      popular: true,
    },
    {
      name: "Premium",
      problem: "« Je perds des appels et je n'ai pas de vitrine qui vend »",
      price: { monthly: { eur: "399", mad: "3 990" }, yearly: { eur: "3 990", mad: "39 900" } },
      paymentLinks: {
        monthly: "https://link.clientx.ai/payment-link/6aeb07085b49394de8f59500",
        yearly: "https://link.clientx.ai/payment-link/6aeb070a5b49394de8f59501",
      },
      intro: "Tout Croissance, plus :",
      features: [
        "IA vocale",
        "SMS automatique sur appel manqué",
        "Rappels de rendez-vous par SMS",
        "Site complet",
        "Forfaits, cartes cadeaux et acomptes en ligne",
        "Pages pour vos publicités",
      ],
      note: "",
      popular: false,
    },
  ],
  // 6. Usage is never included: it is paid from the credits wallet.
  credits: {
    offer: "5 $ de crédits offerts à l'inscription.",
    text: "L'abonnement comprend la mise en place et tout le système. L'usage est facturé à la consommation via le portefeuille de crédits : messages traités par l'assistant IA, e-mails envoyés, frais WhatsApp de Meta, SMS et IA vocale.",
  },
};

export const FAQ = [
  {
    q: "ClientX AI peut-il remplacer tous mes abonnements actuels ?",
    a: "Oui. ClientX AI remplace votre outil de funnels, votre CRM, votre solution d'e-mailing, vos agendas, vos automatisations, votre hébergement de formations et votre planificateur social, pour plus de 15 000 € d'économies par an.",
  },
  {
    q: "Comment se passent l'onboarding et le support ?",
    a: "Mise en route guidée par e-mail et vidéos + 1 appel de 30 min avec un eXpert ClientX AI pour configurer vos domaines, DNS, e-mails et vos premiers workflows.",
  },
  {
    q: "Mes données sont-elles sécurisées et conformes au RGPD ?",
    a: "Oui. Vos données sont chiffrées, notre management de la qualité est certifié ISO 9001, et vos données restent les vôtres.",
  },
  {
    q: "Puis-je essayer avant de m'engager ?",
    a: "Oui : vous avez une garantie de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons votre abonnement, moins la valeur de la mise en place.",
  },
];

/** /partenaires: ClientX Partner Program. */
export const PARTNERS = {
  eyebrow: "ClientX Partner Program",
  title: "Recommandez ou revendez le CRM ClientX et touchez des revenus",
  accent: "chaque mois.",
  cta: "Devenir partenaire",
  plans: [
    {
      key: "apporteur",
      name: "Apporteur d'affaires",
      who: "Consultants, créateurs de contenu, clients",
      commission: "20 %",
      period: "de commission chaque mois",
      points: [
        "Votre lien de recommandation personnel",
        "20 % de commission chaque mois, tant que le client reste abonné",
        "Rien à installer : nous gérons la démo et la mise en place",
      ],
      popular: false,
    },
    {
      key: "agence",
      name: "Partenaire agence",
      who: "Agences marketing ou web, intégrateurs",
      commission: "30 %",
      period: "de commission chaque mois",
      points: [
        "Vous vendez et installez le CRM pour vos clients",
        "30 % de commission chaque mois, tant que le client reste abonné",
        "Vous facturez vous-même la mise en place et le support",
      ],
      popular: true,
    },
  ],
  benefits: [
    { title: "Revenus récurrents", text: "Vous êtes payé chaque mois, tant que votre client reste abonné." },
    { title: "Aucun frais d'inscription", text: "Le programme est gratuit : vous ne payez rien pour devenir partenaire." },
    { title: "Tableau de bord", text: "Suivez vos clients et vos commissions en temps réel." },
    { title: "Kit marketing", text: "Visuels, présentation et démo prêts à l'emploi pour convaincre vos contacts." },
    { title: "Formation et support", text: "Une formation partenaire et une équipe pour vous accompagner." },
    { title: "Attribution 90 jours", text: "Le client vous est attribué pendant 90 jours après le clic sur votre lien." },
  ],
  steps: [
    { title: "S'inscrire", text: "Remplissez le formulaire de candidature, c'est gratuit." },
    { title: "Recevoir son lien et son kit", text: "Votre lien de recommandation et votre kit marketing." },
    { title: "Recommander", text: "Partagez ClientX à vos contacts, clients ou abonnés." },
    { title: "Être payé chaque mois", text: "Votre commission tombe chaque mois, tant que le client reste abonné." },
  ],
  faq: [
    {
      q: "Combien vais-je gagner ?",
      a: "20 % de l'abonnement de chaque client recommandé en tant qu'apporteur d'affaires, 30 % en tant que partenaire agence. La commission est versée chaque mois, tant que le client reste abonné.",
    },
    {
      q: "Quelle formule choisir ?",
      a: "Apporteur d'affaires si vous recommandez ClientX à votre réseau sans vous occuper de l'installation. Partenaire agence si vous vendez et installez le CRM pour vos clients, et facturez vous-même la mise en place et le support.",
    },
    {
      q: "Comment un client m'est-il attribué ?",
      a: "Par votre lien de recommandation : le client vous est attribué pendant 90 jours après son clic.",
    },
    {
      q: "L'inscription est-elle payante ?",
      a: "Non, le programme partenaire est sans frais d'inscription.",
    },
    {
      q: "Comment suivre mes commissions ?",
      a: "Depuis votre tableau de bord partenaire, qui liste vos clients et vos commissions.",
    },
  ],
  form: {
    title: "Votre candidature",
    success: "Merci ! Votre candidature est bien reçue. Notre équipe partenaires vous recontacte rapidement.",
  },
};

/** Thank-you pages: /merci (global) and /merci-maroc (visitors in Morocco). Edit each independently. */
export const THANK_YOU = {
  global: {
    path: "/merci",
    eyebrow: "Demande envoyée",
    steps: [
      { title: "Confirmation", text: "Vous recevez la confirmation de votre demande par e-mail et SMS." },
      { title: "Prise de contact", text: "Un eXpert ClientX AI vous contacte sous 24h pour planifier votre démo." },
      { title: "Votre démo", text: "Nous vous présentons la plateforme, personnalisée pour votre activité." },
    ],
    email: CONTACT.email,
    phone: CONTACT.phone,
  },
  MA: {
    path: "/merci-maroc",
    eyebrow: "Demande envoyée · Maroc",
    steps: [
      { title: "Confirmation", text: "Vous recevez la confirmation de votre demande par e-mail et SMS." },
      { title: "Prise de contact", text: "Un eXpert ClientX AI au Maroc vous contacte sous 24h pour planifier votre démo." },
      { title: "Votre démo", text: "Nous vous présentons la plateforme, personnalisée pour votre activité." },
    ],
    email: CONTACT.email,
    phone: CONTACT.phone,
  },
} as const;

export type SectorKey =
  | "assurance" | "auto" | "ecoles" | "ecommerce" | "energie" | "immobilier" | "restauration" | "bienetre";

export const USE_CASES: {
  key: SectorKey;
  sector: string;
  tagline: string;
  cases: { title: string; text: string; tags: string[] }[];
}[] = [
  {
    key: "assurance",
    sector: "Assurance & Banque",
    tagline: "Des demandes de devis aux contrats signés.",
    cases: [
      { title: "Qualification des demandes de devis", text: "Un formulaire intelligent trie les demandes et un agent IA qualifie chaque prospect avant transmission au conseiller.", tags: ["Formulaires", "Agents IA", "CRM"] },
      { title: "Relances de renouvellement", text: "Rappels automatiques avant échéance par e-mail, SMS et WhatsApp, avec prise de rendez-vous intégrée.", tags: ["Workflows", "WhatsApp"] },
      { title: "Rendez-vous conseiller", text: "Agendas partagés par agence, rappels anti no-show et attribution automatique au bon conseiller.", tags: ["Agendas", "Rappels"] },
      { title: "Souscription & e-signature", text: "Devis, signature électronique et paiement de la première échéance dans un seul parcours.", tags: ["Devis", "E-signature", "Paiements"] },
    ],
  },
  {
    key: "auto",
    sector: "Automobile",
    tagline: "Plus d'essais, plus de ventes, plus d'entretiens.",
    cases: [
      { title: "Réservation d'essais", text: "Landing pages par modèle et prise de rendez-vous d'essai en un clic, synchronisées avec les vendeurs.", tags: ["Funnels", "Agendas"] },
      { title: "Pipeline multi-concessions", text: "Chaque lead suivi de la demande à la livraison, par site et par commercial.", tags: ["CRM", "Pipeline"] },
      { title: "Rappels d'entretien", text: "Relances automatiques selon la date ou le kilométrage, avec réservation d'atelier.", tags: ["Workflows", "SMS"] },
      { title: "Offres de financement", text: "Devis de financement envoyés et signés électroniquement, sans papier.", tags: ["Devis", "E-signature"] },
    ],
  },
  {
    key: "ecoles",
    sector: "Écoles & Formation",
    tagline: "Du premier clic à l'inscription.",
    cases: [
      { title: "Inscriptions en ligne", text: "Dossier de candidature, frais d'inscription et confirmation automatique en un seul tunnel.", tags: ["Funnels", "Paiements"] },
      { title: "Relance des candidats", text: "Séquences multicanales pour accompagner chaque candidat jusqu'à l'inscription.", tags: ["E-mail", "WhatsApp"] },
      { title: "Portes ouvertes en webinaire", text: "Inscription, rappels et replay automatique pour vos journées d'information.", tags: ["Webinaires", "Rappels"] },
      { title: "Espace e-learning", text: "Cours, quiz et suivi de progression pour vos étudiants et alumni.", tags: ["Formations"] },
    ],
  },
  {
    key: "ecommerce",
    sector: "E-commerce",
    tagline: "Récupérez chaque panier, fidélisez chaque client.",
    cases: [
      { title: "Paniers abandonnés", text: "Relances par e-mail, SMS et WhatsApp au bon moment pour récupérer les ventes perdues.", tags: ["Workflows", "WhatsApp"] },
      { title: "SAV par agent IA", text: "Un agent IA répond aux questions de suivi de commande 24h/24 et escalade si besoin.", tags: ["Agents IA", "Inbox"] },
      { title: "Campagnes de fidélité", text: "Segmentation par historique d'achat et offres personnalisées automatiques.", tags: ["CRM", "E-mail"] },
      { title: "Lancements produits", text: "Pages de vente, listes d'attente et paiements en ligne pour chaque nouveauté.", tags: ["Funnels", "Paiements"] },
    ],
  },
  {
    key: "energie",
    sector: "Énergies & Eau",
    tagline: "Des projets techniques suivis de bout en bout.",
    cases: [
      { title: "Simulateur & qualification", text: "Un formulaire-simulateur estime le projet et qualifie le prospect avant l'appel.", tags: ["Formulaires", "CRM"] },
      { title: "Visites techniques", text: "Planification des techniciens par zone avec rappels automatiques au client.", tags: ["Agendas", "Rappels"] },
      { title: "Devis & e-signature", text: "Devis détaillés envoyés, signés et suivis directement depuis le pipeline.", tags: ["Devis", "E-signature"] },
      { title: "Suivi d'installation", text: "Le client est informé à chaque étape du chantier, sans appel entrant.", tags: ["Workflows", "SMS"] },
    ],
  },
  {
    key: "immobilier",
    sector: "Immobilier",
    tagline: "Captez les acquéreurs, signez les mandats.",
    cases: [
      { title: "Capture de leads acquéreurs", text: "Pages programmes et formulaires qualifiants connectés directement au CRM.", tags: ["Funnels", "CRM"] },
      { title: "Planification des visites", text: "Réservation en ligne des créneaux de visite avec confirmation et rappels.", tags: ["Agendas", "Rappels"] },
      { title: "Relance des mandats", text: "Séquences automatiques pour les propriétaires vendeurs et les estimations.", tags: ["Workflows", "E-mail"] },
      { title: "Documents & signatures", text: "Offres et documents signés électroniquement depuis la fiche contact.", tags: ["E-signature"] },
    ],
  },
  {
    key: "restauration",
    sector: "Restauration",
    tagline: "Des tables pleines, des clients qui reviennent.",
    cases: [
      { title: "Réservations en ligne", text: "Réservation de table depuis votre site et vos réseaux, centralisée dans un agenda.", tags: ["Agendas", "Site web"] },
      { title: "Anti no-show", text: "Confirmations et rappels automatiques par SMS et WhatsApp.", tags: ["Rappels", "WhatsApp"] },
      { title: "Offres & événements", text: "Campagnes SMS ciblées pour vos soirées, menus et nouveautés.", tags: ["SMS", "Social"] },
      { title: "Avis clients", text: "Demande d'avis automatique après chaque visite pour booster votre réputation.", tags: ["Workflows"] },
    ],
  },
  {
    key: "bienetre",
    sector: "Fitness, Beauté & Bien-être",
    tagline: "Des agendas pleins et des membres fidèles.",
    cases: [
      { title: "Réservation de séances", text: "Cours, soins et coachings réservables en ligne, avec rappels automatiques.", tags: ["Agendas", "Rappels"] },
      { title: "Abonnements récurrents", text: "Paiements mensuels Stripe et gestion des membres dans le CRM.", tags: ["Paiements", "CRM"] },
      { title: "Réactivation des inactifs", text: "Un workflow détecte les membres absents et les relance avec une offre.", tags: ["Workflows", "WhatsApp"] },
      { title: "Programmes en ligne", text: "Vendez vos programmes et challenges dans un espace membres.", tags: ["Formations"] },
    ],
  },
];

/* ---------- Interface text used inside the components (kept here so the English version mirrors it). ---------- */

export const UI = {
  meta: {
    title: "ClientX AI — Réservez votre démo du CRM IA tout-en-un",
    description:
      "Sites, funnels, CRM, e-mails, SMS, WhatsApp, agendas, paiements, formations et agents IA dans une seule plateforme. Démo live + audit gratuit de vos outils.",
    ogTitle: "ClientX AI — Le CRM IA tout-en-un",
    ogDescription: "Remplacez +20 outils et économisez plus de 15 000 € par an. Réservez votre démo gratuite.",
    locale: "fr_FR",
  },
  home: "ClientX AI — accueil",
  langSwitch: "Langue",
  hero: {
    line1: "Réservez votre",
    highlight: "démo",
    accent: "gratuite",
    line3: "aujourd'hui.",
    sticker: "Audit offert",
    lead: "& recevez un audit offert de vos outils.",
    certified: "Certifié",
  },
  logos: "Ils nous font confiance",
  manifesto: {
    intro: "Qui sommes-nous :",
    a: "Nous réunissons",
    stickerTools: "+20 outils en 1",
    highlight: "vos outils",
    b: "dans une seule plateforme.",
    c: "De la",
    capture: "capture",
    stickerCosts: "0 € de coûts cachés",
    d: "à la",
    accent: "signature.",
    video: "La plateforme en action",
  },
  video: { play: "Lire la démo vidéo", watch: "Voir la démo" },
  modules: { eyebrow: "Capturer → Nourrir → Conclure", title: "Une plateforme,", accent: "six super-pouvoirs" },
  mocks: {
    capture: {
      window: "votre-entreprise.com/offre",
      steps: ["Page de capture", "Formulaire", "Merci"],
      step: "Étape",
      sent: "Formulaire envoyé",
      added: "Nouveau prospect ajouté au CRM",
    },
    nurture: {
      window: "Campagne — Nurturing nouveaux prospects",
      steps: [
        { ch: "E-mail", t: "Bienvenue chez nous", d: "Jour 0", rate: "Envoyé" },
        { ch: "SMS", t: "Votre guide est prêt", d: "Jour 1", rate: "Délivré" },
        { ch: "WhatsApp", t: "Une question ? Répondez ici", d: "Jour 3", rate: "Répondu" },
        { ch: "Réseaux sociaux", t: "Publication programmée", d: "Jour 5", rate: "Planifiée" },
      ],
      reply: "« Oui, je suis intéressée ! »",
    },
    booking: {
      window: "Agenda — Démos & rendez-vous",
      days: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
      byAi: "Réservé par IA",
      demo: "Démo",
      botA: "« Je vous propose ",
      botTime: "mardi à 13h",
      botB: " pour votre démo. Je vous envoie la confirmation ? »",
      reminder: "Rappel SMS envoyé — J-1",
      confirmed: "Présence confirmée",
    },
    courses: {
      window: "Espace membres — Académie",
      modules: ["Module 1 — Les fondamentaux", "Module 2 — Passer à l'action", "Module 3 — Stratégies avancées"],
      enrolled: "Nouvel apprenant inscrit",
    },
    close: {
      window: "Pipeline de ventes — T4",
      cols: ["Nouveau", "Démo", "Gagné"],
      signed: "Devis signé électroniquement",
      paid: "Paiement reçu · Stripe",
    },
    automate: {
      window: "Workflow — Qualification automatique",
      nodes: [
        { t: "Déclencheur", d: "Formulaire soumis" },
        { t: "Agent IA", d: "Qualifie le prospect" },
        { t: "WhatsApp", d: "Message personnalisé" },
        { t: "CRM", d: "Opportunité créée" },
      ],
      active: "Agent IA actif 24h/24",
    },
  },
  archive: {
    eyebrow: "Archives · Cas d'usage",
    title: "Ouvrez le dossier de",
    accent: "votre secteur",
    subtitle: "Des workflows concrets, déjà éprouvés. Cliquez sur un dossier pour l'ouvrir.",
    count: (sectors: number, cases: number) => `${sectors} secteurs · ${cases} cas d'usage`,
    open: (sector: string) => `Ouvrir le dossier ${sector}`,
    case: "Cas",
    cases: (n: number) => `${n} cas d'usage`,
    dialog: (sector: string) => `Cas d'usage — ${sector}`,
    folder: "Dossier",
    close: "Fermer",
    prev: "Dossier précédent",
    next: "Dossier suivant",
    cta: (primary: string) => `${primary} pour ce secteur`,
  },
  proof: {
    eyebrow: "Ils en parlent mieux que nous",
    prev: "Témoignage précédent",
    next: "Témoignage suivant",
    item: (k: number) => `Témoignage ${k}`,
    supportA: "Et vous n'êtes jamais seul : ",
    supportAccent: "mise en route guidée",
    supportB: " par e-mail et vidéos + 1 appel de 30 min, et migration simplifiée par nos eXperts.",
  },
  tools: {
    eyebrow: "+20 outils vs 1 plateforme",
    title: "Arrêtez de payer pour",
    accent: "20 outils",
    subtitle: "Chaque abonnement en moins, c'est une connexion, une facture et une source d'erreurs en moins.",
    today: "Aujourd'hui",
    subscriptions: "+20 abonnements",
    stack: "Votre stack actuelle",
    with: "Avec ClientX AI",
    platform: "Une seule plateforme, pilotée par l'IA.",
    points: ["1 abonnement, 1 connexion", "1 base de données client unifiée", "1 équipe support", "Données chiffrées, conformes RGPD"],
    savings: "Économies estimées",
    amount: "15 000 €",
    perYear: "/ an",
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Combien coûte",
    accent: "ClientX AI ?",
    subtitle: "Au mois sans engagement, ou à l'année avec 2 mois offerts.",
    billing: "Période de facturation",
    currency: "Devise",
    popular: "Le plus populaire",
    monthlyTerms: (setup: string) => `+ ${setup} de mise en place, une seule fois · Sans engagement`,
    yearlyTerms: (setup: string) => `2 mois offerts · + ${setup} de mise en place`,
    choose: (name: string) => `Choisir ${name}`,
    vat: "Prix HT, TVA 20 % en sus.",
  },
  faq: { eyebrow: "FAQ", title: "Vos questions,", accent: "nos réponses", other: "Une autre question ?" },
  footer: {
    eyebrow: "Démo live + audit gratuit",
    title: "Prêt à tout réunir dans",
    accent: "une seule plateforme ?",
    text: "Un eXpert vous montre ClientX AI sur votre propre activité, et identifie ce que vous pouvez économiser.",
    sticker: "Réponse sous 24h",
    small: "Démo gratuite · Sans engagement",
    tagline: "Le CRM IA tout-en-un qui remplace plus de 20 outils. Certifié ISO 9001.",
    nav: "Navigation",
    contact: "Contact",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
  },
  form: {
    step: (n: number) => `Étape ${n} sur 2`,
    contactTitle: "Vos coordonnées",
    companyTitle: "Votre entreprise",
    firstName: "Prénom",
    lastName: "Nom",
    workEmail: "E-mail professionnel",
    email: "E-mail",
    phone: "Téléphone",
    emailPlaceholder: "sarah@entreprise.com",
    next: "Continuer",
    company: "Entreprise",
    companyPlaceholder: "Nom de votre entreprise",
    sector: "Secteur d'activité",
    sectorPlaceholder: "Sélectionnez votre secteur",
    teamSize: "Taille de l'équipe",
    back: "Retour",
    sending: "Envoi…",
    redirecting: "Redirection…",
    error: "L'envoi a échoué. Réessayez, ou écrivez-nous à contact@clientx.ai.",
    privacy: "Vos données sont chiffrées et ne sont jamais revendues. En continuant, vous acceptez notre",
    privacyPartner: "Vos données sont chiffrées et ne sont jamais revendues. En envoyant ce formulaire, vous acceptez notre",
    privacyLink: "politique de confidentialité",
    phoneCountry: "Pays de l'indicatif",
    otherCountry: "Autre pays (indicatif complet)",
    phoneNumber: "Numéro de téléphone",
    phonePlaceholder: "Indicatif + numéro",
    phoneFull: "Numéro complet avec l'indicatif du pays",
    phoneDigits: (n: string, dial: string) => `${n} chiffres après +${dial}`,
    range: (min: number, max: number) => `${min} à ${max}`,
  },
  partnerForm: {
    plan: "Formule",
    emailPlaceholder: "sarah@agence.com",
    company: "Société (facultatif)",
    companyPlaceholder: "Votre agence ou activité",
    link: "Site ou réseau social (facultatif)",
    message: "Votre audience ou vos clients (facultatif)",
    messagePlaceholder: "Qui comptez-vous recommander ou équiper ?",
  },
  partnersPage: {
    title: "ClientX Partner Program — Recommandez ou revendez le CRM ClientX",
    description:
      "Apporteur d'affaires (20 %) ou partenaire agence (30 %) : des commissions chaque mois, tant que vos clients restent abonnés.",
    sticker: "Jusqu'à 30 % chaque mois",
    benefits: { eyebrow: "Avantages", title: "Pourquoi devenir", accent: "partenaire ?" },
    steps: { eyebrow: "Comment ça marche", title: "4 étapes pour", accent: "commencer" },
    apply: { eyebrow: "Candidature", title: "Devenez partenaire", accent: "ClientX" },
    applyText:
      "Choisissez votre formule et laissez-nous vos coordonnées : nous vous envoyons votre lien et votre kit marketing.",
  },
  thankYou: {
    title: "Merci — Votre demande de démo ClientX AI est envoyée",
    titleMA: "Merci — Votre demande de démo ClientX AI (Maroc) est envoyée",
    thanks: "Merci",
    received: " ! Votre demande est ",
    accent: "bien reçue",
    next: "Voici les prochaines étapes.",
    back: "Retour au site",
    question: "Une question ?",
  },
  legal: { title: "Mentions légales — ClientX AI", privacyTitle: "Politique de confidentialité — ClientX AI" },
};

/** Labels for values sent to the CRM as they are (French in both versions). Empty: the value is its own label. */
export const SECTOR_LABELS: Record<string, string> = {};
export const PARTNER_PLAN_LABELS: Record<string, string> = {};
/** Phone country names by ISO code. Empty: the French names from lib/phone.ts. */
export const PHONE_NAMES: Record<string, string> = {};
/** Form error messages (lib/schema.ts writes them in French). Empty: shown as they are. */
export const ERRORS: Record<string, string> = {};
