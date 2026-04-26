import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import '../styles/Stats.css'

const stats = [
  { value: 20,  suffix: '+', label: 'Projets Livrés'        },
  { value: 6,   suffix: '',  label: "Domaines d'expertise"   },
  { value: 360, suffix: '°', label: 'Approche Complète'      },
  { value: 2,   suffix: '',  label: 'Fondateurs Passionnés'  },
]

// couleurs pour les particules d'explosion — majorité blanche, accent orange
const colors = ['#ffffff', '#ffffff', '#C4622D', '#E07340']

// ─────────────────────────────────────────────
// Anime un chiffre de 0 → value avec ease-out
// Se déclenche une seule fois quand visible
// ─────────────────────────────────────────────
function Counter({ value, isInView }) {
  const numRef  = useRef(null)
  const started = useRef(false) // verrou pour éviter un double déclenchement

  useEffect(() => {
    if (!isInView || started.current || !numRef.current) return
    started.current = true

    let startTime = null
    const duration = 1500

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // courbe ease-out cubique
      const eased = 1 - Math.pow(1 - progress, 3)
      // on écrit directement dans le DOM, pas de re-render React
      if (numRef.current) numRef.current.textContent = Math.round(eased * value)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, value])

  return <span ref={numRef}>0</span>
}

// ─────────────────────────────────────────────
// Canvas de fond — pixels qui dérivent + explosion au clic
// Désactivé sur mobile pour les perfs
// ─────────────────────────────────────────────
function usePixelCanvas(sectionRef) {
  const canvasRef = useRef(null)

  useEffect(() => {
    // pas de canvas sur mobile, trop lourd avec le badge en parallèle
    if (window.innerWidth <= 768) return

    const canvas  = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')

    const PIXEL   = 5     // taille d'un point
    const DENSITY = 0.012 // ~1.5% des cellules ont un point

    let dots = [], particles = [], rafId, dpr = 1

    // recalcule le canvas et régénère les points
    // appelé au montage + resize fenêtre
    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const w = section.offsetWidth
      const h = section.offsetHeight

      // dimensions internes × dpr pour les écrans retina
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const cols = Math.ceil(w / PIXEL)
      const rows = Math.ceil(h / PIXEL)

      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > DENSITY) continue

          dots.push({
            ox: c * PIXEL, // position d'origine — ne change jamais
            oy: r * PIXEL,
            x:  c * PIXEL, // position courante — bouge autour de l'origine
            y:  r * PIXEL,

            // alpha fixe — 50% visible, 50% discret, ne change pas
            alpha: Math.random() > 0.7 ? 0.7 : 0.15,

            // paramètres du mouvement orbital
            angle:      Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.015, // lent et organique
            radius:     Math.random() * 2.5 + 0.5,

            // 50% orange, 50% blanc
            color: '#C4622D',
          })
        }
      }
    }

    // crée un burst de particules au point de clic
    const spawnExplosion = (mx, my) => {
      const count = 10 + Math.floor(Math.random() * 8)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.8 + Math.random() * 2.5
        particles.push({
          x:     mx,
          y:     my,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed,
          size:  PIXEL * (0.8 + Math.random() * 0.8),
          alpha: 0.8 + Math.random() * 0.2,
          decay: 0.025 + Math.random() * 0.025,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    // coordonnées du clic relatives à la section, pas à la fenêtre
    const handleClick = (e) => {
      const r = section.getBoundingClientRect()
      spawnExplosion(e.clientX - r.left, e.clientY - r.top)
    }

    const draw = () => {
      const w = canvas.width  / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      // points de fond — orbite autour de leur position d'origine
      for (const d of dots) {
        d.angle += d.angleSpeed
        d.x = d.ox + Math.cos(d.angle) * d.radius
        d.y = d.oy + Math.sin(d.angle) * d.radius

        // alpha fixe, pas d'interpolation
        ctx.fillStyle = `rgba(196,98,45,${d.alpha})`

        ctx.beginPath()
        ctx.arc(d.x + PIXEL / 2, d.y + PIXEL / 2, (PIXEL - 1) / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // particules d'explosion — tombent avec gravité et disparaissent
      particles = particles.filter(p => p.alpha > 0.01)
      for (const p of particles) {
        p.x     += p.vx
        p.y     += p.vy
        p.vy    += 0.05 // gravité
        p.alpha -= p.decay
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    // le clic est sur la section car le canvas a pointer-events: none
    section.addEventListener('click', handleClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      section.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return canvasRef
}

// ─────────────────────────────────────────────
// Une stat avec parallaxe au scroll
// Pair → droite vers gauche / impair → gauche vers droite
// Amplitude réduite sur mobile pour éviter l'overflow
// ─────────────────────────────────────────────
function StatItem({ stat, index }) {
  const itemRef  = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: '-10% 0px' })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? index % 2 === 0 ? ['3%', '-3%'] : ['-3%', '3%']
      : index % 2 === 0 ? ['7%', '-7%'] : ['-7%', '7%']
  )

  return (
    <motion.div ref={sectionRef} className="stat-item" style={{ x }}>
      <div ref={itemRef} className="stat-inner">
        <div className="stat-number">
          <Counter value={stat.value} isInView={isInView} />
          <span className="stat-suffix">{stat.suffix}</span>
        </div>
        <p className="stat-label">{stat.label}</p>
      </div>
    </motion.div>
  )
}

function Stats() {
  const sectionRef = useRef(null)
  const canvasRef  = usePixelCanvas(sectionRef)

  return (
    <section ref={sectionRef} className="stats-section">
      {/* canvas en arrière-plan, pointer-events: none en CSS */}
      <canvas ref={canvasRef} className="stats-pixel-bg" />
      {stats.map((stat, index) => (
        <StatItem key={index} stat={stat} index={index} />
      ))}
    </section>
  )
}

export default Stats