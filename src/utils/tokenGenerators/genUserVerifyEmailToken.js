import { v4 } from 'uuid'
import Employee from '@models/employees'
import EmployeeEmailToken from '@models/UserEmailToken'
import connectDB from '@config/connectDB'

const genUserVerifyEmailToken = async (customerId) =>
{
  await connectDB()
  const token = v4()
  const user = await Employee.findById(customerId)

  try
  {
    const emailToken = await EmployeeEmailToken.create({ token, user: user })
    return emailToken.token
  } catch (error)
  {
    throw new Error(error?.message)
  }
}

export default genUserVerifyEmailToken