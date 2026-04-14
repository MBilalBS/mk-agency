import { motion, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef } from "react"
import '../styles/Card.css'
import { isMobile, projectColorList, layout, fm } from '../tokens/tokens.js'

function Card({ i, title, description, progress, range, targetScale, setActiveProject, activeProject, cardScale }) {

  const scale   = useTransform(progress, range, [1, targetScale])
  const color   = projectColorList[i]
  const cardTop = isMobile ? layout.card.topMobile(i) : layout.card.topDesktop(i)

  const hoverTimer = useRef(null)

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= range[0] && latest <= range[1]) {
      setActiveProject(i)
    } else if (latest <= range[0] && i === 0) {
      setActiveProject(null)
    }
  })

  return (
    <div className="card-container">
      <motion.div
        className="card"
        style={{
          scale,
          top: cardTop,
          boxShadow: activeProject === i ? `inset 0 0 40px 2px ${color}20` : 'none',
          border:    activeProject === i ? `0.1px solid ${color}` : '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="card-dot" />
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>
    </div>
  )
}

export default Card