import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectPreview.css'

const projects = [
  { title: "Sealer", description:"AN icon of liberty", color: "#8aff47" },
  { title: "Reccos", description:"reconnu mondialement", color: "#ff6b6b" },
  { title: "IQ Agency", description:"l'inteligence haut de gamme", color: "#4facfe" },
  { title: "Great Road Company", description:"la route et les moto", color: "#f7971e" },
  { title: "Nursehub", description:"le medical a porte de main", color: "#a18cd1" },
  { title: "Quantix", description:"la quantification de des tarif", color: "#f953c6" },
  { title: "John Taylor", description:"Lorem Lorem Lorem lorem", color: "#43e97b" },
]

function ProjectPreview({activeProject}) {
    const project = activeProject !== null ? projects[activeProject] : null

    return (
        <AnimatePresence mode="wait">
            {project && (
                <>
                    <motion.div
                        key={`title-${activeProject}`}
                        className="project-preview-title"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1>{project.title}</h1>
                    </motion.div>

                    <motion.div
                        key={`desc-${activeProject}`}
                        className="project-preview-desc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p>{project.description}</p>
                    </motion.div>

                    <motion.div
                        key={`halo-${activeProject}`}
                        className="project-halo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ background: project.color }}
                    />
                </>
            )}
        </AnimatePresence>
    )
}

export default ProjectPreview