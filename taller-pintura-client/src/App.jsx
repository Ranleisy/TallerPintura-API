import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Estudiantes from './pages/Estudiantes'
import Obras from './pages/Obras'
import Sesiones from './pages/Sesiones'
import Exposiciones from './pages/Exposiciones'
import Home from './pages/Home'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/sesiones" element={<Sesiones />} />
          <Route path="/exposiciones" element={<Exposiciones />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App