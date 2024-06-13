import connectDB from '@config/connectDB'
import Employee from '@models/employees'
import EmployeeEmailToken from '@models/UserEmailToken'
import genUserVerifyEmailToken from '@utils/tokenGenerators/genUserVerifyEmailToken'

const verifyUserWithToken = async (request, { params }) =>
{
  const { token } = params

  await connectDB()

  const emailToken = await EmployeeEmailToken.findOne({ token: token })
  const allTokens = await EmployeeEmailToken.find({})

  // map through all tokens and remove expired tokens
  allTokens.map(async (token) =>
  {
    if (new Date(token.expiration) < Date.now())
    {
      await EmployeeEmailToken.findByIdAndDelete(token._id)
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
      await EmployeeEmailToken.findByIdAndDelete(emailToken._id)
      // return Response.error
      return Response.json({ error: 'Token Expired' })
    } else
    {
      // update user.emailVerified
      const employee = await Employee.findByIdAndUpdate(emailToken.user._id, {
        emailVerified: true
      })
      // delete email token
      await EmployeeEmailToken.findByIdAndDelete(emailToken._id)
      // if no password redirect to /users/setpassword/[userId]
      console.log(employee.password)
      if (employee.password === 'reset')
      {
        // generate token to verify password reset
        const token = await genUserVerifyEmailToken(employee._id)
        // return redirect to reset password
        return Response.redirect(new URL(`/users/setpassword/${ employee._id }?token=${ token }`, request.url))
      }
      // return Response.success
      return Response.redirect(loginUrl)
    }
  } catch (error)
  {
    throw new Error(error)
  }
}

export { verifyUserWithToken as GET }