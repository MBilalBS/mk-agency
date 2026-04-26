import '../styles/Footer.css'

const links = [
  { label: 'Accueil',   href: '#accueil'  },
  { label: 'Projets',   href: '#projets'  },
  { label: 'Services',  href: '#services' },
  { label: 'À propos',  href: '#apropos'  },
  { label: 'Contact',   href: '#contact'  },
]

function Footer() {
  return (
    <footer className="footer">

      {/* Tagline */}
      <p className="footer-tagline">L'agence qui transforme tout.</p>

      {/* Grand nom */}
      <div className="footer-brand">
        <span className="footer-brand-text">MK360</span>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} MK360. Tous droits réservés.
        </span>
        <nav className="footer-nav">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-legal">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer