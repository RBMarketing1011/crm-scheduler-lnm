import Customer from '@db/models/customers'
import Shop from '@db/models/locations'
import connectDB from '@db/connectDB'
import genShortToken from '@lib/helpers/tokenGenerators/genShortToken'
import verifyEmail from '@lib/utils/nodemailer/verifyEmailScheduler'

const createOrVerifyUser = async (req) =>
{
  const { firstname, lastname, email, location } = await req.json()
  await connectDB()

  try
  {
    const currentShop = await Location.findById(location._id)
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
      const newCustomer = await Customer.create({ firstname, lastname, email, locationId: location._id })
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