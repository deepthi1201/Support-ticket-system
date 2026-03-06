import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Ticket } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  return (
    <nav style={{
      background: 'rgba(15,15,26,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ticket size={18} color="white" />
        </div>
        <span style={{ color: 'white', fontWeight: '700', fontSize: '17px' }}>SupportDesk</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: '#d1d5db', fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </nav>
  )
}