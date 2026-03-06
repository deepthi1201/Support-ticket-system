import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma.js'
import generateToken from '../utils/generateToken.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' })

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser)
      return res.status(400).json({ message: 'Email already in use' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    const token = generateToken(user.id)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = generateToken(user.id)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user })
}