import { useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Card from './Card'

const projects = [
  { title: "Sealer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " },
  { title: "Reccos", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" },
  { title: "IQ Agency", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" },
  { title: "Great Road Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" },
  { title: "Nursehub", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" },
  { title: "Quantix", description: "Courte description de Quantix" },
  { title: "John Taylor", description: "Courte description de John Taylor" },
]

function ProjectsSection({ setActiveProject, activeProject }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  if (latest === 0) {
    setActiveProject(null)
  }
})

  
  return (
    <div ref={container} className='projects-container' style={{ paddingBottom: '80vh'}}>
      {projects.map((project, i) => {
        const targetScale = Math.max(
            0.5,
            1 - (projects.length - i - 5) * 0.06,
          );
        return (
          <Card
            key={i}
            i={i}
            title={project.title}
            description={project.description}
            progress={scrollYProgress}
            range={[i / projects.length, (i + 1) / projects.length]}
            targetScale={targetScale}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
          />
        )
      })}
    </div>
  )
}

export default ProjectsSection