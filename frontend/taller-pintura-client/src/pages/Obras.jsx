import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Plus, Edit2, Trash2, X, Save } from 'lucide-react'

const API = 'http://localhost:5017/api/obras'
const API_EST = 'http://localhost:5017/api/estudiantes'

const tecnicas = ['Oleo', 'Acuarela', 'Acrilico', 'Gouache', 'Pastel', 'Carboncillo', 'Mixta']

function Obras() {
  const [obras, setObras] = useState([])
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ titulo: '', descripcion: '', tecnica: '', dimensiones: '', estudianteId: '', precioEstimado: '' })

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

  const estadoColor = { 'En Proceso': '#4A708B', 'Terminada': '#556B2F', 'Exhibida': '#8B6914' }
  const inputStyle = { width: '100%', padding: '0.7rem', border: '1px solid #e0d5c5', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '0.8rem', backgroundColor: '#faf9f6' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Palette size={28} color="#556B2F" />
          <h2 style={{ color: '#556B2F', fontSize: '1.8rem', fontWeight: '700' }}>Obras</h2>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '0.6rem 1.2rem', backgroundColor: '#556B2F', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          onClick={() => { setShowForm(true); setEditando(null) }}>
          <Plus size={18} /> Nueva Obra
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
              <h3 style={{ color: '#556B2F', fontSize: '1.2rem', fontWeight: '600' }}>{editando ? 'Editar' : 'Nueva'} Obra</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d' }}><X size={20} /></button>
            </div>
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
              <input style={inputStyle} placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '0.6rem 1.4rem', backgroundColor: '#556B2F', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
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
          {obras.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d', backgroundColor: '#fff', borderRadius: '12px' }}>
              <Palette size={48} color="#e0d5c5" style={{ marginBottom: '1rem' }} />
              <p>No hay obras registradas.</p>
            </div>
          )}
          <AnimatePresence>
            {obras.map(function(o, i) {
              return (
                <motion.div key={o.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                  style={{ backgroundColor: '#fff', padding: '1.2rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #556B2F' }}
                >
                  <div>
                    <h3 style={{ color: '#2c2c2c', marginBottom: '0.3rem', fontWeight: '600' }}>{o.titulo}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{o.tecnica} | {o.dimensiones}</p>
                      <span style={{ backgroundColor: estadoColor[o.estado] || '#6c757d', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' }}>{o.estado}</span>
                      {o.precioEstimado && <p style={{ color: '#556B2F', fontSize: '0.85rem', fontWeight: '600' }}>${o.precioEstimado}</p>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#f0ece6', color: '#4A708B', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => editar(o)}><Edit2 size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ padding: '0.5rem', backgroundColor: '#fdf0f0', color: '#c0392b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => eliminar(o.id)}><Trash2 size={16} />
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

export default Obras