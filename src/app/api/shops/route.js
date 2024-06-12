import Account from '@models/accounts'
import Shop from '@models/shops'
import connectDB from '@config/connectDB'

const createShop = async (req) =>
{
  const body = await req.json()

  const {
    accountId,
    shop: {
      name,
      nickname,
      phone,
      email,
      website,
      address1,
      address2,
      city,
      state,
      zip,
    },
  } = body

  // check all credentials are valid
  if (!name || !phone || !email || !address1 || !city || !state || !zip)
  {
    return Response.json({ error: 'Please fill out all required fields' }, { status: 500 })
  } else
  {
    try
    {
      // create full address from address data 
      const fullAddress = address1 + '' + `${ address2 ? ' #' + address2 + ', ' : ', ' }` + city + ', ' + state + ' ' + zip

      // connect to DB
      await connectDB()
      // if shop name exists in account return error 
      const shopAccount = await Account.findById(accountId).populate('shops')
      shopAccount.shops.map(el =>
      {
        if (el.name == name)
        {
          throw new Error('Shop Name already taken')
        }
      })

      // create Shop
      const shop = await Shop.create({
        name,
        nickname: nickname || null,
        phone,
        email,
        website: website || null,
        address: {
          address1,
          address2: address2 || null,
          city,
          state,
          zip,
          fullAddress
        }
      })
      // Find account
      const account = await Account.findById(accountId)
      // push shop onto Account 
      account.shops.push(shop)
      await account.save()
      // return success 
      return Response.json({ success: 'Shop created successfully' }, { status: 200 })
    } catch (error)
    {
      return Response.json({ error: error?.message }, { status: 401 })
    }
  }
}

export { createShop as POST }