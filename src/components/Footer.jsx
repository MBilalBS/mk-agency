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

      {/* Tagline */}
      <p className="footer-tagline">L'agence qui transforme tout.</p>

      {/* Logo + texte */}
      <div className="footer-main">
        <img src="./src/assets/mklogo.png" alt="MK360" className="footer-logo" />
        <p className="footer-description">
          Fondée par deux passionnés, MK360 est une agence créative qui couvre
          l'intégralité du spectre de la communication, du branding à la stratégie
          digitale, du développement web à la direction artistique. Nous ne
          choisissons pas un domaine. Nous les maîtrisons tous.
        </p>
      </div>

      {/* Bas */}
      <div className="footer-bottom">
        <nav className="footer-nav-bottom">
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