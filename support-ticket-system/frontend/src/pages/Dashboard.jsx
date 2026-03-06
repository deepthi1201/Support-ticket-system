import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'
import { Plus, Ticket, CheckCircle, Clock, RefreshCw, Globe } from 'lucide-react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import TicketCard from '../components/TicketCard'
import CreateTicketModal from '../components/CreateTicketModal'
import TicketDetailModal from '../components/TicketDetailModal'

const socket = io('https://support-ticket-system-2-bpdt.onrender.com', {
  transports: ['websocket', 'polling']
})

export default function Dashboard() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [filter, setFilter] = useState('ALL')
  const [weather, setWeather] = useState(null)

  const fetchTickets = async () => {
    try {
      const { data } = await api.get('/tickets')
      setTickets(data.tickets)
    } catch (error) {
      toast.error('Failed to fetch tickets')
    } finally { setLoading(false) }
  }

  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current_weather=true')
      const data = await res.json()
      setWeather(data.current_weather)
    } catch (e) { console.log('weather fail') }
  }

  useEffect(() => {
    fetchTickets()
    fetchWeather()

    socket.on('ticket:created', (ticket) => {
      if (ticket.userId !== user?.id) {
        toast('📩 New ticket created!', { icon: '🎫' })
        setTickets(prev => prev.find(t => t.id === ticket.id) ? prev : [ticket, ...prev])
      }
    })
    socket.on('ticket:updated', (updated) => {
      setTickets(prev => prev.map(t => t.id === updated.id ? updated : t))
      setSelectedTicket(prev => prev?.id === updated.id ? updated : prev)
    })
    socket.on('ticket:deleted', ({ id }) => {
      setTickets(prev => prev.filter(t => t.id !== id))
      setSelectedTicket(prev => prev?.id === id ? null : prev)
    })

    return () => {
      socket.off('ticket:created')
      socket.off('ticket:updated')
      socket.off('ticket:deleted')
    }
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this ticket?')) return
    try {
      await api.delete(`/tickets/${id}`)
      setTickets(prev => prev.filter(t => t.id !== id))
      setSelectedTicket(null)
      toast.success('Ticket deleted')
    } catch { toast.error('Failed to delete') }
  }

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.put(`/tickets/${id}`, { status })
      setTickets(prev => prev.map(t => t.id === id ? data.ticket : t))
      setSelectedTicket(prev => prev?.id === id ? data.ticket : prev)
      toast.success(`Ticket ${status === 'CLOSED' ? 'closed 🔒' : 'reopened ✅'}`)
    } catch { toast.error('Failed to update') }
  }

  const filtered = tickets.filter(t => filter === 'ALL' ? true : t.status === filter)
  const openCount = tickets.filter(t => t.status === 'OPEN').length
  const closedCount = tickets.filter(t => t.status === 'CLOSED').length
  const getWeatherIcon = (code) => code <= 1 ? '☀️' : code <= 3 ? '⛅' : code <= 67 ? '🌧️' : '❄️'
  const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' }

  return (
    <div style={{ minHeight: '100vh', background: isDark
      ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)'
      : 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)'
    }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ color: isDark ? 'white' : '#111827', fontSize: '24px', fontWeight: '700', margin: 0 }}>
              {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p style={{ color: isDark ? '#9ca3af' : '#6b7280', marginTop: '6px', fontSize: '14px' }}>
              Here's what's happening with your tickets
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {weather && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px',
                borderRadius: '10px',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                fontSize: '13px', color: isDark ? '#d1d5db' : '#374151'
              }}>
                <Globe size={14} color="#6366f1" />
                {getWeatherIcon(weather.weathercode)} {Math.round(weather.temperature)}°C · Hyderabad
              </div>
            )}
            <button onClick={fetchTickets} style={{
              padding: '8px', borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              cursor: 'pointer', color: isDark ? '#9ca3af' : '#6b7280', display: 'flex', alignItems: 'center'
            }}>
              <RefreshCw size={16} />
            </button>
            <button onClick={() => setShowModal(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px',
              borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
            }}>
              <Plus size={16} /> New Ticket
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <StatsCard label="Total Tickets" value={tickets.length} icon={Ticket} color="#6366f1" />
          <StatsCard label="Open" value={openCount} icon={Clock} color="#22c55e" />
          <StatsCard label="Closed" value={closedCount} icon={CheckCircle} color="#f59e0b" />
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['ALL', 'OPEN', 'CLOSED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: '500',
              background: filter === f
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: filter === f ? 'white' : isDark ? '#9ca3af' : '#6b7280'
            }}>
              {f} ({f === 'ALL' ? tickets.length : f === 'OPEN' ? openCount : closedCount})
            </button>
          ))}
        </div>

        {/* Tickets */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Ticket size={28} color="#6366f1" />
            </div>
            <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '16px', margin: '0 0 6px' }}>No tickets found</p>
            <p style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: '13px', margin: 0 }}>
              {filter === 'ALL' ? 'Create your first ticket!' : `No ${filter.toLowerCase()} tickets`}
            </p>
            {filter === 'ALL' && (
              <button onClick={() => setShowModal(true)} style={{
                marginTop: '16px', padding: '10px 24px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
              }}>
                Create First Ticket
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {filtered.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onClick={() => setSelectedTicket(ticket)}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CreateTicketModal
          onClose={() => setShowModal(false)}
          onCreated={(t) => setTickets(prev => [t, ...prev])}
        />
      )}

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}