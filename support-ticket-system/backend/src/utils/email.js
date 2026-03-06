import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use Resend's free test sender — no domain setup needed
const FROM = 'Support System <onboarding@resend.dev>'

export const sendTicketCreatedEmail = async (email, name, ticket) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
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

    if (error) {
      console.log('❌ Email error:', error.message)
    } else {
      console.log('✅ Ticket created email sent to:', email, data?.id)
    }
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}

export const sendTicketClosedEmail = async (email, name, ticket) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
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

    if (error) {
      console.log('❌ Email error:', error.message)
    } else {
      console.log('✅ Ticket closed email sent to:', email, data?.id)
    }
  } catch (error) {
    console.log('❌ Email error:', error.message)
  }
}