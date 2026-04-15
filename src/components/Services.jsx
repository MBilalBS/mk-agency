import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLenis } from 'lenis/react'
import '../styles/Services.css'
import { servicesData, fm } from '../tokens/tokens.js'

function ServiceSection({ service, index }) {
  const ref        = useRef(null)
  const isInView   = useInView(ref, { once: true, margin: '-20% 0px' })
  const sectionRef = useRef(null)
  const globalMouse = useRef({ x: 0, y: 0 })

  const [mousePos,   setMousePos]   = useState({ x: -999, y: -999 })
  const [isHovering, setIsHovering] = useState(false)

  const updateSpotlight = () => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const { x, y } = globalMouse.current

    const inBounds =
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top  &&
      y <= rect.bottom

    setIsHovering(inBounds)
    setMousePos({
      x: x - rect.left,
      y: y - rect.top,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      globalMouse.current = { x: e.clientX, y: e.clientY }
      updateSpotlight()
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useLenis(() => { updateSpotlight() })

  return (
    <div ref={sectionRef} className="service-section">

      {/* toujours dans le DOM — opacity gère le fade */}
      <div
        className="service-spotlight"
        style={{
          left:    mousePos.x,
          top:     mousePos.y,
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div ref={ref} className="service-inner">
        <span className="service-bg-number">{service.number}</span>

        <motion.div
          className="service-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...fm.transition.slow, delay: 0.1 }}
        >
          <span className="service-label">// {service.number}</span>
          <h2 className="service-title">{service.title}</h2>
          <p className="service-description">{service.description}</p>
        </motion.div>

        <motion.ul
          className="service-skills"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ...fm.transition.slow, delay: 0.3 }}
        >
          {service.skills.map((skill, i) => (
            <motion.li
              key={i}
              className="service-skill-item"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...fm.transition.normal, delay: 0.3 + i * 0.08 }}
            >
              <span className="service-skill-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="service-skill-name">{skill}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="services-container">
      {servicesData.map((service, index) => (
        <ServiceSection key={index} service={service} index={index} />
      ))}
    </section>
  )
}

export default Services