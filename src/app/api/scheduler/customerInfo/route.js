import Customer from '@models/customers'
import Shop from '@models/shops'
import connectDB from '@config/connectDB'
import genShortToken from '@utils/tokenGenerators/genShortToken'
import verifyEmail from '@utils/nodemailerEmails/verifyEmailScheduler'

const createOrVerifyUser = async (req) =>
{
  const { firstname, lastname, email, shop } = await req.json()
  await connectDB()

  try
  {
    const currentShop = await Shop.findById(shop._id)
    const customerExists = await Customer.findOne({ email })
    // Does this customer already exist 
    if (customerExists)
    {
      currentShop.customers.map(customer =>
      {
        if (customer._id === customerExists._id)
        {
          return Response.json(customerExists)
        }
      })

      currentShop.customers.push(customerExists)
      await currentShop.save()
      const token = await genShortToken(customerExists._id)
      verifyEmail(customerExists.email, token)
      return Response.json(customerExists)

    } else
    {
      const newCustomer = await Customer.create({ firstname, lastname, email, shopId: shop._id })
      currentShop.customers.push(newCustomer)
      await currentShop.save()
      const token = await genShortToken(newCustomer._id)
      verifyEmail(newCustomer.email, token)
      return Response.json(newCustomer)
    }
  } catch (error)
  {
    console.log(error)
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { createOrVerifyUser as POST }