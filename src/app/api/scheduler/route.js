//dependencies
import connectDB from '@db/connectDB'

//models
import Account from '@db/models/accounts'
import Shop from '@db/models/shops'

const buildScheduler = async (req) =>
{
  const { accountId, shopId } = await req.json()
  try
  {
    await connectDB()

    const account = await Account.findById(accountId)
    const shop = await Shop.findById(shopId)

    if (!account || !shop)
    {
      throw new Error('Account or Shop not recognized!')
    }

    return Response.json({ success: { account, shop } }, { status: 200 })
  } catch (error)
  {
    console.log(error)
    console.log(error.message)
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { buildScheduler as POST }