import '../styles/Hero.css'
import logo from '../assets/mklogo.png'
import { useScroll, useTransform, motion } from 'framer-motion'
import { isMobile, layout } from '../tokens/tokens.js'
import {useLenis} from 'lenis/react'

function Hero() {
  const { scrollYProgress } = useScroll()
  const lenis = useLenis()

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 })
  }
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
const { scrollY } = useScroll()
const supprText = useTransform(scrollY, [0, 20], [1, 0])

  return (
    <div className="hero">

      {/* header fixe — fond bg, tout passe derrière */}
      <header className="site-header" />

      {/* logo animé — part du centre et monte dans le header */}
      <motion.img
        src={logo}
        alt="MK Logo"
        className="logo"
        onClick={scrollToTop}
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