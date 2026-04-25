import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Edit2, Trash2, X, Save } from 'lucide-react'

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
      setForm({ nombre: '', apellido: '', email: '', telefono: '', fechaNacimiento: '', nivelHabilidad: 'Principiante', biografia: '' })
      cargar()
    } catch (e) { console.error(e) }
  }

  async function eliminar(id) {
    if (!window.confirm('Eliminar estudiante?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  function editar(e) {
    setEditando(e.id)
    setForm({ nombre: e.nombre || '', apellido: e.apellido || '', email: e.email || '', telefono: e.telefono || '', fechaNacimiento: '', nivelHabilidad: e.nivelHabilidad || 'Principiante', biografia: e.biografia || '' })
    setShowForm(true)
  }

  const nivelColor = { 'Principiante': '#4A708B', 'Intermedio': '#8B6914', 'Avanzado': '#556B2F' }

  const inputStyle = { width: '100%', padding: '0.7rem', border: '1px solid #e0d5c5', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '0.8rem', backgroundColor: '#faf9f6' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Users size={28} color="#8B4513" />
          <h2 style={{ color: '#8B4513', fontSize: '1.8rem', fontWeight: '700' }}>Estudiantes</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '0.6rem 1.2rem', backgroundColor: '#8B4513', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          onClick={() => { setShowForm(true); setEditando(null) }}
        >
          <Plus size={18} /> Nuevo Estudiante
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
              <h3 style={{ color: '#8B4513', fontSize: '1.2rem', fontWeight: '600' }}>{editando ? 'Editar' : 'Nuevo'} Estudiante</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d' }}>
                <X size={20} />
              </button>
            </div>
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
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#8B4513', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
                onClick={guardar}>
                <Save size={16} /> Guardar
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#f0ece6', color: '#6c757d', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setShowForm(false)}>
                <X size={16} /> Cancelar
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>Cargando...</div>
      ) : (
        <motion.div style={{ display: 'grid', gap: '0.8rem' }}>
          {estudiantes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d', backgroundColor: '#fff', borderRadius: '12px' }}>
              <Users size={48} color="#e0d5c5" style={{ marginBottom: '1rem' }} />
              <p>No hay estudiantes registrados.</p>
            </div>
          )}
          <AnimatePresence>
            {estudiantes.map(function(e, i) {
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                  style={{ backgroundColor: '#fff', padding: '1.2rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #8B4513' }}
                >
                  <div>
                    <h3 style={{ color: '#2c2c2c', marginBottom: '0.3rem', fontWeight: '600' }}>{e.nombre} {e.apellido}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{e.email}</p>
                      <span style={{ backgroundColor: nivelColor[e.nivelHabilidad] || '#6c757d', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' }}>{e.nivelHabilidad}</span>
                      <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{e.matricula}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0ece6', color: '#4A708B', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => editar(e)}>
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#fdf0f0', color: '#c0392b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => eliminar(e.id)}>
                      <Trash2 size={16} />
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

export default Estudiantes