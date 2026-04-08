import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectPreview.css'
import { projectColorList, fm, projectsData } from '../tokens/tokens.js'

function ProjectPreview({ activeProject }) {
  const project = activeProject !== null ? projectsData[activeProject] : null
  const color   = activeProject !== null ? projectColorList[activeProject] : null

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
            <p>{project.shortDesc}</p>
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