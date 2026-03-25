import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectPreview.css'

const projects = [
  { title: "Sealer", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#8aff47" },
  { title: "Reccos", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#ff6b6b" },
  { title: "IQ Agency", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#4facfe" },
  { title: "Great Road Company", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#f7971e" },
  { title: "Nursehub", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#a18cd1" },
  { title: "Quantix", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum", color: "#f953c6" },
  { title: "John Taylor", description:"LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum LOREM ipsum ", color: "#43e97b" },
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