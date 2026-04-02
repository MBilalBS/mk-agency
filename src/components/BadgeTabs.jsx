import { motion } from 'framer-motion'
import '../styles/BadgeTabs.css'
import { fm } from '../tokens/tokens.js'

const founders = [
  { id: 0, name: 'Mohamed Bounouar' },
  { id: 1, name: 'Khalil Keroui'    },
]

function BadgeTabs({ flipped, setFlipped }) {
  return (
    <div className="badge-tabs">
      {founders.map((founder) => {
        const isActive = flipped === (founder.id === 1)
        return (
          <motion.button
            key={founder.id}
            className={`badge-tab ${isActive ? 'active' : ''}`}
            onClick={() => setFlipped(founder.id === 1)}
            whileTap={{ scale: 0.97 }}
            transition={fm.transition.fast}
          >
            {founder.name}
          </motion.button>
        )
      })}
    </div>
  )
}

export default BadgeTabs