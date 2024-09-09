import Account from '@db/models/accounts'
import Shop from '@db/models/shops'
import connectDB from '@db/connectDB'

const createShop = async (req) =>
{
  const body = await req.json()

  const {
    accountId,
    shop: {
      name,
      weekdayOpenHour,
      weekdayCloseHour,
      openOnWeekends,
      weekendOpenOn,
      weekendOpenHour,
      weekendCloseHour,
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
        hoursOfOp: {
          weekdays: {
            open: weekdayOpenHour,
            close: weekdayCloseHour,
          },
          weekends: {
            open: openOnWeekends,
            days: weekendOpenOn || null,
            open: weekendOpenHour || null,
            close: weekendCloseHour || null,
          }
        },
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

const updateShop = async (req) =>
{
  const {
    id,
    name,
    weekdayOpenHour,
    weekdayCloseHour,
    openOnWeekends,
    weekendOpenOn,
    weekendOpenHour,
    weekendCloseHour,
    nickname,
    email,
    phone,
    website,
    address1,
    address2,
    city,
    state,
    zip,
  } = await req.json()

  try
  {
    const shop = await Shop.findById(id)

    if (!shop)
    {
      throw new Error('Shop not found')
    }

    await Shop.findByIdAndUpdate(id, {
      name,
      hoursOfOp: {
        weekdays: {
          open: weekdayOpenHour,
          close: weekdayCloseHour,
        },
        weekends: {
          open: openOnWeekends,
          days: weekendOpenOn || null,
          open: weekendOpenHour || null,
          close: weekendCloseHour || null,
        }
      },
      nickname,
      email,
      phone,
      website,
      address: {
        address1,
        address2,
        city,
        state,
        zip,
      }
    })

    return Response.json({ success: 'Shop details updated successfully' })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { createShop as POST, updateShop as PUT }