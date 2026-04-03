import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/BottomSheet.css'
import { projectColorList, fm } from '../tokens/tokens.js'

const projects = [
  { title: "Sealer",             description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", logo: "./public/badgestyle/2.png" },
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

  // bloque le scroll de la page quand le sheet est ouvert
  useEffect(() => {
    if (sheetState === 'open') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
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
    open:   '0%',
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
    if (sheetState === 'open') e.stopPropagation()
  }

  const handleTouchMove = (e) => {
    if (sheetState === 'open') e.stopPropagation()
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const delta = touchStartY.current - e.changedTouches[0].clientY

    if (sheetState === 'open') e.stopPropagation()

    if (delta > 50 && sheetState === 'peek') setSheetState('open')
    if (delta < -50) {
      if (sheetState === 'open')       setSheetState('peek')
      else if (sheetState === 'peek')  setSheetState('hidden')
    }

    touchStartY.current = null
  }

  return (
    <motion.div
      className="bottom-sheet"
      animate={{ y: yValues[sheetState] }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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