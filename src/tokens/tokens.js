// tokens.js
// Pont JS ↔ CSS — toutes les valeurs utilisées dans les fichiers JSX
// Si tu changes une valeur ici, pense à la mettre à jour dans variables.css aussi

// =========================
// BREAKPOINTS
// =========================
export const breakpoints = {
  md: 768,
}

// Helper réutilisable — remplace les 3 const isMobile dispersés
export const isMobile = window.innerWidth < breakpoints.md


// =========================
// PROJECT COLORS
// =========================
export const projectColors = {
  sealer:       "#8aff47",
  reccos:       "#ff6b6b",
  iqAgency:     "#4facfe",
  greatRoad:    "#f7971e",
  nursehub:     "#a18cd1",
  quantix:      "#f953c6",
  johnTaylor:   "#43e97b",
}

// =========================
// SERVICES DATA
// =========================
export const servicesData = {
  main: [
    {
      number: '01',
      title: 'Web & Digital',
      description: "Design d'interfaces sur-mesure et développement de produits digitaux haute performance.",
      skills: [
        "Design d'interfaces sur-mesure",
        'Développement React',
        'Expériences interactives',
        'Animations 3D',
        'Optimisation performance',
        'Responsive mobile',
      ],
    },
    {
      number: '02',
      title: 'Branding & Identité',
      description: "Création d'identités visuelles fortes qui reflètent l'essence de votre marque.",
      skills: [
        'Direction artistique',
        'Création de logo',
        'Charte graphique',
        'Typographie',
        'Couleurs',
        'Guidelines de marque',
      ],
    },
    {
      number: '03',
      title: 'Intelligence Artificielle',
      description: "Intégration IA haut de gamme pour automatiser, créer et innover à grande échelle.",
      skills: [
        'Intégration IA sur-mesure',
        'Automatisation de workflows',
        'Agents IA',
        'Fine-tuning de modèles',
        'Pipelines créatifs IA',
        'Conseil stratégique IA',
      ],
    },
  ],
  secondary: [
    {
      number: '04',
      title: 'Stratégie & Conseil',
      skills: ['Audit digital', 'Positionnement', 'Roadmap digitale'],
    },
    {
      number: '05',
      title: 'Contenu & Storytelling',
      skills: ['Copywriting', 'Tone of voice', 'Narration de marque'],
    },
    {
      number: '06',
      title: 'Expériences Immersives',
      skills: ['WebGL', 'Three.js', 'Motion design'],
    },
  ],
}

// =========================
// PROJECTS DATA
// =========================
export const projectsData = [
  { title: "Sealer",             category: "Security", shortDesc: "Le rempart absolu contre la contrefaçon.",  longDesc: "Sealer s’impose comme la nouvelle norme technologique en matière de protection et de certification de produits en fusionnant la puissance de la blockchain avec un système de QR codes sécurisés et totalement inaltérables. Contrairement aux méthodes traditionnelles, notre solution attribue une identité numérique unique à chaque pièce, créant un lien physique-numérique impossible à briser ou à dupliquer pour garantir une traçabilité totale depuis l'atelier jusqu'au client final. Si notre expertise prend racine dans les exigences extrêmes du secteur du luxe et de la mode, notre technologie est conçue pour être universelle et s'adapte à toute industrie où l'authenticité est capitale pour la survie d'une marque. Plus qu'un simple outil de contrôle, Sealer offre aux entreprises une transparence totale sur leur chaîne de distribution et redonne au consommateur la certitude absolue de détenir un produit original en transformant la confiance en une donnée technologique infalsifiable et pérenne." },
  { title: "Reccos",             category: "Management", shortDesc: "reconnu mondialement",                       longDesc: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "IQ Agency",          category: "Tech", shortDesc: "L'architecte de votre transformation digitale.",                longDesc: "IQ Agency se positionne comme un partenaire stratégique de premier plan pour les entreprises souhaitant naviguer avec succès dans l'économie numérique. Alliant créativité, analyse de données et expertise technologique, l'agence déploie des solutions sur mesure allant du développement web haute performance au marketing digital ciblé. Son approche repose sur une compréhension profonde des enjeux de croissance de ses clients, permettant de concevoir des écosystèmes digitaux qui non seulement renforcent la visibilité des marques, mais optimisent également leurs performances opérationnelles. Qu'il s'agisse de stratégies SEO avancées, de gestion de campagnes publicitaires complexes ou de solutions de design innovantes, IQ Agency transforme les défis technologiques en leviers de réussite concrets pour assurer aux marques une présence pérenne et un avantage concurrentiel majeur sur le marché international." },
  { title: "Great Road Company", category: "Automotive", shortDesc: "L'aventure moto premium au Moyen-Orient.",                       longDesc: "GreatRoad s'impose comme le spécialiste des roadtrips moto d'exception, offrant des expériences d'aventure haut de gamme à travers les paysages spectaculaires du Moyen-Orient. La société propose une approche 'clé en main' où chaque détail est rigoureusement orchestré, des itinéraires de plusieurs milliers de kilomètres entre déserts et montagnes jusqu'à la mise à disposition d'une flotte de motos de prestige parmi les plus grandes marques comme BMW Motorrad, Harley-Davidson ou KTM. Alliant la liberté de l'exploration à un niveau de service premium, GreatRoad permet à une communauté de passionnés et d'aventuriers de découvrir Dubaï et ses environs sous un angle inédit, tout en bénéficiant d'un encadrement professionnel et d'une logistique sans faille. En transformant chaque voyage en une immersion sensorielle entre le silence des dunes et l'adrénaline de la route, l'enseigne redéfinit les standards du voyage d'aventure motorisé pour une clientèle internationale en quête d'évasion et de dépassement." },
  { title: "Nursehub",           category: "Medical", shortDesc: "le medical a porte de main",                 longDesc: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "Quantix",            category: "Finance", shortDesc: "la quantification de des tarif",             longDesc: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "John Taylor",        category: "Real Estate", shortDesc: "L'excellence de l'immobilier d'exception.",                    longDesc: "Fondée en 1864, John Taylor s'est imposée comme la référence mondiale du marché immobilier de prestige, accompagnant une clientèle internationale exigeante dans l'acquisition, la vente et la gestion de propriétés d'exception. Présente dans les destinations les plus prisées au monde, de la Côte d'Azur aux capitales économiques mondiales, la maison se distingue par une expertise inégalée et une discrétion absolue. Au-delà de la simple transaction, John Taylor offre une gamme de services sur mesure incluant la location saisonnière de luxe et la gestion de domaines, s'appuyant sur un héritage historique riche pour anticiper les tendances du marché haut de gamme. En alliant tradition, élégance et une connaissance pointue des enjeux financiers locaux et internationaux, l'enseigne demeure le partenaire privilégié de ceux qui considèrent l'immobilier comme un art de vivre et un investissement stratégique majeur." },
]

// Tableau ordonné — pour accéder par index (projects[i].color)
export const projectColorList = [
  projectColors.sealer,
  projectColors.reccos,
  projectColors.iqAgency,
  projectColors.greatRoad,
  projectColors.nursehub,
  projectColors.quantix,
  projectColors.johnTaylor,
]


// =========================
// FRAMER MOTION
// =========================
export const fm = {
  // durées
  duration: {
    fast:   0.2,
    normal: 0.3,
    slow:   0.4,
  },

  // transitions prêtes à l'emploi
  transition: {
    fast:   { duration: 0.2 },
    normal: { duration: 0.3 },
    slow:   { duration: 0.4 },
  },

  // variants d'entrée/sortie réutilisables
  fadeSlideUp: {
    initial: { opacity: 0, y: 10  },
    animate: { opacity: 1, y: 0   },
    exit:    { opacity: 0, y: -10 },
  },

  fadeOnly: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
}


// =========================
// LAYOUT
// =========================

export const layout = {
    // positions du logo selon device
  logo: {
    yStart: { mobile: '30svh',  desktop: '0svh'   },
    yEnd:   { mobile: '-45svh', desktop: '-45svh' },
  },
  // badge scroll out sur mobile
  badge: {
    yStart: '0svh',
    yEnd:   '-130svh',
  },
   // cards
  card: {
    topMobile:  (i) => `calc(55svh + ${i * 18}px)`,
    topDesktop: (i) => `calc(-4vh + ${i * 30 + 320}px)`,
  },
}