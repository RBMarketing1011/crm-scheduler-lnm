const sendEmail = async ({ email }) =>
{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "rbmarketingandanalytics@gmail.com",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
      // accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
      expires: 1000 * 60 * 30,
    },
  })

  transporter.sendMail({
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: "Message",
    text: "I hope this message gets through!",
    auth: {
      user: "user@example.com",
      refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
      accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
      expires: 1484314697598,
    },
  })
}