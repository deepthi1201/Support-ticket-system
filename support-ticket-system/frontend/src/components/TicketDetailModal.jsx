import { X, Clock, CheckCircle, Calendar, User, Trash2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function TicketDetailModal({ ticket, onClose, onDelete, onStatusChange }) {
  const { isDark } = useTheme()
  const isOpen = ticket.status === 'OPEN'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)'
    }} onClick={onClose}>

      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '560px',
        background: isDark ? '#1a1a2e' : 'white',
        borderRadius: '24px',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)'
      }}>

        {/* Top color bar */}
        <div style={{
          height: '6px',
          background: isOpen
            ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
            : 'linear-gradient(90deg, #6b7280, #9ca3af)'
        }} />

        {/* Header */}
        <div style={{
          padding: '24px 24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div style={{ flex: 1, marginRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '5px',
                background: isOpen ? 'rgba(34,197,94,0.15)' : 'rgba(107,114,128,0.15)',
                color: isOpen ? '#4ade80' : '#9ca3af'
              }}>
                {isOpen ? <Clock size={11} /> : <CheckCircle size={11} />}
                {ticket.status}
              </span>
              <span style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: '12px' }}>
                #{ticket.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <h2 style={{ color: isDark ? 'white' : '#111827', fontSize: '20px', fontWeight: '700', margin: 0, lineHeight: '1.4' }}>
              {ticket.title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: 'none', borderRadius: '10px', padding: '8px',
            cursor: 'pointer', color: isDark ? '#9ca3af' : '#6b7280',
            display: 'flex', flexShrink: 0
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>
          {/* Meta info */}
          <div style={{
            display: 'flex', gap: '20px', marginBottom: '20px',
            padding: '14px', borderRadius: '12px',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={14} color="#6366f1" />
              <div>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '11px', margin: 0 }}>Created by</p>
                <p style={{ color: isDark ? 'white' : '#111827', fontSize: '13px', fontWeight: '600', margin: 0 }}>
                  {ticket.user?.name || 'You'}
                </p>
              </div>
            </div>
            <div style={{ width: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={14} color="#6366f1" />
              <div>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '11px', margin: 0 }}>Created on</p>
                <p style={{ color: isDark ? 'white' : '#111827', fontSize: '13px', fontWeight: '600', margin: 0 }}>
                  {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Description
            </p>
            <div style={{
              padding: '16px', borderRadius: '12px',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              borderLeft: '3px solid #6366f1'
            }}>
              <p style={{ color: isDark ? '#d1d5db' : '#374151', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { onStatusChange(ticket.id, isOpen ? 'CLOSED' : 'OPEN'); onClose() }}
              style={{
                flex: 1, padding: '11px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: '600',
                background: isOpen
                  ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                  : 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}>
              {isOpen ? <><Clock size={15} /> Close Ticket</> : <><CheckCircle size={15} /> Reopen Ticket</>}
            </button>

            <button onClick={() => { onDelete(ticket.id); onClose() }}
              style={{
                padding: '11px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'rgba(239,68,68,0.15)', color: '#f87171',
                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600'
              }}>
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}