import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

transporter.verify((error) => {
  if (error) {
    console.log('❌ Email error:', error.message)
  } else {
    console.log('✅ Email service ready')
  }
})

export const sendTicketCreatedEmail = async (email, name, ticket) => {
  try {
    await transporter.sendMail({
      from: `"SupportDesk" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ Ticket Created: ${ticket.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #6366f1;">Ticket Created Successfully!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your support ticket has been created and our team will look into it shortly.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 16px 0;">
            <p><strong>Title:</strong> ${ticket.title}</p>
            <p><strong>Description:</strong> ${ticket.description}</p>
            <p><strong>Status:</strong> <span style="color: #22c55e; font-weight: bold;">OPEN</span></p>
          </div>
          <p style="color: #888; margin-top: 20px;">We'll get back to you soon!</p>
        </div>
      `
    })
    console.log('✅ Created email sent to:', email)
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}

export const sendTicketClosedEmail = async (email, name, ticket) => {
  try {
    await transporter.sendMail({
      from: `"SupportDesk" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🔒 Ticket Closed: ${ticket.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #6366f1;">Ticket Closed</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Your support ticket has been resolved and closed.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 16px 0;">
            <p><strong>Title:</strong> ${ticket.title}</p>
            <p><strong>Status:</strong> <span style="color: #ef4444; font-weight: bold;">CLOSED</span></p>
          </div>
          <p style="color: #888; margin-top: 20px;">Thank you for using SupportDesk!</p>
        </div>
      `
    })
    console.log('✅ Closed email sent to:', email)
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}