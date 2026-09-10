import { useEffect, useRef, useCallback, useState } from 'react'
import './Hero.css'
import { heroOpening } from './animations'

const navLinks = [
  { label: '关于', href: '#about' },
  { label: '视频', href: '#video' },
  { label: '摄影', href: '#photo' },
  { label: '联系', href: '#contact' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(false)
  const animRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // GSAP 开场动画
  useEffect(() => {
    if (!sectionRef.current) return
    // 短暂延迟确保 DOM 渲染完毕
    const timer = setTimeout(() => {
      animRef.current = heroOpening(sectionRef.current)
    }, 100)
    return () => {
      clearTimeout(timer)
      if (animRef.current) animRef.current.kill()
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    const maxOffset = 8
    targetRef.current = {
      x: nx * maxOffset,
      y: ny * maxOffset,
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)

    const lerp = () => {
      const cur = offsetRef.current
      const tgt = targetRef.current
      const ease = 0.05
      cur.x += (tgt.x - cur.x) * ease
      cur.y += (tgt.y - cur.y) * ease

      const bg = el.querySelector('.hero-bg')
      if (bg) {
        bg.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      }
      rafRef.current = isVisibleRef.current ? requestAnimationFrame(lerp) : null
    }

    const startParallax = () => {
      if (!isVisibleRef.current && rafRef.current === null) {
        isVisibleRef.current = true
        rafRef.current = requestAnimationFrame(lerp)
      }
    }
    const stopParallax = () => {
      isVisibleRef.current = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startParallax()
      else stopParallax()
    }, { threshold: 0 })
    observer.observe(el)
    startParallax()

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      stopParallax()
    }
  }, [handleMouseMove])

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Background Image */}
      <div className="hero-bg">
        <div className="hero-bg-overlay"></div>
        <div className="hero-vignette"></div>
        <div className="hero-curtain"></div>
      </div>

      {/* Texture layers */}
      <div className="hero-grain"></div>
      <div className="hero-scanlines"></div>
      <div className="hero-grid-dots"></div>

      {/* Top minimal nav */}
      <nav className="hero-nav">
        <div className="hero-nav-inner">
          <div className="nav-brand">
            <span className="nav-brand-dot"></span>
            <span className="nav-brand-text">WANG SONG</span>
          </div>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="nav-cta">
            联系我
          </a>
          <button
            className="nav-menu-toggle"
            type="button"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            联系我
          </a>
        </div>
      </nav>

      {/* Hero Frame — dashed border with corner markers */}
      <div className="hero-frame-wrap">
        <div className="hero-frame">
          {/* 4 corner markers */}
          <span className="frame-corner tl"></span>
          <span className="frame-corner tr"></span>
          <span className="frame-corner bl"></span>
          <span className="frame-corner br"></span>

          {/* Frame inner texture */}
          <div className="frame-grid-lines"></div>

          {/* Top-left small label */}
          <div className="frame-label">
            <span className="frame-label-en">PERSONAL PORTFOLIO</span>
          </div>

          {/* Big title — two lines */}
          <h1 className="hero-title">
            <span className="title-line-1">王松</span>
            <span className="title-line-2">个人作品集</span>
          </h1>

          {/* Bottom-right CTA pill */}
          <a href="#video" className="frame-year">
            <span className="frame-year-dot"></span>
            <span className="frame-year-text">查看作品</span>
          </a>

          {/* Decorative side label */}
          <div className="frame-side-label left">WANG · SONG</div>
          <div className="frame-side-label right">FILMMAKER · EDITOR</div>
        </div>

        {/* Below the frame: slogan + hint */}
        <div className="hero-slogan-row">
          <span className="slogan-arrow">→</span>
          <span className="slogan-text">影像记录世间美好</span>
          <span className="slogan-arrow">←</span>
        </div>
        <div className="hero-hint">
          <span className="hint-line"></span>
          <span className="hint-deco">Capturing the Beauty of the World</span>
          <span className="hint-line"></span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <span className="scroll-text">SCROLL ↓</span>
      </div>
    </section>
  )
}
