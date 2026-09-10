import { useEffect, useRef } from 'react'
import './Footer.css'
import MoltenMetal from './MoltenMetal'
import { sectionReveal } from './animations'

const qrLinks = [
  { name: '微信', qr: '/images/qr-wechat.jpg', id: 'piane' },
  { name: '抖音', qr: '/images/qr-douyin.png', id: '@piane' },
  { name: '小红书', qr: '/images/qr-xiaohongshu.jpg', id: '法兰克海洋' },
]

export default function Footer() {
  const sectionRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    animRef.current = sectionReveal(sectionRef.current, {
      labelSel: '.section-label',
      titleSel: '.footer-title',
      descSel: null,
      contentSel: '.footer-sections',
      imgSel: '.footer-qr-item',
    })
    return () => {
      if (animRef.current) animRef.current.kill()
    }
  }, [])

  return (
    <footer className="footer" id="contact" ref={sectionRef}>
      <div className="footer-bg">
        <div className="footer-grain"></div>
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
      </div>
      <div className="container footer-inner">
        <div className="footer-content">
          <div className="section-label">GET IN TOUCH</div>
          <h2 className="footer-title">
            让我们一起<br />
            <span className="footer-accent">创造些什么</span>
          </h2>

          <div className="footer-sections">
            {/* 联系方式 */}
            <div className="footer-section">
              <div className="footer-link">
                <span className="footer-link-label">手机</span>
                <a href="tel:18660743906" className="link-value link-value-link">18660743906</a>
              </div>
              <div className="footer-link">
                <span className="footer-link-label">B站</span>
                <span className="link-value">煎饼卷大松</span>
              </div>
            </div>

            {/* 二维码 */}
            <div className="footer-section">
              <div className="footer-qr-row">
                {qrLinks.map((s) => (
                  <div className="footer-qr-item" key={s.name}>
                    <div className="footer-qr-img">
                      <img src={s.qr} alt={`${s.name}二维码`} />
                    </div>
                    <div className="footer-qr-text">
                      <span className="footer-qr-name">{s.name}</span>
                      <span className="footer-qr-id">{s.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span className="footer-copyright">© 2024 Piane. All rights reserved.</span>
            <span className="footer-credit">Crafted with precision</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
