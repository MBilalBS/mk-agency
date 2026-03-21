import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/FounderToggle.css'

const founders = [
  {
    name: 'Bounouar Mohamed',
    role: 'Co-Founder & CEO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Keroui Khalil',
    role: 'Co-Founder & COO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
]

function FounderToggle() {
  const [isRight, setIsRight] = useState(false)
  const founder = founders[isRight ? 1 : 0]

  return (
    <div className="founder-toggle">
      <div className="toggle" onClick={() => setIsRight(!isRight)}>
        <div className={`toggle-thumb ${isRight ? 'right' : ''}`}></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={founder.name}
          className="founder-info"
          initial={{ opacity: 0, y: -10 }} // état de départ
          animate={{ opacity: 1, y: 0 }} // état final
          exit={{ opacity: 0, y: -10 }} // état de sortie
          transition={{ duration: 0.3 }} // vitesse
        >
          <p className="founder-name">{founder.name}</p>
          <p className="founder-role">{founder.role}</p>
          <p className="founder-description">{founder.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FounderToggle