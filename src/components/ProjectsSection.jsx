import { useRef, useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import { projectsData } from '../tokens/tokens.js'

const projects = projectsData.map(p => ({
  title:       p.title,
  description: p.longDesc,
  shortDesc:   p.shortDesc,
  category:    p.category,
  tags:        [p.category],
}))

function Modal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="modal-close" onClick={onClose}>✕</button>
            <span className="modal-label">// Projet</span>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-shortdesc">{project.shortDesc}</p>
            <div className="modal-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="modal-tag">{tag}</span>
              ))}
            </div>
            <p className="modal-description">{project.description}</p>
            <a href="#" className="modal-cta">
              Voir le projet
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ProjectsSection({ setActiveProject, activeProject }) {
  const container    = useRef(null)
  const [modalProject, setModalProject] = useState(null)

  // bloque le scroll quand la modal est ouverte
  useEffect(() => {
    if (modalProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalProject])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 0 || latest === 1) setActiveProject(null)
  })

  return (
    <>
      <div ref={container} className='projects-container' style={{ paddingBottom: '80vh' }}>
        {projects.map((project, i) => {
          const targetScale = Math.max(0.1, 1 - (projects.length - i - 1) * 0.03)
          const cardScale   = 1 - (projects.length - i - 1) * 0.05
          return (
            <Card
              key={i}
              i={i}
              title={project.title}
              progress={scrollYProgress}
              range={[i / projects.length, (i + 1) / projects.length]}
              targetScale={targetScale}
              setActiveProject={setActiveProject}
              activeProject={activeProject}
              cardScale={cardScale}
              onClick={() => setModalProject(projects[i])}
            />
          )
        })}
      </div>

      <Modal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  )
}

export default ProjectsSection