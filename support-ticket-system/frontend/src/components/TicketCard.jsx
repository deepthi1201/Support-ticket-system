import { Trash2, CheckCircle, Clock, Calendar } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function TicketCard({ ticket, onDelete, onStatusChange, onClick }) {
  const isOpen = ticket.status === 'OPEN'
  const { isDark } = useTheme()

  return (
    <div
      onClick={onClick}
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
        borderRadius: '16px',
        border: `1px solid ${isOpen ? 'rgba(99,102,241,0.3)' : isDark ? 'rgba(107,114,128,0.2)' : 'rgba(0,0,0,0.08)'}`,
        padding: '20px', transition: 'all 0.2s', cursor: 'pointer',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#6366f1'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isOpen ? 'rgba(99,102,241,0.3)' : isDark ? 'rgba(107,114,128,0.2)' : 'rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
        <h3 style={{ color: isDark ? 'white' : '#111827', fontWeight: '600', fontSize: '15px', margin: 0, lineHeight: '1.4' }}>
          {ticket.title}
        </h3>
        <span style={{
          padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
          background: isOpen ? 'rgba(34,197,94,0.15)' : 'rgba(107,114,128,0.15)',
          color: isOpen ? '#4ade80' : '#9ca3af'
        }}>
          {isOpen ? <Clock size={10} /> : <CheckCircle size={10} />}
          {ticket.status}
        </span>
      </div>

      <p style={{
        color: isDark ? '#9ca3af' : '#6b7280', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px',
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
      }}>
        {ticket.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: isDark ? '#6b7280' : '#9ca3af', fontSize: '12px' }}>
          <Calendar size={12} />
          {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={e => { e.stopPropagation(); onStatusChange(ticket.id, isOpen ? 'CLOSED' : 'OPEN') }}
            style={{
              padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none',
              background: isOpen ? 'rgba(249,115,22,0.15)' : 'rgba(34,197,94,0.15)',
              color: isOpen ? '#fb923c' : '#4ade80'
            }}>
            {isOpen ? 'Close' : 'Reopen'}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(ticket.id) }}
            style={{ padding: '5px 8px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center' }}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}