import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Plus, Edit2, Trash2, X, Save, ImagePlus } from 'lucide-react'

const API = 'http://localhost:5017/api/exposiciones'

function Exposiciones() {
  const [exposiciones, setExposiciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '', lugar: '', fechaInicio: '', fechaFin: '', esPublica: true })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const res = await axios.get(API)
      setExposiciones(res.data)
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
    setForm({ nombre: ex.nombre, descripcion: ex.descripcion, lugar: ex.lugar, fechaInicio: ex.fechaInicio?.split('T')[0] || '', fechaFin: ex.fechaFin?.split('T')[0] || '', esPublica: ex.esPublica })
    setShowForm(true)
  }

  const inputStyle = { width: '100%', padding: '0.7rem', border: '1px solid #e0d5c5', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '0.8rem', backgroundColor: '#faf9f6' }
  const estadoColor = { 'Planificada': '#8B6914', 'En Curso': '#556B2F', 'Finalizada': '#6c757d', 'Cancelada': '#c0392b' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Building2 size={28} color="#8B6914" />
          <h2 style={{ color: '#8B6914', fontSize: '1.8rem', fontWeight: '700' }}>Exposiciones</h2>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '0.6rem 1.2rem', backgroundColor: '#8B6914', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          onClick={() => { setShowForm(true); setEditando(null) }}>
          <Plus size={18} /> Nueva Exposicion
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', marginBottom: '1.5rem', border: '1px solid #e0d5c5' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ color: '#8B6914', fontSize: '1.2rem', fontWeight: '600' }}>{editando ? 'Editar' : 'Nueva'} Exposicion</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
              <input style={inputStyle} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
              <input style={inputStyle} placeholder="Lugar" value={form.lugar} onChange={e => setForm({...form, lugar: e.target.value})} />
              <input style={inputStyle} type="date" value={form.fechaInicio} onChange={e => setForm({...form, fechaInicio: e.target.value})} />
              <input style={inputStyle} type="date" value={form.fechaFin} onChange={e => setForm({...form, fechaFin: e.target.value})} />
            </div>
            <input style={inputStyle} placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.esPublica} onChange={e => setForm({...form, esPublica: e.target.checked})} />
              Exposicion publica
            </label>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#8B6914', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
                onClick={guardar}><Save size={16} /> Guardar
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#f0ece6', color: '#6c757d', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setShowForm(false)}><X size={16} /> Cancelar
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>Cargando...</div>
      ) : (
        <motion.div style={{ display: 'grid', gap: '0.8rem' }}>
          {exposiciones.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d', backgroundColor: '#fff', borderRadius: '12px' }}>
              <Building2 size={48} color="#e0d5c5" style={{ marginBottom: '1rem' }} />
              <p>No hay exposiciones registradas.</p>
            </div>
          )}
          <AnimatePresence>
            {exposiciones.map(function(ex, i) {
              return (
                <motion.div key={ex.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                  style={{ backgroundColor: '#fff', padding: '1.2rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #8B6914' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <h3 style={{ color: '#2c2c2c', fontWeight: '600' }}>{ex.nombre}</h3>
                      <span style={{ backgroundColor: estadoColor[ex.estado] || '#6c757d', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' }}>{ex.estado}</span>
                    </div>
                    <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{ex.lugar} | {new Date(ex.fechaInicio).toLocaleDateString()} → {new Date(ex.fechaFin).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0f4f0', color: '#556B2F', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => agregarObra(ex.id)}><ImagePlus size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0ece6', color: '#4A708B', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => editar(ex)}><Edit2 size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#fdf0f0', color: '#c0392b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => eliminar(ex.id)}><Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default Exposiciones