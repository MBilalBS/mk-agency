import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectPreview.css'
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

function ProjectPreview({ activeProject }) {
  const project = activeProject !== null ? projects[activeProject] : null
  const color = activeProject !== null ? projectColorList[activeProject] : null

  return (
    <AnimatePresence mode="wait">
      {project && (
        <>
          <motion.div
            key={`title-${activeProject}`}
            className="project-preview-title"
            {...fm.fadeSlideUp}
            transition={fm.transition.slow}
          >
            <h1>{project.title}</h1>
          </motion.div>

          <motion.div
            key={`desc-${activeProject}`}
            className="project-preview-desc"
            {...fm.fadeSlideUp}
            transition={fm.transition.slow}
          >
            <p>{project.description}</p>
          </motion.div>

          <motion.div
            key={`halo-${activeProject}`}
            className="project-halo"
            {...fm.fadeOnly}
            transition={fm.transition.slow}
            style={{ background: color }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectPreview