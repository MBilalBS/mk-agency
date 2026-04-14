import ProjectsSection from "./ProjectsSection";
import Hero from "./Hero"
import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ReactLenis from 'lenis/react'
import Badge from "./Badge";
import BadgeTabs from "./BadgeTabs";
import BottomSheet from './BottomSheet';
import ScrollText from './ScrollText'



function App() {
    const [activeProject, setActiveProject] = useState(null)
    const [flipped, setFlipped] = useState(false)

  return (
      <ReactLenis root>
      <Badge flipped={flipped} setFlipped={setFlipped} />
      <BadgeTabs flipped={flipped} setFlipped={setFlipped} />
      <BottomSheet activeProject={activeProject} />
      <Hero />
      <ProjectsSection setActiveProject={setActiveProject} activeProject={activeProject}  />
      <ProjectPreview activeProject={activeProject}/>
      <ScrollText />
      </ReactLenis>
  )
}

export default App 
