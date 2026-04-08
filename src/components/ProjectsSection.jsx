import { useRef, useEffect, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Card from './Card'
import { isMobile } from '../tokens/tokens.js'

const projects = [
  { title: "Sealer"             },
  { title: "Reccos"             },
  { title: "IQ Agency"          },
  { title: "Great Road Company" },
  { title: "Nursehub"           },
  { title: "Quantix"            },
  { title: "John Taylor"        },
]

function ProjectsSection({ setActiveProject, activeProject, setHoveredProject }) {
  const container  = useRef(null)
  const cardRefs   = useRef({}) // stocke toutes les refs des cards
  const hoverTimer = useRef(null)
  const currentHovered = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 0) setActiveProject(null)
  })

  // fonction appelée par chaque Card pour enregistrer sa ref
  const registerCardRef = useCallback((i, ref) => {
    cardRefs.current[i] = ref
  }, [])

  // écoute globale du mousemove
  useEffect(() => {
    if (isMobile) return // pas besoin sur mobile

    const handleMouseMove = (e) => {
      let found = null

      // on vérifie chaque card
      Object.entries(cardRefs.current).forEach(([index, ref]) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        // est-ce que la souris est dans les bounds de cette card ?
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          found = Number(index)
        }
      })

      if (found !== null && found !== currentHovered.current) {
        // nouvelle card détectée → délai 300ms
        clearTimeout(hoverTimer.current)
        hoverTimer.current = setTimeout(() => {
          currentHovered.current = found
          setHoveredProject(found)
        }, 100)
      } else if (found === null && currentHovered.current !== null) {
        // plus sur aucune card → ferme le panel
        clearTimeout(hoverTimer.current)
        currentHovered.current = null
        setHoveredProject(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
            setHoveredProject={setHoveredProject}
            registerCardRef={registerCardRef}
          />
        )
      })}
    </div>
  )
}

export default ProjectsSection