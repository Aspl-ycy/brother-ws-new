import { useEffect, useRef, useState } from 'react'
import './Strengths.css'

const strengths = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: '摄影',
    desc: '从人文纪实到商业摄影，善于捕捉决定性瞬间，用光线与构图构建叙事张力。',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: '摄像',
    desc: '精通各类机型与运动镜头调度，擅长将场景转化为有呼吸感的动态影像。',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    title: '剪辑',
    desc: '从粗剪到精修，擅长节奏把控与叙事重构，让每一帧都服务于故事本身。',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: '全流程',
    desc: '从前期策划、拍摄执行到后期调色与交付，一站式完成，确保影像风格的统一与品质。',
  },
]

export default function Strengths() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="strengths" id="strengths" ref={sectionRef}>
      <div className="container">
        <div className={`st-header ${visible ? 'visible' : ''}`}>
          <div className="section-label">CAPABILITIES</div>
          <h2 className="section-title">我的优势</h2>
          <p className="section-desc">
            不只是单一技能的执行者，而是从创意到交付的全链路影像创作者。
          </p>
        </div>

        <div className="st-grid">
          {strengths.map((item, i) => (
            <div
              key={i}
              className={`st-card ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="st-card-icon">{item.icon}</div>
              <h3 className="st-card-title">{item.title}</h3>
              <p className="st-card-desc">{item.desc}</p>
              <div className="st-card-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
