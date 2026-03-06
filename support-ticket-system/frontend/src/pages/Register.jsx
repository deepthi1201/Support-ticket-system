import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, User, Ticket } from 'lucide-react'

const inputStyle = {
  width: '100%',
  padding: '12px 12px 12px 42px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  outline: 'none',
  fontSize: '14px',
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      login(data.user, data.token)
      toast.success(`Welcome, ${data.user.name}! 🎉`)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '20px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent)', filter: 'blur(80px)' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ticket size={30} color="white" />
          </div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', margin: 0 }}>Create account</h1>
          <p style={{ color: '#9ca3af', marginTop: '8px', fontSize: '14px' }}>Start managing your support tickets</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)', padding: '36px', backdropFilter: 'blur(10px)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" placeholder="John Doe" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} required
                  style={{ ...inputStyle, paddingRight: '42px' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white',
              fontSize: '15px', fontWeight: '600', opacity: loading ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              {loading ? <><div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Creating...</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '24px', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}