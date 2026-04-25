import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, Edit2, Trash2, X, Save, UserPlus } from 'lucide-react'

const API = 'http://localhost:5017/api/sesiones'

function Sesiones() {
  const [sesiones, setSesiones] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ titulo: '', descripcion: '', tema: '', fecha: '', duracionMinutos: 120, modalidad: 'Presencial', maxEstudiantes: 15, materiales: '' })

  useEffect(() => { cargar() }, [])

  async function cargar() {
    try {
      const res = await axios.get(API)
      setSesiones(res.data)
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

  const inputStyle = { width: '100%', padding: '0.7rem', border: '1px solid #e0d5c5', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '0.8rem', backgroundColor: '#faf9f6' }
  const modalidadColor = { 'Presencial': '#556B2F', 'Virtual': '#4A708B' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Calendar size={28} color="#4A708B" />
          <h2 style={{ color: '#4A708B', fontSize: '1.8rem', fontWeight: '700' }}>Sesiones</h2>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '0.6rem 1.2rem', backgroundColor: '#4A708B', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          onClick={() => { setShowForm(true); setEditando(null) }}>
          <Plus size={18} /> Nueva Sesion
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
              <h3 style={{ color: '#4A708B', fontSize: '1.2rem', fontWeight: '600' }}>{editando ? 'Editar' : 'Nueva'} Sesion</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d' }}><X size={20} /></button>
            </div>
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
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#4A708B', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
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
          {sesiones.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d', backgroundColor: '#fff', borderRadius: '12px' }}>
              <Calendar size={48} color="#e0d5c5" style={{ marginBottom: '1rem' }} />
              <p>No hay sesiones registradas.</p>
            </div>
          )}
          <AnimatePresence>
            {sesiones.map(function(s, i) {
              return (
                <motion.div key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                  style={{ backgroundColor: '#fff', padding: '1.2rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #4A708B' }}
                >
                  <div>
                    <h3 style={{ color: '#2c2c2c', marginBottom: '0.3rem', fontWeight: '600' }}>{s.titulo}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{s.tema} | {new Date(s.fecha).toLocaleDateString()} | {s.duracionMinutos} min</p>
                      <span style={{ backgroundColor: modalidadColor[s.modalidad] || '#6c757d', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' }}>{s.modalidad}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0f4f0', color: '#556B2F', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => inscribir(s.id)}><UserPlus size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0ece6', color: '#4A708B', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => editar(s)}><Edit2 size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#fdf0f0', color: '#c0392b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => eliminar(s.id)}><Trash2 size={16} />
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

export default Sesiones