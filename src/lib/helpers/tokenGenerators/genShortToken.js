import { v4 } from 'uuid'
import Customer from '@db/models/customers'
import CustomerEmailToken from '@db/models/customerEmailToken'
import connectDB from '@db/connectDB'

const genShortToken = async (customerId) =>
{
  await connectDB()
  const token = v4().substring(0, 7)
  const customer = await Customer.findById(customerId)

  try
  {
    const emailToken = await CustomerEmailToken.create({ token, customer })
    return emailToken.token
  } catch (error)
  {
    console.log(error)
  }
}

export default genShortToken