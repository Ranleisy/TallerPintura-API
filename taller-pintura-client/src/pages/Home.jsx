import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const cards = [
    { title: 'Estudiantes', desc: 'Gestiona los alumnos del taller', path: '/estudiantes', color: '#8B4513' },
    { title: 'Obras', desc: 'Administra las pinturas creadas', path: '/obras', color: '#556B2F' },
    { title: 'Sesiones', desc: 'Organiza las clases del taller', path: '/sesiones', color: '#4A708B' },
    { title: 'Exposiciones', desc: 'Gestiona las exposiciones de arte', path: '/exposiciones', color: '#8B6914' },
  ]

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#8B4513', marginBottom: '0.5rem' }}>
          Gestor de Taller de Pintura
        </h1>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Sistema de gestion para cursos, obras y exposiciones artisticas
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {cards.map(function(card) {
          return (
            <div
              key={card.title}
              onClick={function() { navigate(card.path) }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                borderTop: '4px solid ' + card.color,
                cursor: 'pointer',
              }}
            >
              <h2 style={{ color: card.color, marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ color: '#6c757d' }}>{card.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home