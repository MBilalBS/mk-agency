import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/FounderToggle.css'
import { fm } from '../tokens/tokens.js'

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
        <div className={`toggle-thumb ${isRight ? 'right' : ''}`} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={founder.name}
          className="founder-info"
          {...fm.fadeSlideUp}
          transition={fm.transition.normal}
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