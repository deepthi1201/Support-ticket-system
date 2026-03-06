import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Error:', error.message)
  } else {
    console.log('✅ SMTP Server is ready to send emails')
  }
})

export const sendTicketCreatedEmail = async (email, name, ticket) => {
  try {
    const info = await transporter.sendMail({
      from: `"Support System" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ Ticket Created: ${ticket.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #6366f1;">Ticket Created Successfully!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your support ticket has been created.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
            <p><strong>Title:</strong> ${ticket.title}</p>
            <p><strong>Description:</strong> ${ticket.description}</p>
            <p><strong>Status:</strong> <span style="color: green;">OPEN</span></p>
          </div>
          <p style="color: #888; margin-top: 20px;">We'll get back to you soon!</p>
        </div>
      `
    })
    console.log('✅ Ticket created email sent to:', email, info.messageId)
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}

export const sendTicketClosedEmail = async (email, name, ticket) => {
  try {
    const info = await transporter.sendMail({
      from: `"Support System" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🔒 Ticket Closed: ${ticket.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #6366f1;">Ticket Closed</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your support ticket has been closed.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <p><strong>Title:</strong> ${ticket.title}</p>
            <p><strong>Status:</strong> <span style="color: red;">CLOSED</span></p>
          </div>
          <p style="color: #888; margin-top: 20px;">Thank you for using our support system!</p>
        </div>
      `
    })
    console.log('✅ Ticket closed email sent to:', email, info.messageId)
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}