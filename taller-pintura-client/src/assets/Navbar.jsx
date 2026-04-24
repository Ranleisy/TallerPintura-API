import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/estudiantes', label: 'Estudiantes' },
    { path: '/obras', label: 'Obras' },
    { path: '/sesiones', label: 'Sesiones' },
    { path: '/exposiciones', label: 'Exposiciones' },
  ]

  return (
    <nav style={{
      backgroundColor: 'var(--primary)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <h1 style={{ color: 'var(--white)', fontSize: '1.3rem', fontWeight: '600' }}>
        Taller de Pintura Artistica
      </h1>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? 'var(--secondary)' : 'var(--white)',
              textDecoration: 'none',
              fontWeight: location.pathname === link.path ? '600' : '400',
              borderBottom: location.pathname === link.path ? '2px solid var(--secondary)' : 'none',
              paddingBottom: '2px'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar