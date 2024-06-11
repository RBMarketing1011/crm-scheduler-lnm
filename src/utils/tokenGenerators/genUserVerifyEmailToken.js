import { v4 } from 'uuid'
import User from '@models/users'
import UserEmailToken from '@models/UserEmailToken'
import connectDB from '@config/connectDB'

const genUserVerifyEmailToken = async (customerId) =>
{
  await connectDB()
  const token = v4()
  const user = await User.findById(customerId)

  try
  {
    const emailToken = await UserEmailToken.create({ token, user: user })
    return emailToken.token
  } catch (error)
  {
    throw new Error(error?.message)
  }
}

export default genUserVerifyEmailToken