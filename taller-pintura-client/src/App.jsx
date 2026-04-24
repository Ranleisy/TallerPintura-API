import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Estudiantes from './pages/Estudiantes'
import Obras from './pages/Obras'
import Sesiones from './pages/Sesiones'
import Exposiciones from './pages/Exposiciones'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/sesiones" element={<Sesiones />} />
          <Route path="/exposiciones" element={<Exposiciones />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App