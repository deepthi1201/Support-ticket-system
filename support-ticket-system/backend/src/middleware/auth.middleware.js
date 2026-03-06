import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }
    })

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' })
  }
}

export default protect