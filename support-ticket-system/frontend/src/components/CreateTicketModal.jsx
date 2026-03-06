import { useState } from 'react'
import { X, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function CreateTicketModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/tickets', form)
      toast.success('Ticket created! 📧 Email sent!')
      onCreated(data.ticket)
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create ticket')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
      <div style={{ width: '100%', maxWidth: '500px', background: '#1a1a2e', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', padding: '28px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0 }}>Create New Ticket</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Title</label>
            <input type="text" placeholder="Brief summary of the issue..." value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required
              style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Description</label>
            <textarea placeholder="Describe your issue in detail..." value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontSize: '14px', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
              {loading ? <div style={{ width: '15px', height: '15px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <><Send size={14} /> Submit Ticket</>}
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}