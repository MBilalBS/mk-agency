import { useEffect, useMemo, useState, memo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import '../styles/Particles.css'

function ParticlesBackground() {
  // tsParticles doit être initialisé une fois avant d'être utilisé
  // on stocke si l'init est faite dans un state
  const [init, setInit] = useState(false)

  useEffect(() => {
    // loadSlim → charge uniquement les fonctionnalités de base
    // plus léger que loadFull qui charge tout même ce qu'on n'utilise pas
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, []) // [] → ne tourne qu'une seule fois au montage

  // useMemo → l'objet de config ne sera pas recréé à chaque render
  // c'est important car tsParticles re-render tout si la config change
  const options = useMemo(() => ({

    // le fond est transparent — on ne veut pas cacher le reste du site
    background: {
      color: { value: 'transparent' }
    },

    // fpsLimit → limite le rendu à 60fps max
    // sans ça tsParticles essaie de tourner aussi vite que possible
    fpsLimit: 40,

    // interactivity → ce qui se passe quand la souris interagit
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse', // repulse → les points fuient légèrement la souris
        },
      },
      modes: {
        repulse: {
          distance: 200,   // distance en px à partir de laquelle les points réagissent
          duration: 0.1,  // durée de la répulsion en secondes
          speed: 0.3,     // vitesse de la répulsion — 0.5 = très léger
        },
      },
    },

    // particles → la description de chaque point
    particles: {
      color: {
        value: '#ffffff', // blanc
      },

      // move → le mouvement des particules
      move: {
        enable: true,
        speed: 0.3,       // très lent — juste un léger mouvement de fond
        direction: 'none', // direction aléatoire
        random: true,      // vitesse légèrement aléatoire entre chaque particule
        straight: false,   // pas en ligne droite, mouvement organique
        outModes: {
          default: 'bounce', // rebondit sur les bords au lieu de disparaître
        },
      },

      // number → combien de particules
      number: {
        value: 200,         // 80 points — assez pour être visible, pas trop pour les perfs
        density: {
        },
      },

      // opacity → légèrement transparent pour être subtil
      opacity: {
        value: { min: 0.1, max: 0.4 }, // varie entre 0.1 et 0.4 aléatoirement
        animation: {
          enable: true,    // les points clignotent légèrement
          speed: 0.5,      // très lentement
          sync: false,     // pas tous en même temps
        },
      },

      // shape → forme des particules
      shape: {
        type: 'circle',   // points ronds
      },

      // size → taille des points
      size: {
        value: { min: 1, max: 3 }, // entre 1 et 2px — très petits
      },
    },

    // detectRetina → adapte la résolution aux écrans Retina
    detectRetina: true,

  }), []) // [] → recalculé seulement si les dépendances changent, ici jamais

  // si l'init n'est pas faite, on ne rend rien
  if (!init) return null

  return (
    <Particles
      id="particles-background"
      options={options}
      className="particles-background"
    />
  )
}

export default memo(ParticlesBackground)
