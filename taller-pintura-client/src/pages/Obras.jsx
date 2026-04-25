import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5017/api/obras'
const API_EST = 'http://localhost:5017/api/estudiantes'

function Obras() {
  const [obras, setObras] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    titulo: '', descripcion: '', tecnica: '',
    dimensiones: '', estudianteId: '', precioEstimado: ''
  })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const [o, e] = await Promise.all([axios.get(API), axios.get(API_EST)])
      setObras(o.data)
      setEstudiantes(e.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function guardar() {
    try {
      if (editando) {
        await axios.put(`${API}/${editando}`, form)
      } else {
        await axios.post(API, { ...form, estudianteId: parseInt(form.estudianteId), precioEstimado: parseFloat(form.precioEstimado) || null })
      }
      setShowForm(false)
      setEditando(null)
      setForm({ titulo: '', descripcion: '', tecnica: '', dimensiones: '', estudianteId: '', precioEstimado: '' })
      cargar()
    } catch (e) { console.error(e) }
  }

  async function eliminar(id) {
    if (!window.confirm('Eliminar obra?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  function editar(o) {
    setEditando(o.id)
    setForm({ titulo: o.titulo, descripcion: o.descripcion, tecnica: o.tecnica, dimensiones: o.dimensiones, estudianteId: o.estudianteId, precioEstimado: o.precioEstimado || '' })
    setShowForm(true)
  }

  const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #e0d5c5', borderRadius: '6px', fontSize: '0.95rem', marginBottom: '0.8rem' }
  const btnStyle = (color) => ({ padding: '0.5rem 1rem', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' })

  const tecnicas = ['Oleo', 'Acuarela', 'Acrilico', 'Gouache', 'Pastel', 'Carboncillo', 'Mixta']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#556B2F' }}>Obras</h2>
        <button style={btnStyle('#556B2F')} onClick={() => { setShowForm(true); setEditando(null) }}>+ Nueva Obra</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#556B2F' }}>{editando ? 'Editar' : 'Nueva'} Obra</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <input style={inputStyle} placeholder="Titulo" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
            <select style={inputStyle} value={form.tecnica} onChange={e => setForm({...form, tecnica: e.target.value})}>
              <option value="">Seleccionar tecnica</option>
              {tecnicas.map(t => <option key={t}>{t}</option>)}
            </select>
            <input style={inputStyle} placeholder="Dimensiones (ej: 60x80cm)" value={form.dimensiones} onChange={e => setForm({...form, dimensiones: e.target.value})} />
            <input style={inputStyle} placeholder="Precio estimado" type="number" value={form.precioEstimado} onChange={e => setForm({...form, precioEstimado: e.target.value})} />
            <select style={inputStyle} value={form.estudianteId} onChange={e => setForm({...form, estudianteId: e.target.value})}>
              <option value="">Seleccionar estudiante</option>
              {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>)}
            </select>
          </div>
          <input style={inputStyle} placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button style={btnStyle('#556B2F')} onClick={guardar}>Guardar</button>
            <button style={btnStyle('#6c757d')} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {obras.length === 0 && <p style={{ color: '#6c757d' }}>No hay obras registradas.</p>}
          {obras.map(function(o) {
            return (
              <div key={o.id} style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#556B2F', marginBottom: '0.2rem' }}>{o.titulo}</h3>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{o.tecnica} | {o.dimensiones} | {o.estado} {o.precioEstimado ? '| $' + o.precioEstimado : ''}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={btnStyle('#4A708B')} onClick={() => editar(o)}>Editar</button>
                  <button style={btnStyle('#c0392b')} onClick={() => eliminar(o.id)}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Obras