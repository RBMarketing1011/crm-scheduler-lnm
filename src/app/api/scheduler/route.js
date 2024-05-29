//dependencies
import connectDB from '@db/connectDB'

//models
import Account from '@models/account'
import Shop from '@models/shops'

const buildScheduler = async (req) =>
{
  const { accountId, shopId } = await req.json()
  try
  {
    await connectDB()

    const account = await Account.findById(accountId)
    const shop = await Shop.findById(shopId).populate('services')

    return Response.json({ account, shop })
  } catch (error)
  {
    console.log(error)
    throw new Error(error.message)
  }
}

export { buildScheduler as POST }