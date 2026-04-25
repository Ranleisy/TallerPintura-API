import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5017/api/exposiciones'
const API_OBRAS = 'http://localhost:5017/api/obras'

function Exposiciones() {
  const [exposiciones, setExposiciones] = useState([])
  const [obras, setObras] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '', descripcion: '', lugar: '',
    fechaInicio: '', fechaFin: '', esPublica: true
  })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const [ex, ob] = await Promise.all([axios.get(API), axios.get(API_OBRAS)])
      setExposiciones(ex.data)
      setObras(ob.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
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
      setForm({ nombre: '', descripcion: '', lugar: '', fechaInicio: '', fechaFin: '', esPublica: true })
      cargar()
    } catch (e) { console.error(e) }
  }

  async function eliminar(id) {
    if (!window.confirm('Eliminar exposicion?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  async function agregarObra(exposicionId) {
    const id = prompt('ID de la obra a agregar:')
    if (!id) return
    await axios.post(`${API}/${exposicionId}/obras/${id}`)
    alert('Obra agregada!')
  }

  function editar(ex) {
    setEditando(ex.id)
    setForm({
      nombre: ex.nombre, descripcion: ex.descripcion, lugar: ex.lugar,
      fechaInicio: ex.fechaInicio?.split('T')[0] || '',
      fechaFin: ex.fechaFin?.split('T')[0] || '',
      esPublica: ex.esPublica
    })
    setShowForm(true)
  }

  const inputStyle = { width: '100%', padding: '0.6rem', border: '1px solid #e0d5c5', borderRadius: '6px', fontSize: '0.95rem', marginBottom: '0.8rem' }
  const btnStyle = (color) => ({ padding: '0.5rem 1rem', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' })

  const estadoColor = { 'Planificada': '#8B6914', 'En Curso': '#556B2F', 'Finalizada': '#6c757d', 'Cancelada': '#c0392b' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#8B6914' }}>Exposiciones</h2>
        <button style={btnStyle('#8B6914')} onClick={() => { setShowForm(true); setEditando(null) }}>+ Nueva Exposicion</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#8B6914' }}>{editando ? 'Editar' : 'Nueva'} Exposicion</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <input style={inputStyle} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
            <input style={inputStyle} placeholder="Lugar" value={form.lugar} onChange={e => setForm({...form, lugar: e.target.value})} />
            <input style={inputStyle} type="date" placeholder="Fecha inicio" value={form.fechaInicio} onChange={e => setForm({...form, fechaInicio: e.target.value})} />
            <input style={inputStyle} type="date" placeholder="Fecha fin" value={form.fechaFin} onChange={e => setForm({...form, fechaFin: e.target.value})} />
          </div>
          <input style={inputStyle} placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="checkbox" checked={form.esPublica} onChange={e => setForm({...form, esPublica: e.target.checked})} />
            Exposicion publica
          </label>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button style={btnStyle('#8B6914')} onClick={guardar}>Guardar</button>
            <button style={btnStyle('#6c757d')} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {exposiciones.length === 0 && <p style={{ color: '#6c757d' }}>No hay exposiciones registradas.</p>}
          {exposiciones.map(function(ex) {
            return (
              <div key={ex.id} style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.2rem' }}>
                    <h3 style={{ color: '#8B6914' }}>{ex.nombre}</h3>
                    <span style={{ backgroundColor: estadoColor[ex.estado] || '#6c757d', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' }}>{ex.estado}</span>
                  </div>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{ex.lugar} | {new Date(ex.fechaInicio).toLocaleDateString()} → {new Date(ex.fechaFin).toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={btnStyle('#556B2F')} onClick={() => agregarObra(ex.id)}>+ Obra</button>
                  <button style={btnStyle('#4A708B')} onClick={() => editar(ex)}>Editar</button>
                  <button style={btnStyle('#c0392b')} onClick={() => eliminar(ex.id)}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Exposiciones