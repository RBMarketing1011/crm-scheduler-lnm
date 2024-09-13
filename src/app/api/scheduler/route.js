//dependencies
import connectDB from '@db/connectDB'

//models
import Account from '@db/models/accounts'
import Shop from '@db/models/locations'

const buildScheduler = async (req) =>
{
  const { accountId, locationId } = await req.json()
  try
  {
    await connectDB()

    const account = await Account.findById(accountId)
    const location = await Location.findById(locationId)

    if (!account || !shop)
    {
      throw new Error('Account or Shop not recognized!')
    }

    return Response.json({ success: { account, location } }, { status: 200 })
  } catch (error)
  {
    console.log(error)
    console.log(error.message)
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { buildScheduler as POST }