import { v4 } from 'uuid'
import Customer from '@models/Customers'
import EmailToken from '@models/emailToken'
import connectDB from '@db/connectDB'

const genShortToken = async (customerId) =>
{
  await connectDB()
  const token = v4().substring(0, 7)
  const customer = await Customer.findById(customerId)

  try
  {
    const emailToken = await EmailToken.create({ token, customer })
    return emailToken.token
  } catch (error)
  {
    console.log(error)
  }
}

export default genShortToken