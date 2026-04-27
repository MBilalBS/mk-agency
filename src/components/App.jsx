import ProjectsSection from "./ProjectsSection";
import Hero from "./Hero"
import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ReactLenis from 'lenis/react'
import Badge from "./Badge";
import BadgeTabs from "./BadgeTabs";
import BottomSheet from './BottomSheet';
import ScrollText from './ScrollText';
import Services from './Services'
import Stats from './Stats'
import Contact from "./Contact";
import Footer from "./Footer";





function App() {
    const [activeProject, setActiveProject] = useState(null)
    const [flipped, setFlipped] = useState(false)

  return (
      <ReactLenis root>
      <Badge flipped={flipped} setFlipped={setFlipped} />
      <BadgeTabs flipped={flipped} setFlipped={setFlipped} />
      <BottomSheet activeProject={activeProject} />
      <div id="accueil">  <Hero />     </div>
      <div id="projets"><ProjectsSection setActiveProject={setActiveProject} activeProject={activeProject}  /></div>
      <ProjectPreview activeProject={activeProject}/>
      <ScrollText />
      <div id="services"><Services /></div>
      <div id="apropos"><Stats /></div>
      <div id="contact"><Contact /></div>
      <Footer />
      </ReactLenis>
  )
}

export default App 
