import prisma from '../lib/prisma.js'
import { io } from '../app.js'
import { sendTicketCreatedEmail, sendTicketClosedEmail } from '../utils/email.js'

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description)
      return res.status(400).json({ message: 'Title and description are required' })

    const ticket = await prisma.ticket.create({
      data: { title, description, userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true } } }
    })

    // Real-time emit
    io.emit('ticket:created', ticket)

    // Send email
    await sendTicketCreatedEmail(req.user.email, req.user.name, ticket)

    res.status(201).json({ message: 'Ticket created successfully', ticket })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({ tickets })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({ tickets })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getTicketById = async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { id: true, name: true, email: true } } }
    })

    if (!ticket)
      return res.status(404).json({ message: 'Ticket not found' })

    if (ticket.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })

    res.status(200).json({ ticket })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!['OPEN', 'CLOSED'].includes(status))
      return res.status(400).json({ message: 'Invalid status' })

    const existing = await prisma.ticket.findUnique({ where: { id: req.params.id } })

    if (!existing)
      return res.status(404).json({ message: 'Ticket not found' })

    if (existing.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })

    const ticket = await prisma.ticket.update({
      where: { id: req.params.id },
      data: { status },
      include: { user: { select: { id: true, name: true, email: true } } }
    })

    // Real-time emit
    io.emit('ticket:updated', ticket)

    // Send email if closed
    if (status === 'CLOSED') {
      await sendTicketClosedEmail(req.user.email, req.user.name, ticket)
    }

    res.status(200).json({ message: 'Ticket updated successfully', ticket })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const deleteTicket = async (req, res) => {
  try {
    const existing = await prisma.ticket.findUnique({ where: { id: req.params.id } })

    if (!existing)
      return res.status(404).json({ message: 'Ticket not found' })

    if (existing.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' })

    await prisma.ticket.delete({ where: { id: req.params.id } })

    io.emit('ticket:deleted', { id: req.params.id })

    res.status(200).json({ message: 'Ticket deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}