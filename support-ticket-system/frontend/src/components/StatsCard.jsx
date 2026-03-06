export default function StatsCard({ label, value, icon: Icon, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)', padding: '24px',
      display: 'flex', alignItems: 'center', gap: '16px'
    }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>{label}</p>
        <p style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '2px 0 0' }}>{value}</p>
      </div>
    </div>
  )
}