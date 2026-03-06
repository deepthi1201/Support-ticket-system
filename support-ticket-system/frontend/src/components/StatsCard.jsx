import { useTheme } from '../context/ThemeContext'

export default function StatsCard({ label, value, icon: Icon, color }) {
  const { isDark } = useTheme()
  return (
    <div style={{
      background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
      borderRadius: '16px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      padding: '24px', display: 'flex', alignItems: 'center', gap: '16px',
      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '13px', margin: 0 }}>{label}</p>
        <p style={{ color: isDark ? 'white' : '#111827', fontSize: '26px', fontWeight: '700', margin: '2px 0 0' }}>{value}</p>
      </div>
    </div>
  )
}