const BACKEND_URL = 'https://support-ticket-system-2-bpdt.onrender.com'

export const startKeepAlive = () => {
  // Ping every 10 minutes to keep server awake
  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/`)
      console.log('🏓 Server pinged')
    } catch (e) {
      console.log('Ping failed')
    }
  }, 10 * 60 * 1000)
}