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
    yStart: { mobile: '30dvh',  desktop: '0dvh'   },
    yEnd:   { mobile: '-40dvh', desktop: '-40dvh' },
  },
  // badge scroll out sur mobile
  badge: {
    yStart: '0dvh',
    yEnd:   '-130dvh',
  },
   // cards
  card: {
    topMobile:  (i) => `calc(55dvh + ${i * 18}px)`,
    topDesktop: (i) => `calc(-4vh + ${i * 30 + 320}px)`,
  },
}