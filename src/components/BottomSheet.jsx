import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/BottomSheet.css'
import { projectColorList, fm, projectsData } from '../tokens/tokens.js'

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

  // données du projet actif depuis le SSOT
  const project = activeProject !== null ? projectsData[activeProject] : null
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

      {/* OPEN — titre + description longue depuis le SSOT */}
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
            <p className="sheet-description">{project.longDesc}</p>

            <div className="sheet-halo" style={{ background: color }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BottomSheet