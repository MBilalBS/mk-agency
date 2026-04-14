import { useRef, useEffect, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Card from './Card'

const projects = [
  { title: "Sealer"             },
  { title: "Reccos"             },
  { title: "IQ Agency"          },
  { title: "Great Road Company" },
  { title: "Nursehub"           },
  { title: "Quantix"            },
  { title: "John Taylor"        },
]

function ProjectsSection({ setActiveProject, activeProject }) {
  const container  = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 0|| latest === 1) setActiveProject(null)
  })

  return (
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
          />
        )
      })}
    </div>
  )
}

export default ProjectsSection