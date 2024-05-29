import Customer from '@models/Customers'
import Shop from '@models/shops'
import connectDB from '@db/connectDB'
import genShortToken from '@utils/genShortToken'
import verifyEmail from '@utils/verifyEmail'

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
      const newCustomer = await Customer.create({ firstname, lastname, email })
      currentShop.customers.push(newCustomer)
      await currentShop.save()
      const token = await genShortToken(newCustomer._id)
      verifyEmail(newCustomer.email, token)
      return Response.json(newCustomer)
    }
  } catch (error)
  {
    console.log(error)
    throw new Error(error)
  }
}

export { createOrVerifyUser as POST }