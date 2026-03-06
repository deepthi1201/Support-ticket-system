import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/auth.routes.js'
import ticketRoutes from './routes/ticket.routes.js'
import { errorHandler } from './utils/errorHandler.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)

const allowedOrigins = [
  'http://localhost:5173',
  'https://support-ticket-system-three-tau.vercel.app'
]

export const io = new Server(httpServer, {
  cors: { origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE'] }
})

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)

// Health check endpoints
app.get('/', (req, res) => res.json({ message: '🚀 API is running!' }))
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  socket.on('disconnect', () => console.log('User disconnected:', socket.id))
})

// Error handler - must be last
app.use(errorHandler)

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)

  // Keep-alive: ping self every 10 mins to prevent Render sleep
  const BACKEND_URL = 'https://support-ticket-system-2-bpdt.onrender.com/'
  setInterval(async () => {
    try {
      await fetch(BACKEND_URL)
      console.log('✅ Keep-alive ping sent')
    } catch (err) {
      console.log('Keep-alive ping failed:', err.message)
    }
  }, 10 * 60 * 1000)
})