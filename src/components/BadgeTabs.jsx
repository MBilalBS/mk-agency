import { motion, useMotionValue } from 'framer-motion'
import '../styles/BadgeTabs.css'
import { useLenis } from 'lenis/react'
import { fm } from '../tokens/tokens.js'
import { useTransform } from 'framer-motion'


const founders = [
  { id: 0, name: 'Mohamed Bounouar' },
  { id: 1, name: 'Khalil Keroui'    },
]

function BadgeTabs({ flipped, setFlipped }) {
    const scrollY  = useMotionValue(0)
    const x = useTransform(scrollY, [0, 100], ['0%', '-100%'])
     useLenis(({ scroll }) => {
    scrollY.set(scroll)
  })

  return (
    <motion.div className="badge-tabs" style={{x}}>
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
    </motion.div>
  )
}

export default BadgeTabs