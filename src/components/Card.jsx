import { motion, useTransform, useMotionValueEvent } from "framer-motion"
import '../styles/Card.css'

const projects = [
  { title: "Sealer", description:"AN icon of liberty", color: "#8aff47" },
  { title: "Reccos", description:"reconnu mondialement", color: "#ff6b6b" },
  { title: "IQ Agency", description:"l'inteligence haut de gamme", color: "#4facfe" },
  { title: "Great Road Company", description:"la route et les moto", color: "#f7971e" },
  { title: "Nursehub", description:"le medical a porte de main", color: "#a18cd1" },
  { title: "Quantix", description:"la quantification de des tarif", color: "#f953c6" },
  { title: "John Taylor", description:"Lorem Lorem Lorem lorem", color: "#43e97b" },
]

const isMobile = window.innerWidth < 768

function Card({ i, title, description, progress, range, targetScale, setActiveProject, activeProject, cardScale }) {
    const scale = useTransform(progress, range, [1, targetScale])
    const cardTop = isMobile
      ? `calc(55vh + ${i * 18}px)`
      : `calc(-4vh + ${i * 30 + 320}px)`
    useMotionValueEvent(progress, "change", (latest) => {
      
  if (latest >= range[0] && latest <= range[1]) {
    setActiveProject(i)
    } else if (latest <= range[0] && i === 0) {
    setActiveProject(null)
  }  console.log('cardScale:', cardScale, 'i:', i)

})
  return (
    <div className="card-container">
      <motion.div
        className="card"
        style={{ scale, top: cardTop,
        boxShadow: activeProject === i ? `inset 0 0 40px 2px ${projects[i].color}20` : 'none',
        border: activeProject === i ? `0.1px solid ${projects[i].color}` : '1px solid rgba(255,255,255,0.15)',
 }}>  
         <div className="card-dot"></div>
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>
    </div>
  )
}

export default Card