import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLenis } from 'lenis/react'
import '../styles/Services.css'
import { servicesData, fm } from '../tokens/tokens.js'

function ServiceSection({ service, index }) {
  const ref          = useRef(null)
  const isInView     = useInView(ref, { once: true, margin: '-20% 0px' })
  const sectionRef   = useRef(null)
  const spotlightRef = useRef(null)
  const globalMouse  = useRef({ x: 0, y: 0 })

  // alterne la direction — pair à gauche, impair à droite
  const isReversed = index % 2 !== 0

  const updateSpotlight = () => {
    if (!sectionRef.current || !spotlightRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const { x, y } = globalMouse.current

    const inBounds =
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top  &&
      y <= rect.bottom

    spotlightRef.current.style.left    = `${x - rect.left}px`
    spotlightRef.current.style.top     = `${y - rect.top}px`
    spotlightRef.current.style.opacity = inBounds ? '1' : '0'
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
      <div ref={spotlightRef} className="service-spotlight" style={{ opacity: 0 }} />

      <div
        ref={ref}
        className={`service-inner ${isReversed ? 'reversed' : ''}`}
      >
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
              initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
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

function SecondaryServices() {
  const ref     = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="services-secondary"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={fm.transition.slow}
    >
      <p className="services-secondary-label">Et aussi</p>
      <div className="services-secondary-grid">
        {servicesData.secondary.map((service, i) => (
          <motion.div
            key={i}
            className="services-secondary-item"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...fm.transition.normal, delay: i * 0.1 }}
          >
            <span className="services-secondary-number">{service.number}</span>
            <h3 className="services-secondary-title">{service.title}</h3>
            <ul className="services-secondary-skills">
              {service.skills.map((skill, j) => (
                <li key={j}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Services() {
  return (
    <section className="services-container">
      {servicesData.main.map((service, index) => (
        <ServiceSection key={index} service={service} index={index} />
      ))}
      <SecondaryServices />
    </section>
  )
}

export default Services