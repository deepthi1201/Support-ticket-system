import express from 'express'
import {
  createTicket,
  getMyTickets,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket
} from '../controllers/ticket.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect) // all ticket routes are protected

router.post('/', createTicket)
router.get('/', getMyTickets)
router.get('/all', getAllTickets)
router.get('/:id', getTicketById)
router.put('/:id', updateTicketStatus)
router.delete('/:id', deleteTicket)

export default router