import { motion, AnimatePresence } from 'framer-motion'
import '../styles/HoverPanel.css'
import { projectColorList, fm, projectsData } from '../tokens/tokens.js'

function HoverPanel({ hoveredProject }) {
  const project = hoveredProject !== null ? projectsData[hoveredProject] : null
  const color   = hoveredProject !== null ? projectColorList[hoveredProject] : null

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={hoveredProject}
          className="hover-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0  }}
          exit={{    opacity: 0, x: 20 }}
          transition={fm.transition.fast}
        >
          <h2 className="hover-panel-title" style={{ color }}>
            {project.title}
          </h2>

          <p className="hover-panel-desc">
            {project.longDesc}
          </p>

          <div className="hover-panel-halo" style={{ background: color }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HoverPanel