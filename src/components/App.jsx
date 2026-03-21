import ProjectsSection from "./ProjectsSection";
import Hero from "./Hero"
import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ReactLenis from 'lenis/react'
import Badge from "./Badge";


function App() {
    const [activeProject, setActiveProject] = useState(null)

  return (
     
    
      <ReactLenis root>
      <Hero />
      <ProjectsSection setActiveProject={setActiveProject} activeProject={activeProject} />
      <ProjectPreview activeProject={activeProject}/>
      <Badge />
      </ReactLenis>
  )
}

export default App
