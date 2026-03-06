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

app.use(cors({ origin: allowedOrigins }))
app.use(errorHandler)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)

// Health check
app.get('/', (req, res) => res.json({ message: '🚀 API is running!' }))

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  socket.on('disconnect', () => console.log('User disconnected:', socket.id))
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))