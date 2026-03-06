# 🎫 Support Ticket System

A full-stack customer support ticket management system built with React, Node.js, Prisma, and PostgreSQL.

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🎫 Full Ticket CRUD (Create, Read, Update, Delete)
- ⚡ Real-time updates via Socket.io
- 📧 Email notifications via Nodemailer (SMTP)
- 🌤️ Third-party API integration (Open-Meteo weather)
- 🎨 Beautiful dark UI with React + Tailwind CSS
- 🗄️ PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Socket.io-client, Axios, React Router

**Backend:** Node.js, Express.js, Prisma ORM, Socket.io, Nodemailer, JWT, bcryptjs

**Database:** PostgreSQL (Neon)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL database (Neon recommended)

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-gmail-app-password
```
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📮 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Tickets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tickets | Create ticket |
| GET | /api/tickets | Get my tickets |
| GET | /api/tickets/all | Get all tickets |
| GET | /api/tickets/:id | Get ticket by ID |
| PUT | /api/tickets/:id | Update ticket status |
| DELETE | /api/tickets/:id | Delete ticket |

## 🌐 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon (PostgreSQL)