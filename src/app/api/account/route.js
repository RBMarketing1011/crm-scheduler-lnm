import connectDB from '@db/connectDB'
import Account from '@db/models/accounts'

const updateAccount = async (req) =>
{
  const {
    id,
    name,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip
  } = await req.json()

  try
  {
    await connectDB()

    const account = await Account.findById(id)

    if (!account)
    {
      return Response.json({ error: 'Account not found' }, { status: 404 })
    }

    account.name = name || account.name
    account.email = email || account.email
    account.phone = phone || account.phone
    account.address.address1 = address1 || account.address.address1
    account.address.address2 = address2 || account.address.address2
    account.address.city = city || account.address.city
    account.address.state = state || account.address.state
    account.address.zip = zip || account.address.zip

    await account.save()

    return Response.json({ success: 'Account updated' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { updateAccount as PUT }