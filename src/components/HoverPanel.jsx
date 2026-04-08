import { motion, AnimatePresence } from 'framer-motion'
import '../styles/HoverPanel.css'
import { projectColorList, fm } from '../tokens/tokens.js'

const projects = [
  { title: "Sealer",             description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "Reccos",             description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "IQ Agency",          description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "Great Road Company", description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "Nursehub",           description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "Quantix",            description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
  { title: "John Taylor",        description: "LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum" },
]

function HoverPanel({ hoveredProject }) {
  const project = hoveredProject !== null ? projects[hoveredProject] : null
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
          {/* titre */}
          <h2 className="hover-panel-title" style={{ color }}>
            {project.title}
          </h2>

          {/* description longue */}
          <p className="hover-panel-desc">
            {project.description}
          </p>

          {/* halo coloré */}
          <div className="hover-panel-halo" style={{ background: color }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HoverPanel