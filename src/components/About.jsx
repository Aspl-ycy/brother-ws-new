import { useEffect, useRef } from 'react'
import './About.css'
import MoltenMetal from './MoltenMetal'
import { sectionReveal, imgParallax } from './animations'

export default function About() {
  const sectionRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    animRef.current = sectionReveal(sectionRef.current, {
      labelSel: '.about-section-label',
      titleSel: null,
      descSel: '.card-label',
      contentSel: '.about-inner',
      imgSel: '.portrait-img',
    })

    // 肖像 parallax
    const portrait = sectionRef.current.querySelector('.portrait-img')
    if (portrait) {
      imgParallax(portrait, sectionRef.current, 0.2)
    }

    return () => {
      if (animRef.current) animRef.current.kill()
    }
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="molten-bg">
        <MoltenMetal
          color1="#0a1a0b"
          color2="#b8ff3a"
          color3="#FFFFFF"
          speed={0.2}
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
          opacity={0.35}
          maxDpr={1}
        />
      </div>
      <div className="container">
        {/* Section label */}
        <div className="about-section-label">
          <span className="label-line"></span>
          <span className="label-text">ABOUT</span>
          <span className="label-line"></span>
        </div>

        <div className="about-inner">
          {/* ===== Left column: Bio ===== */}
          <div className="about-left">
            <div className="about-card">
              <div className="card-label">ABOUT ME · 关于我</div>
              <h3 className="card-title">
                我叫 <span className="text-name">王松</span>
              </h3>
              <p className="card-desc">
                我热爱影像，我相信，每一帧画面都承载着时间的重量——从镜头前的凝视，到剪辑台上的每一次取舍，我追求的从来不是炫技，而是让影像自己说话。
              </p>
              <p className="card-desc">
                我性格开朗、能吃苦、学习能力较强，对审美与画面有比较高的敏感度，想象力与思维反应都不慢。无论是独立创作还是团队协作，我习惯把责任感放在首位，也愿意为更好的画面反复打磨。
              </p>
              <p className="card-desc">
                器材与软件上，我能熟练操作各品牌型号相机与各型号稳定器，以及大疆各型号无人机；后期能熟练掌握 PR、达芬奇、剪映、LR，也能使用 PS、AE 完成必要的平面与特效工作。工作之余，我喜欢看电影、听音乐，也会做咖啡、调酒，审美与生活都在持续更新。
              </p>
              <ul className="bio-list">
                <li>
                  <span className="bio-dot"></span>
                  <span className="bio-key">邮箱</span>
                  <a href="mailto:2219840886@qq.com" className="bio-val">2219840886@qq.com</a>
                </li>
                <li>
                  <span className="bio-dot"></span>
                  <span className="bio-key">微信</span>
                  <span className="bio-val">18660743906</span>
                </li>
                <li>
                  <span className="bio-dot"></span>
                  <span className="bio-key">手机</span>
                  <a href="tel:18660743906" className="bio-val">18660743906</a>
                </li>
                <li>
                  <span className="bio-dot"></span>
                  <span className="bio-key">所在地</span>
                  <span className="bio-val">中国 · 济南</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ===== Right column: Portrait ===== */}
          <div className="about-right">
            <div className="portrait-wrap">
              <img
                src="/images/portrait.png"
                alt="王松肖像"
                className="portrait-img"
              />

              {/* Border frame — smaller than image, sits on portrait */}
              <div className="portrait-frame">
                <span className="vf-corner tl"></span>
                <span className="vf-corner tr"></span>
                <span className="vf-corner bl"></span>
                <span className="vf-corner br"></span>
                <span className="vf-mid top"></span>
                <span className="vf-mid bottom"></span>
                <span className="vf-mid left"></span>
                <span className="vf-mid right"></span>
              </div>

              {/* Software badges — outside right edge */}
              <div className="portrait-software">
                <span className="sw-softwares-label">SOFTWARES</span>
                <img src="/images/icon-davinci.png" alt="DaVinci Resolve" className="sw-badge davinci" title="DaVinci Resolve" />
                <img src="/images/icon-jianying.png" alt="剪映" className="sw-badge jianying" title="剪映" />
                <img src="/images/icon-pr.png" alt="Adobe Premiere Pro" className="sw-badge pr" title="Adobe Premiere Pro" />
              </div>

              {/* Yellow arc arrow — curves from below icons back to portrait */}
              <div className="sw-arrow">
                <svg viewBox="0 0 90 50" fill="none">
                  <path
                    d="M82 4 Q 75 45, 8 42"
                    stroke="#d4ff3a"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="8,42 17,37 15,48"
                    fill="#d4ff3a"
                  />
                </svg>
              </div>
            </div>

            {/* Equipment tags — separate box below */}
            <div className="portrait-equip">
              <span className="equip-tag">各品牌型号相机 · 各型号稳定器</span>
              <span className="equip-tag">大疆各型号无人机</span>
              <span className="equip-tag">PR · 达芬奇 · 剪映 · LR · PS · AE</span>
              <span className="equip-tag">咖啡 · 调酒 · 电影 · 音乐</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
