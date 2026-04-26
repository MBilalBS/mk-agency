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

  return (
    <div className="scroll-text-wrapper">
      <header className="scroll-text-header" style={{ '--count': list.length }}>
        <section className="scroll-text-section">
          <h2>
            <span>{isMobile ? 'WE CREATE\u00A0' : 'WE TURN\u00A0'}</span>
          </h2>
          <ul className="scroll-text-list">
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