import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Palette, Calendar, Building2 } from 'lucide-react'

const links = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/estudiantes', label: 'Estudiantes', icon: Users },
  { path: '/obras', label: 'Obras', icon: Palette },
  { path: '/sesiones', label: 'Sesiones', icon: Calendar },
  { path: '/exposiciones', label: 'Exposiciones', icon: Building2 },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #6B3410 0%, #8B4513 50%, #A0522D 100%)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(139,69,19,0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '65px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <Palette size={28} color="#F5DEB3" />
        <div>
          <h1 style={{ color: '#F5DEB3', fontSize: '1.1rem', fontWeight: '700', lineHeight: 1 }}>
            Taller de Pintura
          </h1>
          <p style={{ color: 'rgba(245,222,179,0.7)', fontSize: '0.7rem' }}>Gestor Artistico</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.3rem' }}>
        {links.map(function(link) {
          const active = location.pathname === link.path
          const Icon = link.icon
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: active ? '#6B3410' : 'rgba(245,222,179,0.9)',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: active ? '600' : '400',
                backgroundColor: active ? '#F5DEB3' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar