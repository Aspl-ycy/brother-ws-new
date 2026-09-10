import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ===================================================
   通用缓动 — 慢节奏、丝滑、高级感
   =================================================== */
export const EASE = {
  smooth: 'power3.out',
  enter: 'power4.out',
  exit: 'power2.in',
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
  gentle: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

/* ===================================================
   Hero 开场动画
   =================================================== */
export function heroOpening(container) {
  const tl = gsap.timeline({
    defaults: { ease: EASE.expo },
  })

  // 1) 全屏黑幕揭起
  const curtain = container.querySelector('.hero-curtain')
  if (curtain) {
    tl.fromTo(curtain,
      { clipPath: 'inset(0 0 0 0)' },
      { clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: EASE.expoInOut },
      0
    )
  }

  // 2) 背景图从暗到亮
  const bg = container.querySelector('.hero-bg')
  if (bg) {
    tl.fromTo(bg,
      { scale: 1.12, filter: 'brightness(0.2)' },
      { scale: 1, filter: 'brightness(1)', duration: 2.2, ease: EASE.expoInOut },
      0.3
    )
  }

  // 3) 导航栏从上方滑入
  const nav = container.querySelector('.hero-nav')
  if (nav) {
    tl.fromTo(nav,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      0.6
    )
  }

  // 3.5) Frame-wrap 父容器先变可见
  const frameWrap = container.querySelector('.hero-frame-wrap')
  if (frameWrap) {
    tl.fromTo(frameWrap,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: EASE.expoInOut },
      0.7
    )
  }

  // 4) Frame 边框线描绘
  const frame = container.querySelector('.hero-frame')
  if (frame) {
    tl.fromTo(frame,
      { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.4, ease: EASE.expoInOut },
      0.8
    )
  }

  // 5) 四角标记弹入
  const corners = container.querySelectorAll('.frame-corner')
  if (corners.length) {
    tl.fromTo(corners,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08 },
      1.2
    )
  }

  // 6) 标题：位移 + 压缩 scaleY 归位 + 遮罩揭开
  const line1 = container.querySelector('.title-line-1')
  const line2 = container.querySelector('.title-line-2')
  if (line1) {
    tl.fromTo(line1,
      { y: 120, scaleY: 1.5, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, scaleY: 1, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: EASE.expo },
      1.1
    )
  }
  if (line2) {
    tl.fromTo(line2,
      { y: 100, scaleY: 1.4, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, scaleY: 1, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: EASE.expo },
      1.25
    )
  }

  // 7) Frame label 和 side labels
  const frameLabel = container.querySelector('.frame-label')
  const sideLabels = container.querySelectorAll('.frame-side-label')
  if (frameLabel) {
    tl.fromTo(frameLabel,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      1.5
    )
  }
  if (sideLabels.length) {
    tl.fromTo(sideLabels,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, stagger: 0.1 },
      1.6
    )
  }

  // 8) 查看作品按钮
  const yearBtn = container.querySelector('.frame-year')
  if (yearBtn) {
    tl.fromTo(yearBtn,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.smooth },
      1.7
    )
  }

  // 9) Grid lines 淡入
  const gridLines = container.querySelector('.frame-grid-lines')
  if (gridLines) {
    tl.fromTo(gridLines,
      { opacity: 0 },
      { opacity: 0.06, duration: 1.5 },
      1.4
    )
  }

  // 10) Slogan 行
  const sloganRow = container.querySelector('.hero-slogan-row')
  const hint = container.querySelector('.hero-hint')
  if (sloganRow) {
    tl.fromTo(sloganRow,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.smooth },
      1.8
    )
  }
  if (hint) {
    tl.fromTo(hint,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.smooth },
      2.0
    )
  }

  // 11) Scroll indicator
  const scroll = container.querySelector('.hero-scroll')
  if (scroll) {
    tl.fromTo(scroll,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      2.4
    )
  }

  // 12) 纹理层淡入
  const grain = container.querySelector('.hero-grain')
  const scanlines = container.querySelector('.hero-scanlines')
  const gridDots = container.querySelector('.hero-grid-dots')
  if (grain) tl.fromTo(grain, { opacity: 0 }, { opacity: 0.08, duration: 1.5 }, 1.0)
  if (scanlines) tl.fromTo(scanlines, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 1.2)
  if (gridDots) tl.fromTo(gridDots, { opacity: 0 }, { opacity: 0.12, duration: 1.5 }, 1.4)

  return tl
}

/* ===================================================
   通用 Section 滚动进场 — 英文标题大幅 → 中文标题 → 内容 stagger
   =================================================== */
export function sectionReveal(section, config = {}) {
  const {
    labelSel = '.section-label, .about-section-label',
    titleSel = '.section-title',
    descSel = '.section-desc, .card-desc, .card-label',
    contentSel = '.about-inner, .vp-layout, .pp-3d, .footer-sections',
    imgSel = '.portrait-img, .vp-card-image, .micro-film-viewer, .footer-qr-item',
    wrapperSel = '.footer-content',
  } = config

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      once: true,
    },
    defaults: { ease: EASE.expo },
  })

  // 0) 父容器 wrapper 先变可见（如 .footer-content）
  const wrapper = section.querySelector(wrapperSel)
  if (wrapper) {
    tl.fromTo(wrapper,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      0
    )
  }

  // 1) 英文 label — 从左侧大幅滑入 + 透明
  const label = section.querySelector(labelSel)
  if (label) {
    tl.fromTo(label,
      { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.2 },
      0
    )
  }

  // 2) 中文标题 — 从下方位移 + scaleY 压缩归位
  const title = section.querySelector(titleSel)
  if (title) {
    tl.fromTo(title,
      { y: 80, scaleY: 1.3, opacity: 0 },
      { y: 0, scaleY: 1, opacity: 1, duration: 1.4 },
      0.15
    )
  }

  // 3) 描述文字淡入上移
  const desc = section.querySelector(descSel)
  if (desc) {
    tl.fromTo(desc,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0.35
    )
  }

  // 4) 内容区域淡入上移
  const content = section.querySelector(contentSel)
  if (content) {
    tl.fromTo(content,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      0.4
    )
  }

  // 5) 图片/卡片 stagger 进场 + clip-path reveal
  const imgs = section.querySelectorAll(imgSel)
  if (imgs.length) {
    tl.fromTo(imgs,
      { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1 },
      0.5
    )
  }

  return tl
}

/* ===================================================
   图片 parallax — 滚动时图片轻微偏移
   =================================================== */
export function imgParallax(img, trigger, speed = 0.15) {
  return gsap.fromTo(img,
    { y: -30 * speed },
    {
      y: 30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  )
}

export { gsap, ScrollTrigger }
