import connectDB from '@db/connectDB'
import Customer from '@db/models/customers'
import CustomerEmailToken from '@db/models/customerEmailToken'

const verifyCustomerToken = async (req, { params }) =>
{
  const { token } = await req.json()
  const { id } = params
  await connectDB()

  try
  {
    const verifyToken = await CustomerEmailToken.findOne({ token }).populate('customer')
    const customer = await Customer.findById(id)
    const allTokens = await CustomerEmailToken.find({})

    // map through all tokens and remove expired tokens
    allTokens.map(async (token) =>
    {
      const expire = new Date(token.expiration)
      const time = Date.now()
      if (expire < time)
      {
        await CustomerEmailToken.findByIdAndDelete(token._id)
      }
    })

    // Check if token expired
    const tokenExpire = new Date(verifyToken.expiration)
    const now = Date.now()

    if (tokenExpire > now)
    {
      // If not expired check if customer attached to token matches customer given
      if (customer._id = verifyToken.customer._id)
      {
        // change customer to verified and delete token
        await Customer.findByIdAndUpdate(customer._id, {
          emailVerified: true
        })

        await CustomerEmailToken.findByIdAndDelete(verifyToken._id)

        return Response.json('Token Verified')
      } else
      {
        console.log('Token did not match customer ID')
        throw new Error('Token did not match customer ID')
      }
    } else if (tokenExpire < now)
    {
      await CustomerEmailToken.findByIdAndDelete(verifyToken._id)
      console.log('Token Expired')
      throw new Error('Your Token Has Expired. Please Try Again.')
    }

  } catch (error)
  {
    console.log(error)
    throw new Error(error)
  }
}

export { verifyCustomerToken as POST }