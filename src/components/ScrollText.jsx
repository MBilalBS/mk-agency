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

function ScrollText() {
  return (
    <header className="scroll-text-header" style={{ '--count': endings.length }}>
      <section className="scroll-text-section">

        {/* début de phrase — sticky */}
        <h2>
          <span>WE TURN&nbsp;</span>
        </h2>

        {/* liste des fins */}
        <ul className="scroll-text-list">
          {endings.map((ending, i) => (
            <li key={i} style={{ '--i': i }}>
              {ending}
            </li>
          ))}
        </ul>

      </section>
    </header>
  )
}

export default ScrollText