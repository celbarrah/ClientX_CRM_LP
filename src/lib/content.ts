// All landing page copy lives here so it can be edited without touching components.
// Items marked PLACEHOLDER must be replaced with real client data before going live.

export const DEMO_VIDEO =
  "https://assets.cdn.filesafe.space/zoW9RVMsMP37fO8WXMgD/media/7a3c0f19-4e92-49b4-a9b2-2a7f4f0e5181.mp4#t=0.5";

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
    "Onboarding technique 1:1 inclus",
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
    { title: "Migration simplifiée", text: "Onboarding technique 1:1 : domaines, DNS, e-mails et premiers workflows configurés avec vous." },
    { title: "Support dédié", text: "Une équipe qui connaît votre compte et vos objectifs, joignable sur plusieurs canaux." },
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
  { value: "50+", label: "Grandes marques & institutions" },
  { value: "99,9%", label: "Disponibilité de la plateforme" },
  { value: "RGPD", label: "Données chiffrées, et qui restent les vôtres" },
];

export const PRICING = {
  included: [
    "Sites web & funnels illimités",
    "CRM & pipelines de ventes",
    "Automatisations & workflows",
  ],
  plans: [
    {
      name: "Starter",
      price: "990",
      tagline: "Pour lancer votre croissance.",
      features: ["3 utilisateurs", "5 000 contacts CRM"],
      popular: false,
    },
    {
      name: "Pro",
      price: "2 490",
      tagline: "Pour les équipes qui accélèrent.",
      features: ["10 utilisateurs", "15 000 contacts CRM"],
      popular: true,
    },
    {
      name: "Scale",
      price: "4 990",
      tagline: "Pour les organisations sans limites.",
      features: ["Utilisateurs illimités", "Contacts illimités"],
      popular: false,
    },
  ],
  aiNote: "Usage des agents IA facturé en supplément, via un solde prépayé.",
};

export const FAQ = [
  {
    q: "ClientX AI peut-il remplacer tous mes abonnements actuels ?",
    a: "Oui. ClientX AI remplace votre outil de funnels, votre CRM, votre solution d'e-mailing, vos agendas, vos automatisations, votre hébergement de formations et votre planificateur social, pour plus de 15 000 € d'économies par an.",
  },
  {
    q: "Comment se passent l'onboarding et le support ?",
    a: "Chaque nouveau membre bénéficie d'une session d'onboarding technique 1:1 avec un eXpert ClientX AI pour configurer ses domaines, DNS, e-mails et ses premiers workflows sur mesure.",
  },
  {
    q: "Mes données sont-elles sécurisées et conformes au RGPD ?",
    a: "Oui. Vos données sont chiffrées, notre management de la qualité est certifié ISO 9001, et vos données restent les vôtres.",
  },
  {
    q: "Puis-je essayer avant de m'engager ?",
    a: "Oui. Réservez une démo gratuite sur votre propre activité, puis démarrez un essai accompagné d'un support technique 1:1.",
  },
];

export const THANK_YOU_STEPS = [
  { title: "Confirmation", text: "Vous recevez la confirmation de votre demande par e-mail et SMS." },
  { title: "Prise de contact", text: "Un eXpert ClientX AI vous contacte sous 24h pour planifier votre démo." },
  { title: "Votre démo", text: "Nous vous présentons la plateforme, personnalisée pour votre activité." },
];

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
