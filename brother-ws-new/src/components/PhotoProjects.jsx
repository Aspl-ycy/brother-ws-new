import { useEffect, useRef } from 'react'
import './PhotoProjects.css'
import MoltenMetal from './MoltenMetal'
import { sectionReveal } from './animations'

const TOTAL = 12
const STEP = 360 / TOTAL // 30°
const AUTO_SPEED = 10 // 自动旋转速度（度/秒）

const photos = Array.from({ length: TOTAL }, (_, i) => ({
  id: i + 1,
  src: `/images/photo-${String(i + 1).padStart(2, '0')}.jpg`,
}))

export default function PhotoProjects() {
  const sectionRef = useRef(null)
  const animRef = useRef(null)
  const rotationRef = useRef(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const carouselRef = useRef(null)

  // 连续旋转动画
  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      rotationRef.current += AUTO_SPEED * dt

      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    animRef.current = sectionReveal(sectionRef.current, {
      labelSel: '.section-label',
      titleSel: '.section-title',
      descSel: null,
      contentSel: '.pp-3d',
      imgSel: null, // 不对 carousel-item 做 GSAP 动画，避免 12 个 clip-path 同时计算
    })
    return () => {
      if (animRef.current) animRef.current.kill()
    }
  }, [])

  // 导航按钮：旋转一格
  const handlePrev = () => {
    rotationRef.current -= STEP
  }
  const handleNext = () => {
    rotationRef.current += STEP
  }

  return (
    <section className="photo-projects" id="photo" ref={sectionRef}>
      <div className="molten-bg">
        <MoltenMetal
          color1="#0a1a0b"
          color2="#b8ff3a"
          color3="#FFFFFF"
          speed={0.15}
          scale={2}
          detail={2}
          glow={1.0}
          coreSize={0.08}
          swirl={0.6}
          fold={-0.12}
          blackPoint={0.2}
          brightness={0.5}
          colorMode="molten"
          grain={false}
          grainIntensity={0}
          mouseInteraction={false}
          mouseStrength={0}
          opacity={0.3}
          maxDpr={1}
        />
      </div>
      <div className="container">
        <div className="pp-header">
          <div className="section-label">PHOTOGRAPHY</div>
          <h2 className="section-title">摄影作品</h2>
        </div>

        <div
          className="pp-3d"
        >
          <button
            className="pp-nav pp-nav-prev"
            onClick={handlePrev}
            aria-label="逆时针"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="pp-3d-stage">
            <div className="pp-carousel" ref={carouselRef}>
              {photos.map((photo, i) => {
                const angle = i * STEP
                return (
                  <div
                    className="pp-carousel-item"
                    key={photo.id}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(var(--pp-radius)) rotateY(180deg)`,
                    }}
                  >
                    <img src={photo.src} alt={`摄影作品 ${photo.id}`} loading="lazy" decoding="async" />
                  </div>
                )
              })}
            </div>
          </div>

          <button
            className="pp-nav pp-nav-next"
            onClick={handleNext}
            aria-label="顺时针"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://500px.com.cn/piane" target="_blank" rel="noopener noreferrer" className="pp-cta">
            <img src="/images/500px-logo.png" alt="500px" className="pp-cta-logo" />
            <span className="pp-cta-text">查看更多摄影作品</span>
          </a>
        </div>
      </div>
    </section>
  )
}
