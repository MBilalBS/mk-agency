import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import Card from './Card'

const projects = [
  { title: "Sealer",             description: "Plateforme de gestion de contrats intelligente. Signature électronique, suivi en temps réel et automatisation des workflows.",    tags: ["UX/UI", "Dev Web", "Branding"] },
  { title: "Reccos",             description: "Application de recommandations personnalisées basée sur l'intelligence artificielle et les préférences utilisateurs.",             tags: ["Design", "Dev Web", "IA"]     },
  { title: "IQ Agency",          description: "Refonte complète de l'identité visuelle et du site web d'une agence de communication parisienne.",                               tags: ["Branding", "Dev Web"]          },
  { title: "Great Road Company", description: "Identité de marque et stratégie digitale pour une société spécialisée dans la logistique internationale.",                       tags: ["Branding", "Stratégie"]        },
  { title: "Nursehub",           description: "Plateforme de mise en relation entre infirmiers indépendants et établissements de santé.",                                       tags: ["UX/UI", "Dev Web"]             },
  { title: "Quantix",            description: "Dashboard analytique pour fonds d'investissement. Visualisation de données complexes en temps réel.",                            tags: ["UX/UI", "Dev Web", "Data"]     },
  { title: "John Taylor",        description: "Site vitrine et stratégie de contenu pour un cabinet d'avocats d'affaires international.",                                       tags: ["Branding", "Dev Web"]          },
]

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
  const container = useRef(null)
  const [modalProject, setModalProject] = useState(null)

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