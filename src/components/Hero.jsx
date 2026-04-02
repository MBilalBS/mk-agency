import '../styles/Hero.css'
import logo from '../assets/mklogo.png'
import { useScroll, useTransform, motion } from 'framer-motion'
import FounderToggle from './FounderToggle'
import { isMobile, layout } from '../tokens/tokens.js'

function Hero() {
  const { scrollYProgress } = useScroll()

  const logoY = useTransform(
    scrollYProgress,
    [0, 0.1],
    [isMobile ? layout.logo.yStart.mobile : layout.logo.yStart.desktop, layout.logo.yEnd.mobile]
  )

  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.5])
  const supprText = useTransform(scrollYProgress, [0, 0.015, 1], [1, 0, 0])

  return (
    <div className="hero">
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