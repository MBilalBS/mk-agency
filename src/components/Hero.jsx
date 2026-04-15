import '../styles/Hero.css'
import logo from '../assets/mklogo.png'
import { useScroll, useTransform, motion } from 'framer-motion'
import { isMobile, layout } from '../tokens/tokens.js'

function Hero() {
  const { scrollYProgress } = useScroll()

  // logo monte vers le header au scroll
 const logoY = useTransform(
  scrollYProgress,
  [0, 0.05],
  [
    isMobile ? layout.logo.yStart.mobile : layout.logo.yStart.desktop,
    isMobile ? layout.logo.yEnd.mobile   : layout.logo.yEnd.desktop
  ]
)

  const logoScale = useTransform(
    scrollYProgress,
    [0, 0.05], 
    isMobile ? [1, 0.5] : [1, 0.3],
  )
  const supprText = useTransform(scrollYProgress, [0, 0.01, 1], [1, 0, 0])

  return (
    <div className="hero">

      {/* header fixe — fond bg, tout passe derrière */}
      <header className="site-header" />

      {/* logo animé — part du centre et monte dans le header */}
      <motion.img
        src={logo}
        alt="MK Logo"
        className="logo"
        style={{ y: logoY, scale: logoScale }}
      />

      <motion.div className="scroll-hint-wrapper" style={{ opacity: supprText }}>
        <span className="arrow blink">↑</span>
        <div className="scroll-hint blink">go up</div>
      </motion.div>
    </div>
  )
}

export default Hero