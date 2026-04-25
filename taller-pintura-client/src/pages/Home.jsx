import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Users, Palette, Calendar, Building2, TrendingUp } from 'lucide-react'

const cards = [
  { title: 'Estudiantes', desc: 'Gestiona los alumnos del taller', path: '/estudiantes', icon: Users, color: '#8B4513', bg: 'linear-gradient(135deg, #8B4513, #D2691E)' },
  { title: 'Obras', desc: 'Administra las pinturas creadas', path: '/obras', icon: Palette, color: '#556B2F', bg: 'linear-gradient(135deg, #556B2F, #6B8E23)' },
  { title: 'Sesiones', desc: 'Organiza las clases del taller', path: '/sesiones', icon: Calendar, color: '#4A708B', bg: 'linear-gradient(135deg, #4A708B, #5F9EA0)' },
  { title: 'Exposiciones', desc: 'Gestiona las exposiciones de arte', path: '/exposiciones', icon: Building2, color: '#8B6914', bg: 'linear-gradient(135deg, #8B6914, #DAA520)' },
]

function StatCard({ label, value, icon: Icon, color, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), delay) }, [])
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '1.2rem',
      textAlign: 'center',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease',
      borderTop: `3px solid ${color}`
    }}>
      <Icon size={28} color={color} style={{ marginBottom: '0.5rem' }} />
      <div style={{ fontSize: '1.8rem', fontWeight: '700', color: color }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{label}</div>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ estudiantes: 0, obras: 0, sesiones: 0, exposiciones: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    async function cargarStats() {
      try {
        const [e, o, s, ex] = await Promise.all([
          axios.get('http://localhost:5017/api/estudiantes'),
          axios.get('http://localhost:5017/api/obras'),
          axios.get('http://localhost:5017/api/sesiones'),
          axios.get('http://localhost:5017/api/exposiciones'),
        ])
        setStats({ estudiantes: e.data.length, obras: o.data.length, sesiones: s.data.length, exposiciones: ex.data.length })
      } catch (e) { console.error(e) }
    }
    cargarStats()
  }, [])

  return (
    <div>
      <div style={{
        textAlign: 'center',
        padding: '3rem 0 2rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.6s ease'
      }}>
        <Palette size={52} color="#8B4513" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.8rem', color: '#8B4513', marginBottom: '0.5rem', fontWeight: '700' }}>
          Gestor de Taller de Pintura
        </h1>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Sistema de gestion para cursos, obras y exposiciones artisticas
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <StatCard label="Estudiantes" value={stats.estudiantes} icon={Users} color="#8B4513" delay={100} />
        <StatCard label="Obras" value={stats.obras} icon={Palette} color="#556B2F" delay={200} />
        <StatCard label="Sesiones" value={stats.sesiones} icon={Calendar} color="#4A708B" delay={300} />
        <StatCard label="Exposiciones" value={stats.exposiciones} icon={Building2} color="#8B6914" delay={400} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {cards.map(function(card, i) {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              onClick={function() { navigate(card.path) }}
              style={{
                background: card.bg,
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                color: '#fff',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease ${i * 0.1 + 0.3}s`,
              }}
              onMouseEnter={function(e) {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={function(e) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
              }}
            >
              <Icon size={36} color="rgba(255,255,255,0.9)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: '700' }}>{card.title}</h2>
              <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>{card.desc}</p>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <TrendingUp size={14} /> Ver todos
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home