import { Trash2, CheckCircle, Clock, Calendar } from 'lucide-react'

export default function TicketCard({ ticket, onDelete, onStatusChange }) {
  const isOpen = ticket.status === 'OPEN'

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
      border: `1px solid ${isOpen ? 'rgba(99,102,241,0.3)' : 'rgba(107,114,128,0.2)'}`,
      padding: '20px', transition: 'all 0.2s', cursor: 'default'
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
      onMouseLeave={e => e.currentTarget.style.borderColor = isOpen ? 'rgba(99,102,241,0.3)' : 'rgba(107,114,128,0.2)'}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
        <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px', margin: 0, lineHeight: '1.4' }}>
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

      {/* Description */}
      <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px',
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {ticket.description}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6b7280', fontSize: '12px' }}>
          <Calendar size={12} />
          {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onStatusChange(ticket.id, isOpen ? 'CLOSED' : 'OPEN')}
            style={{
              padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none',
              background: isOpen ? 'rgba(249,115,22,0.15)' : 'rgba(34,197,94,0.15)',
              color: isOpen ? '#fb923c' : '#4ade80'
            }}>
            {isOpen ? 'Close' : 'Reopen'}
          </button>
          <button onClick={() => onDelete(ticket.id)}
            style={{ padding: '5px 8px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center' }}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}