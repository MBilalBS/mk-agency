import { useLenis } from 'lenis/react'
import '../styles/Footer.css'

const links = [
  { label: 'Accueil',  href: '#accueil'  },
  { label: 'Projets',  href: '#projets'  },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#apropos'  },
  { label: 'Contact',  href: '#contact'  },
]

function Footer() {
  const lenis = useLenis()

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target && lenis) lenis.scrollTo(target, { duration: 1.5 })
  }

  return (
    <footer className="footer">
      <p className="footer-tagline">L'agence qui transforme tout.</p>
      <div className="footer-brand">
        <span className="footer-brand-text">MK360</span>
      </div>
      <div className="footer-bottom">
        <nav className="footer-nav">
          {links.map((link, i) => {
            return (
              <a key={i} href={link.href} className="footer-nav-link" onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            )
          })}
        </nav>
        <div className="footer-legal">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
        </div>
        <span className="footer-copyright">
          © {new Date().getFullYear()} MK360. Tous droits réservés.
        </span>
      </div>
    </footer>
  )
}

export default Footer