import nodemailer from 'nodemailer'

const verifyEmail = (email, token) =>
{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  })

  // async..await is not allowed in global scope, must use a wrapper
  async function main ()
  {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"LeadsNearMe® Support " <${ process.env.NODEMAILER_USER }>`, // sender address
      to: email, // list of receivers
      subject: "Please Verify Your Email", // Subject line
      text: "Verification Code Enclosed!", // plain text body
      html: `
      <div class="container">
        <h1>Email Verification</h1>
        <p>Hello,</p>
        <p>Please enter in the code below to verify your email address:</p>
        <h1>${ token }</h1>
        <p>If you did not request this verification, please ignore this email.</p>
        <p>Thank you,</p>
        <p>LeadsNearMe®</p>
      </div >
      `, // html body
    })

    console.log("Message sent: %s", info.messageId)
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error)
}

export default verifyEmail