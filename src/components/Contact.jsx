import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import '../styles/Contact.css'

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
]

function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="contact-section" ref={ref}>

      {/* Grand titre */}
      <div className="contact-title-wrapper">
        {['TRAVAILLONS', 'ENSEMBLE'].map((word, i) => (
          <motion.h2
            key={i}
            className="contact-title"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.h2>
        ))}
      </div>

      {/* Contenu */}
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* Colonne gauche — infos */}
        <div className="contact-info">
          <div className="contact-info-block">
            <span className="contact-info-label">Email</span>
            <a href="mailto:hello@mk360.agency" className="contact-info-value">
              hello@mk360.agency
            </a>
          </div>
          <div className="contact-info-block">
            <span className="contact-info-label">Téléphone</span>
            <a href="tel:+33612345678" className="contact-info-value">
              +33 6 12 34 56 78
            </a>
          </div>
          <div className="contact-info-block">
            <span className="contact-info-label">Réseaux</span>
            <div className="contact-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="contact-social-link">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite — formulaire */}
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <div className="contact-field">
            <input type="text"    id="name"    placeholder=" " required />
            <label htmlFor="name">Nom</label>
          </div>
          <div className="contact-field">
            <input type="email"   id="email"   placeholder=" " required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="contact-field">
            <textarea             id="message" placeholder=" " rows={4} required />
            <label htmlFor="message">Message</label>
          </div>
          <button type="submit" className="contact-submit">
            <span>ENVOYER</span>
            <div className="contact-submit-fill" />
          </button>
        </form>

      </motion.div>

     

    </section>
  )
}

export default Contact