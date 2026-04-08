import ProjectsSection from "./ProjectsSection";
import Hero from "./Hero"
import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ReactLenis from 'lenis/react'
import Badge from "./Badge";
import BadgeTabs from "./BadgeTabs";
import BottomSheet from './BottomSheet'
import HoverPanel from './HoverPanel'

function App() {
    const [activeProject, setActiveProject] = useState(null)
    const [flipped, setFlipped] = useState(false)
    const [hoveredProject, setHoveredProject] = useState(null)

  return (
      <ReactLenis root>
      <Badge flipped={flipped} setFlipped={setFlipped} />
      <Hero />
      <ProjectsSection setActiveProject={setActiveProject} activeProject={activeProject} setHoveredProject={setHoveredProject} />
      <ProjectPreview activeProject={activeProject}/>
      <HoverPanel hoveredProject={hoveredProject} />
      <BadgeTabs flipped={flipped} setFlipped={setFlipped} />
      <BottomSheet activeProject={activeProject} />
      </ReactLenis>
  )
}

export default App
