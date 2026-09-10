import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import VideoProjects from './components/VideoProjects'
import PhotoProjects from './components/PhotoProjects'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <VideoProjects />
      <PhotoProjects />
      <Footer />
    </div>
  )
}

export default App
