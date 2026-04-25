import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5017/api/estudiantes'

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '',
    telefono: '', fechaNacimiento: '', nivelHabilidad: 'Principiante', biografia: ''
  })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const res = await axios.get(API)
      setEstudiantes(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function guardar() {
    try {
      if (editando) {
        await axios.put(`${API}/${editando}`, form)
      } else {
        await axios.post(API, form)
      }
      setShowForm(false)
      setEditando(null)
      setForm({ nombre: '', apellido: '', email: '', telefono: '', fechaNacimiento: '', nivelHabilidad: 'Principiante', biografia: '' })
      cargar()
    } catch (e) {
      console.error(e)
    }
  }

  async function eliminar(id) {
    if (!window.confirm('Eliminar estudiante?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  function editar(e) {
    setEditando(e.id)
    setForm({
      nombre: e.nombre || '', apellido: e.apellido || '', email: e.email || '',
      telefono: e.telefono || '', fechaNacimiento: '', nivelHabilidad: e.nivelHabilidad || 'Principiante', biografia: e.biografia || ''
    })
    setShowForm(true)
  }

  const inputStyle = {
    width: '100%', padding: '0.6rem', border: '1px solid #e0d5c5',
    borderRadius: '6px', fontSize: '0.95rem', marginBottom: '0.8rem'
  }

  const btnStyle = (color) => ({
    padding: '0.5rem 1rem', backgroundColor: color,
    color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem'
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#8B4513' }}>Estudiantes</h2>
        <button style={btnStyle('#8B4513')} onClick={() => { setShowForm(true); setEditando(null) }}>
          + Nuevo Estudiante
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#8B4513' }}>{editando ? 'Editar' : 'Nuevo'} Estudiante</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <input style={inputStyle} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
            <input style={inputStyle} placeholder="Apellido" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} />
            <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input style={inputStyle} placeholder="Telefono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
            <input style={inputStyle} type="date" value={form.fechaNacimiento} onChange={e => setForm({...form, fechaNacimiento: e.target.value})} />
            <select style={inputStyle} value={form.nivelHabilidad} onChange={e => setForm({...form, nivelHabilidad: e.target.value})}>
              <option>Principiante</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
            </select>
          </div>
          <input style={inputStyle} placeholder="Biografia (opcional)" value={form.biografia} onChange={e => setForm({...form, biografia: e.target.value})} />
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button style={btnStyle('#8B4513')} onClick={guardar}>Guardar</button>
            <button style={btnStyle('#6c757d')} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {estudiantes.length === 0 && <p style={{ color: '#6c757d' }}>No hay estudiantes registrados.</p>}
          {estudiantes.map(function(e) {
            return (
              <div key={e.id} style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#8B4513', marginBottom: '0.2rem' }}>{e.nombre} {e.apellido}</h3>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{e.email} | {e.nivelHabilidad} | {e.matricula}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={btnStyle('#4A708B')} onClick={() => editar(e)}>Editar</button>
                  <button style={btnStyle('#c0392b')} onClick={() => eliminar(e.id)}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Estudiantes