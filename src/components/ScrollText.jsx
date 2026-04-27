import { useEffect, useRef } from 'react'
import '../styles/ScrollText.css'

const endings = [
  "IDEAS INTO PRODUCTS",
  "BRANDS INTO ICONS",
  "CONCEPTS INTO REALITY",
  "VISION INTO CODE",
  "AMBITION INTO DESIGN",
  "DREAMS INTO BRANDS",
  "NOTHING INTO SOMETHING",
]

const endingsMobile = [
  "PRODUCTS",
  "ICONS",
  "REALITY",
  "CODE",
  "DESIGN",
  "BRANDS",
  "SOMETHING",
]

function ScrollText() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const list     = isMobile ? endingsMobile : endings
  const listRef  = useRef(null)

  useEffect(() => {
    // sur desktop, background-attachment: fixed fonctionne — pas besoin de JS
    if (!isMobile) return

    const items = listRef.current?.querySelectorAll('li')
    if (!items) return

    const update = () => {
      const centerY = window.innerHeight * 0.5

      items.forEach((item) => {
        const rect  = item.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2
        const dist  = Math.abs(itemCenter - centerY)
        const range = rect.height * 1.2

        // plus le li est proche du centre, plus il est visible
        const ratio   = Math.max(0, 1 - dist / range)
        const opacity = 0.15 + ratio * 0.85

        item.style.color = `rgba(255,255,255,${opacity.toFixed(3)})`
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => window.removeEventListener('scroll', update)
  }, [isMobile])

  return (
    <div className="scroll-text-wrapper" style={{ '--count': list.length }}>
      <header className="scroll-text-header" style={{ '--count': list.length }}>
        <section className="scroll-text-section">
          <h2>
            <span>{isMobile ? 'WE CREATE\u00A0' : 'WE TURN\u00A0'}</span>
          </h2>
          <ul className="scroll-text-list" ref={listRef}>
            {list.map((ending, i) => (
              <li key={i} style={{ '--i': i }}>
                {ending}
              </li>
            ))}
          </ul>
        </section>
      </header>
    </div>
  )
}

export default ScrollText