import connectDB from '@config/connectDB'
import User from '@models/users'
import UserEmailToken from '@models/UserEmailToken'

const verifyUserWithToken = async (request, { params }) =>
{
  const { token } = params

  await connectDB()

  const emailToken = await UserEmailToken.findOne({ token: token })
  const allTokens = await UserEmailToken.find({})

  // map through all tokens and remove expired tokens
  allTokens.map(async (token) =>
  {
    if (new Date(token.expiration) < Date.now())
    {
      await UserEmailToken.findByIdAndDelete(token._id)
    }
  })

  const loginUrl = new URL('/login', request.url)

  // redirect to login if no emailtoken found
  if (!emailToken)
  {
    return Response.redirect(loginUrl)
  }

  try
  {
    // if token expired return error
    if (new Date(emailToken.expiration) < Date.now())
    {
      // delete token 
      await UserEmailToken.findByIdAndDelete(emailToken._id)
      // return Response.error
      return Response.json({ error: 'Token Expired' }).redirect(loginUrl)
    } else
    {
      // update user.emailVerified
      await User.findByIdAndUpdate(emailToken.user._id, {
        emailVerified: true
      })
      // delete email token
      await UserEmailToken.findByIdAndDelete(emailToken._id)
      // return Response.success
      return Response.json({ success: 'Email Verification Successfull' }).redirect(loginUrl)
    }
  } catch (error)
  {
    throw new Error(error)
  }
}

export { verifyUserWithToken as GET }