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

function Card({ i, title, description, progress, range, targetScale, setActiveProject, activeProject }) {
    const scale = useTransform(progress, range, [1, targetScale])
    useMotionValueEvent(progress, "change", (latest) => {
      console.log('latest:', latest, 'range[0]:', range[0], 'i:', i)
      
  if (latest >= range[0] && latest <= range[1]) {
    setActiveProject(i)
    } else if (latest <= range[0] && i === 0) {
    setActiveProject(null)
  }  
})
  return (
    <div className="card-container">
      <motion.div
        className="card"
        style={{ scale, top: `calc(-4vh + ${i * 40 + 320}px)`, boxShadow: activeProject === i ? `inset 0 0 20px 1px ${projects[i].color}` : 'none'
 }}>  
        <div className="card-dot"></div>
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>
    </div>
  )
}

export default Card