import { useEffect, useRef, useState, useCallback } from 'react'
import './VideoProjects.css'
import MoltenMetal from './MoltenMetal'
import { sectionReveal, gsap } from './animations'

const VIDEO_BASE_URL = (
  import.meta.env.VITE_VIDEO_BASE_URL || '/videos/optimized'
).replace(/\/+$/, '')

const videoUrl = (filename) => `${VIDEO_BASE_URL}/${encodeURIComponent(filename)}`

const categories = [
  {
    id: 'micro-film',
    label: '微电影',
    en: 'MICRO FILM',
    desc: '叙事短片 · 情感表达',
  },
  {
    id: 'documentary',
    label: '纪录片',
    en: 'DOCUMENTARY',
    desc: '人文纪实 · 真实记录',
  },
  {
    id: 'mv',
    label: 'MV',
    en: 'MUSIC VIDEO',
    desc: '音乐影像 · 视听共振',
  },
  {
    id: 'commercial',
    label: '探店拍摄',
    en: 'STORE VISIT',
    desc: '探店打卡 · 竖屏短视频',
  },
  {
    id: 'ip',
    label: 'IP打造',
    en: 'IP BRANDING',
    desc: '个人IP · 账号孵化',
  },
]

const microFilmSlides = [
  '/images/micro-cover.jpg',
  '/images/micro-thumb-1.png',
  '/images/micro-thumb-3.png',
  '/images/micro-thumb-4.png',
  '/images/micro-thumb-5.png',
]

const microFilmThumbs = microFilmSlides.slice(1)

const documentarySlides = [
  '/images/doc-cover.jpg',
  '/images/doc-thumb-1.jpg',
  '/images/doc-thumb-2.jpg',
  '/images/doc-thumb-3.jpg',
  '/images/doc-thumb-4.jpg',
]

const documentaryThumbs = documentarySlides.slice(1)

const mvSlides = [
  '/images/mv-cover.jpg',
  '/images/mv-thumb-1.jpg',
  '/images/mv-thumb-2.jpg',
  '/images/mv-thumb-3.jpg',
  '/images/mv-thumb-4.jpg',
]

const mvThumbs = mvSlides.slice(1)

function MicroFilmViewer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const videoRef = useRef(null)

  const openPlayer = () => {
    setHasOpened(true)
    setPlaying(true)
  }

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause()
    setPlaying(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="micro-film-viewer">
      <div className="micro-film-bg" aria-label="微电影封面">
        {microFilmSlides.map((src, i) => (
          <div
            key={src}
            className={`micro-film-bg-layer ${activeIndex === i ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="micro-film-play-wrap">
        <button
          type="button"
          className="micro-film-play"
          onClick={openPlayer}
          aria-label="播放微电影"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <span className="micro-film-play-text">播放</span>
      </div>

      <div className="micro-film-credits">
        <span className="micro-film-credits-role">编剧</span>
        <span className="micro-film-credits-dot">·</span>
        <span className="micro-film-credits-role">摄影</span>
        <span className="micro-film-credits-dot">·</span>
        <span className="micro-film-credits-role">剪辑</span>
        <span className="micro-film-credits-name">王松</span>
      </div>

      <div
        className="micro-film-thumbs"
        onMouseLeave={() => setActiveIndex(0)}
      >
        {microFilmThumbs.map((src, i) => (
          <div
            key={src}
            className={`micro-film-thumb ${activeIndex === i + 1 ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i + 1)}
          >
            <img src={src} alt={`微电影画面 ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* 视频播放器浮层 */}
      <div
        className={`micro-film-player ${playing ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlayer()
        }}
      >
        <button
          type="button"
          className="micro-film-player-close"
          onClick={closePlayer}
          aria-label="关闭播放器"
        >
          ✕
        </button>
        {hasOpened && (
          <video
            ref={videoRef}
            className="micro-film-video"
            src={videoUrl('24毕业季流媒体版本.mp4')}
            controls
            preload="metadata"
            autoPlay={playing}
            playsInline
          />
        )}
      </div>
    </div>
  )
}

function DocumentaryViewer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const videoRef = useRef(null)

  const openPlayer = () => {
    setHasOpened(true)
    setPlaying(true)
  }

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause()
    setPlaying(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="micro-film-viewer">
      <div className="micro-film-bg" aria-label="纪录片封面">
        {documentarySlides.map((src, i) => (
          <div
            key={src}
            className={`micro-film-bg-layer ${activeIndex === i ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="micro-film-play-wrap">
        <button
          type="button"
          className="micro-film-play"
          onClick={openPlayer}
          aria-label="播放纪录片"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <span className="micro-film-play-text">播放</span>
      </div>

      <div className="micro-film-credits">
        <span className="micro-film-credits-role">摄影</span>
        <span className="micro-film-credits-name">王松</span>
      </div>

      <div
        className="micro-film-thumbs"
        onMouseLeave={() => setActiveIndex(0)}
      >
        {documentaryThumbs.map((src, i) => (
          <div
            key={src}
            className={`micro-film-thumb ${activeIndex === i + 1 ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i + 1)}
          >
            <img src={src} alt={`纪录片画面 ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* 视频播放器浮层 */}
      <div
        className={`micro-film-player ${playing ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlayer()
        }}
      >
        <button
          type="button"
          className="micro-film-player-close"
          onClick={closePlayer}
          aria-label="关闭播放器"
        >
          ✕
        </button>
        {hasOpened && (
          <video
            ref={videoRef}
            className="micro-film-video"
            src={videoUrl('documentary.mp4')}
            controls
            preload="metadata"
            autoPlay={playing}
            playsInline
          />
        )}
      </div>
    </div>
  )
}

function MVViewer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const videoRef = useRef(null)

  const openPlayer = () => {
    setHasOpened(true)
    setPlaying(true)
  }

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause()
    setPlaying(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="micro-film-viewer">
      <div className="micro-film-bg" aria-label="MV封面">
        {mvSlides.map((src, i) => (
          <div
            key={src}
            className={`micro-film-bg-layer ${activeIndex === i ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="micro-film-play-wrap">
        <button
          type="button"
          className="micro-film-play"
          onClick={openPlayer}
          aria-label="播放MV"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <span className="micro-film-play-text">播放</span>
      </div>

      <div className="micro-film-credits">
        <span className="micro-film-credits-role">摄影</span>
        <span className="micro-film-credits-dot">·</span>
        <span className="micro-film-credits-role">剪辑</span>
        <span className="micro-film-credits-name">王松</span>
      </div>

      <div
        className="micro-film-thumbs"
        onMouseLeave={() => setActiveIndex(0)}
      >
        {mvThumbs.map((src, i) => (
          <div
            key={src}
            className={`micro-film-thumb ${activeIndex === i + 1 ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i + 1)}
          >
            <img src={src} alt={`MV画面 ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* 视频播放器浮层 */}
      <div
        className={`micro-film-player ${playing ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlayer()
        }}
      >
        <button
          type="button"
          className="micro-film-player-close"
          onClick={closePlayer}
          aria-label="关闭播放器"
        >
          ✕
        </button>
        {hasOpened && (
          <video
            ref={videoRef}
            className="micro-film-video"
            src={videoUrl('mv.mp4')}
            controls
            preload="metadata"
            autoPlay={playing}
            playsInline
          />
        )}
      </div>
    </div>
  )
}

const commercialVideos = [
  { id: 1, title: '东北小串', cover: '/images/commercial-cover-1.jpg', video: videoUrl('commercial-1.mp4') },
  { id: 2, title: '真枪实弹', cover: '/images/commercial-cover-2.jpg', video: videoUrl('commercial-2.mp4') },
  { id: 3, title: '老渔民', cover: '/images/commercial-cover-3.jpg', video: videoUrl('commercial-3.mp4') },
]

function CommercialViewer() {
  const [playing, setPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const videoRef = useRef(null)

  const openPlayer = (src) => {
    setVideoSrc(src)
    setHasOpened(true)
    setPlaying(true)
  }

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause()
    setPlaying(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <div className="vp-grid-ip">
        {commercialVideos.map((item) => (
          <div className="vp-card-ip" key={item.id}>
            <div className="vp-card-ip-cover vp-card-ip-cover-filled">
              <img src={item.cover} alt={item.title} />
              <button type="button" className="vp-card-ip-play" aria-label="播放" onClick={() => openPlayer(item.video)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>
            <h3 className="vp-card-ip-title">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* 视频播放器浮层 */}
      <div
        className={`micro-film-player ${playing ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlayer()
        }}
      >
        <button
          type="button"
          className="micro-film-player-close"
          onClick={closePlayer}
          aria-label="关闭播放器"
        >
          ✕
        </button>
        {hasOpened && (
          <video
            ref={videoRef}
            className="micro-film-video"
            src={videoSrc}
            autoPlay={playing}
            controls
            playsInline
          />
        )}
      </div>
    </>
  )
}

const ipVideos = [
  { id: 1, title: '如何打败竞争对手', cover: '/images/ip-cover-1.jpg', video: videoUrl('ip-1.mp4') },
  { id: 2, title: '海的那边是什么', cover: '/images/ip-cover-2.jpg', video: videoUrl('ip-2.mp4') },
  { id: 3, title: '柯小欢米酒诞生地', cover: '/images/ip-cover-3.jpg', video: videoUrl('ip-3.mp4') },
]

function IPViewer() {
  const [playing, setPlaying] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const videoRef = useRef(null)

  const openPlayer = (src) => {
    setVideoSrc(src)
    setHasOpened(true)
    setPlaying(true)
  }

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause()
    setPlaying(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <div className="vp-grid-ip">
        {ipVideos.map((item) => (
          <div className="vp-card-ip" key={item.id}>
            <div className="vp-card-ip-cover vp-card-ip-cover-filled">
              <img src={item.cover} alt={item.title} />
              <button type="button" className="vp-card-ip-play" aria-label="播放" onClick={() => openPlayer(item.video)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>
            <h3 className="vp-card-ip-title">{item.title}</h3>
          </div>
        ))}
      </div>

      <div
        className={`micro-film-player ${playing ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlayer()
        }}
      >
        <button
          type="button"
          className="micro-film-player-close"
          onClick={closePlayer}
          aria-label="关闭播放器"
        >
          ✕
        </button>
        {hasOpened && (
          <video
            ref={videoRef}
            className="micro-film-video"
            src={videoSrc}
            autoPlay={playing}
            controls
            playsInline
          />
        )}
      </div>
    </>
  )
}

export default function VideoProjects() {
  const sectionRef = useRef(null)
  const animRef = useRef(null)
  const [activeId, setActiveId] = useState(categories[0].id)
  const contentRef = useRef(null)
  const activeIdRef = useRef(categories[0].id)
  const isAnimatingRef = useRef(false)
  const pendingIdRef = useRef(null)

  // 切换板块的丝滑动画，始终保留最新的悬停目标
  const switchTo = useCallback((id) => {
    if (isAnimatingRef.current) {
      pendingIdRef.current = id
      return
    }

    if (id === activeIdRef.current) return

    isAnimatingRef.current = true
    pendingIdRef.current = id

    const el = contentRef.current
    if (!el) {
      activeIdRef.current = id
      setActiveId(id)
      pendingIdRef.current = null
      isAnimatingRef.current = false
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        activeIdRef.current = id
        setActiveId(id)
        // 新内容渲染后再做进场动画
        requestAnimationFrame(() => {
          gsap.fromTo(el,
            { opacity: 0, y: 18, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'expo.out',
              onComplete: () => {
                const nextId = pendingIdRef.current
                pendingIdRef.current = null
                isAnimatingRef.current = false
                // 如果切换期间又有新请求，立即执行最后一个目标
                if (nextId && nextId !== id) {
                  switchTo(nextId)
                }
              }
            }
          )
        })
      }
    })

    tl.to(el, {
      opacity: 0,
      y: -12,
      filter: 'blur(3px)',
      duration: 0.18,
      ease: 'power2.in'
    })
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    animRef.current = sectionReveal(sectionRef.current, {
      labelSel: '.section-label',
      titleSel: '.section-title',
      descSel: '.section-desc',
      contentSel: '.vp-layout',
      imgSel: '.micro-film-viewer, .vp-card-image, .vp-card-ip',
    })
    return () => {
      if (animRef.current) animRef.current.kill()
    }
  }, [])

  const active = categories.find((c) => c.id === activeId) || categories[0]
  const isMicroFilm = activeId === 'micro-film'
  const isDocumentary = activeId === 'documentary'
  const isMV = activeId === 'mv'
  const isCommercial = activeId === 'commercial'
  const isIP = activeId === 'ip'

  return (
    <section className="video-projects" id="video" ref={sectionRef}>
      <div className="molten-bg">
        <MoltenMetal
          color1="#0a1a0b"
          color2="#b8ff3a"
          color3="#FFFFFF"
          speed={0.18}
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
        <div className="vp-header">
          <div className="section-label">VIDEO WORKS</div>
          <h2 className="section-title">视频作品</h2>
          <p className="section-desc">
            从商业品牌到人文纪实，每一部作品都承载着对影像叙事的深度理解。
          </p>
        </div>

        <div className="vp-layout">
          {/* ===== 左侧导航 ===== */}
          <nav className="vp-nav">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                className={`vp-nav-item ${activeId === cat.id ? 'active' : ''}`}
                onMouseEnter={() => switchTo(cat.id)}
                onFocus={() => switchTo(cat.id)}
                onClick={() => switchTo(cat.id)}
              >
                <span className="vp-nav-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="vp-nav-text">
                  <span className="vp-nav-label">{cat.label}</span>
                  <span className="vp-nav-en">{cat.en}</span>
                </span>
                <span className="vp-nav-arrow">→</span>
              </button>
            ))}
          </nav>

          {/* ===== 右侧内容区 ===== */}
          <div className="vp-content" ref={contentRef}>
            {isMicroFilm ? (
              <MicroFilmViewer />
            ) : isDocumentary ? (
              <DocumentaryViewer />
            ) : isMV ? (
              <MVViewer />
            ) : isCommercial ? (
              <CommercialViewer />
            ) : isIP ? (
              <IPViewer />
            ) : (
              <>
                <div className="vp-content-head" key={active.id}>
                  <div className="vp-content-title-group">
                    <h3 className="vp-content-title">{active.label}</h3>
                    <span className="vp-content-en">{active.en}</span>
                  </div>
                  <p className="vp-content-desc">{active.desc}</p>
                </div>

                <div className="vp-grid" key={`${active.id}-grid`}>
                  {[0, 1, 2, 3].map((n) => (
                    <div className="vp-card vp-card-placeholder visible" key={n}>
                      <div className="vp-card-image vp-card-image-empty">
                        <div className="vp-card-play">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </div>
                        <div className="vp-card-overlay"></div>
                      </div>
                      <div className="vp-card-info">
                        <div className="vp-card-meta">
                          <span className="vp-card-category">{active.label}</span>
                          <span className="vp-card-id">/{String(n + 1).padStart(2, '0')}</span>
                        </div>
                        <h3 className="vp-card-title vp-card-title-empty">
                          {n === 0 ? `${active.label}作品整理中` : '待补充'}
                        </h3>
                        <p className="vp-card-desc">作品信息整理后将在此展示</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
