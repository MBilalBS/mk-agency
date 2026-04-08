import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/BottomSheet.css'
import { projectColorList, fm } from '../tokens/tokens.js'

const projects = [
  { title: "Sealer",             description: "Sealer s’impose comme la nouvelle norme technologique en matière de protection et de certification de produits. Née de la nécessité de protéger le savoir-faire et l'exclusivité, notre solution fusionne la puissance de la blockchain avec un système de QR codes sécurisés et inaltérables. Contrairement aux méthodes traditionnelles, Sealer attribue une identité numérique unique à chaque pièce, créant un lien physique-numérique impossible à briser ou à dupliquer. Si notre expertise prend racine dans les exigences du secteur du luxe et de la mode, notre technologie est conçue pour être universelle et s'adapte à toute industrie où l'authenticité est capitale. Plus qu'un simple outil de contrôle, Sealer offre aux marques une transparence totale sur leur chaîne de distribution et redonne au consommateur final la certitude absolue de détenir un produit original. Nous transformons la confiance en une donnée technologique infalsifiable.", logo: "./public/badgestyle/2.png" },
  { title: "Reccos",             description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
  { title: "IQ Agency",          description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
  { title: "Great Road Company", description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
  { title: "Nursehub",           description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
  { title: "Quantix",            description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
  { title: "John Taylor",        description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
]

function BottomSheet({ activeProject }) {
  const [sheetState, setSheetState] = useState('hidden')
  const touchStartY = useRef(null)
  const sheetRef    = useRef(null)

  // bloque le scroll de la page quand ouvert
  useEffect(() => {
    if (sheetState === 'open') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sheetState])

  // bloque le scroll natif pendant le swipe sur peek et open
  useEffect(() => {
    const el = sheetRef.current
    if (!el) return

    const handleTouchMoveNative = (e) => {
      if (sheetState === 'open' || sheetState === 'peek') {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('touchmove', handleTouchMoveNative, { passive: false })
    return () => el.removeEventListener('touchmove', handleTouchMoveNative)
  }, [sheetState])

  // réagit au changement de activeProject
  const prevActive = useRef(null)
  if (activeProject !== prevActive.current) {
    prevActive.current = activeProject
    if (activeProject !== null && sheetState === 'hidden') {
      setSheetState('peek')
    } else if (activeProject === null) {
      setSheetState('hidden')
    }
  }

  const project = activeProject !== null ? projects[activeProject] : null
  const color   = activeProject !== null ? projectColorList[activeProject] : null

  const yValues = {
    hidden: '100%',
    peek:   'calc(100% - 80px)',
    open:   '15%',
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
    if (sheetState === 'open') e.stopPropagation()
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const delta = touchStartY.current - e.changedTouches[0].clientY

    if (sheetState === 'open') e.stopPropagation()

    if (delta > 50 && sheetState === 'peek') setSheetState('open')
    if (delta < -50) {
      if (sheetState === 'open')      setSheetState('peek')
      else if (sheetState === 'peek') setSheetState('hidden')
    }

    touchStartY.current = null
  }

  return (
    <motion.div
      ref={sheetRef}
      className="bottom-sheet"
      animate={{ y: yValues[sheetState] }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ borderTop: color ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.15)' }}
    >
      <div className="sheet-handle" />

      {/* PEEK — logo + indication swipe */}
      <div
        className={`sheet-peek ${sheetState === 'open' ? 'hidden' : ''}`}
        onClick={() => sheetState === 'peek' && setSheetState('open')}
      >
        {project && (
          <>
            <div className="sheet-peek-left">
              <img src={project.logo} alt={project.title} className="sheet-logo" />
            </div>
            <span className="sheet-see-more">↑ voir plus</span>
          </>
        )}
      </div>

      {/* OPEN — titre + description */}
      <AnimatePresence>
        {sheetState === 'open' && project && (
          <motion.div
            className="sheet-content"
            {...fm.fadeSlideUp}
            transition={fm.transition.normal}
          >
            <h2 className="sheet-title" style={{ color }}>
              {project.title}
            </h2>
            <p className="sheet-description">{project.description}</p>

            <div className="sheet-halo" style={{ background: color }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BottomSheet