import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVER_SERVICE,
  host: process.env.EMAIL_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})