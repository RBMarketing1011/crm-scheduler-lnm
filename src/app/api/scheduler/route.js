//dependencies
import connectDB from '@config/connectDB'

//models
import Account from '@models/accounts'
import Shop from '@models/shops'

const buildScheduler = async (req) =>
{
  const { accountId, shopId } = await req.json()
  try
  {
    await connectDB()

    const account = await Account.findById(accountId)
    const shop = await Shop.findById(shopId)

    return Response.json({ account, shop })
  } catch (error)
  {
    console.log(error)
    throw new Error(error.message)
  }
}

export { buildScheduler as POST }