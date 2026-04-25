import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5017/api/sesiones'
const API_EST = 'http://localhost:5017/api/estudiantes'

function Sesiones() {
  const [sesiones, setSesiones] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    titulo: '', descripcion: '', tema: '',
    fecha: '', duracionMinutos: 120, modalidad: 'Presencial',
    maxEstudiantes: 15, materiales: ''
  })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const [s, e] = await Promise.all([axios.get(API), axios.get(API_EST)])
      setSesiones(s.data)
      setEstudiantes(e.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function guardar() {
    try {
      if (editando) {
        await axios.put(`${API}/${editando}`, form)
      } else {
        await axios.post(API, { ...form, duracionMinutos: parseInt(form.duracionMinutos), maxEstudiantes: parseInt(form.maxEstudiantes) })
      }
      setShowForm(false)
      setEditando(null)
      setForm({ titulo: '', descripcion: '', tema: '', fecha: '', duracionMinutos: 120, modalidad: 'Presencial', maxEstudiantes: 15, materiales: '' })
      cargar()
    } catch (e) { console.error(e) }
  }

  async function eliminar(id) {
    if (!window.confirm('Eliminar sesion?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  async function inscribir(sesionId) {
    const id = prompt('ID del estudiante a inscribir:')
    if (!id) return
    await axios.post(`${API}/${sesionId}/inscribir/${id}`)
    alert('Estudiante inscrito!')
  }

  function editar(s) {
    setEditando(s.id)
    setForm({ titulo: s.titulo, descripcion: s.descripcion, tema: s.tema, fecha: s.fecha?.split('T')[0] || '', duracionMinutos: s.duracionMinutos, modalidad: s.modalidad, maxEstudiantes: s.maxEstudiantes, materiales: s.materiales || '' })
    setShowForm(true)
  }

  const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #e0d5c5', borderRadius: '6px', fontSize: '0.95rem', marginBottom: '0.8rem' }
  const btnStyle = (color) => ({ padding: '0.5rem 1rem', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#4A708B' }}>Sesiones</h2>
        <button style={btnStyle('#4A708B')} onClick={() => { setShowForm(true); setEditando(null) }}>+ Nueva Sesion</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#4A708B' }}>{editando ? 'Editar' : 'Nueva'} Sesion</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <input style={inputStyle} placeholder="Titulo" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
            <input style={inputStyle} placeholder="Tema" value={form.tema} onChange={e => setForm({...form, tema: e.target.value})} />
            <input style={inputStyle} type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />
            <input style={inputStyle} placeholder="Duracion (minutos)" type="number" value={form.duracionMinutos} onChange={e => setForm({...form, duracionMinutos: e.target.value})} />
            <select style={inputStyle} value={form.modalidad} onChange={e => setForm({...form, modalidad: e.target.value})}>
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
            <input style={inputStyle} placeholder="Max estudiantes" type="number" value={form.maxEstudiantes} onChange={e => setForm({...form, maxEstudiantes: e.target.value})} />
          </div>
          <input style={inputStyle} placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
          <input style={inputStyle} placeholder="Materiales requeridos" value={form.materiales} onChange={e => setForm({...form, materiales: e.target.value})} />
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button style={btnStyle('#4A708B')} onClick={guardar}>Guardar</button>
            <button style={btnStyle('#6c757d')} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {sesiones.length === 0 && <p style={{ color: '#6c757d' }}>No hay sesiones registradas.</p>}
          {sesiones.map(function(s) {
            return (
              <div key={s.id} style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#4A708B', marginBottom: '0.2rem' }}>{s.titulo}</h3>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{s.tema} | {new Date(s.fecha).toLocaleDateString()} | {s.modalidad} | {s.duracionMinutos} min</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={btnStyle('#556B2F')} onClick={() => inscribir(s.id)}>Inscribir</button>
                  <button style={btnStyle('#4A708B')} onClick={() => editar(s)}>Editar</button>
                  <button style={btnStyle('#c0392b')} onClick={() => eliminar(s.id)}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Sesiones