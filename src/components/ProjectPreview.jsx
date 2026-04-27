import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectPreview.css'
import { projectColorList, fm, projectsData } from '../tokens/tokens.js'

function ProjectPreview({ activeProject }) {
  const project = activeProject !== null ? projectsData[activeProject] : null
  const color   = activeProject !== null ? projectColorList[activeProject] : null
  const total   = projectsData.length

  return (
    <AnimatePresence mode="wait">
      {project && (
        <>
          {/* compteur — inchangé */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={fm.transition.fast}
>
  <motion.div
    className="project-counter"
    animate={{
      top: `${(activeProject / (total - 1)) * 70 + 10}dvh`,
    }}
    transition={fm.transition.fast}
  >
    <span className="project-counter-current">{activeProject + 1}</span>
    <span className="project-counter-separator">/</span>
    <span className="project-counter-total">{total}</span>
  </motion.div>
</motion.div>
     
     {/* ghost text — titre en très grand en arrière plan */}
<motion.div
  key={`ghost-${activeProject}`}
  className="project-ghost-text"
  {...fm.fadeOnly}
  transition={fm.transition.slow}
>
  {project.title}
</motion.div>

          {/* liste verticale à droite */}
          <motion.div
            key="project-list"
            className="project-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fm.transition.fast}
          >
            {projectsData.map((p, index) => (
              <motion.div
                key={index}
                className={`project-list-item ${activeProject === index ? 'active' : ''}`}
                animate={{
                  color: activeProject === index
                    ? projectColorList[index]
                    : 'rgba(255,255,255,0.2)',
                  fontSize: activeProject === index ? '16px' : '14px',
                }}
                transition={fm.transition.normal}
              >
                {p.title}
                   {/* catégorie — seulement sous le titre actif */}
              <motion.div
            className="project-list-category"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeProject === index ? 1 : 0 }}
          >
            {p.category}
          </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* halo — inchangé */}
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