import Account from '@db/models/accounts'
import Location from '@db/models/locations'
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
      // if location name exists in account return error 
      const locationAccount = await Account.findById(accountId).populate('locations')
      locationAccount.locations.map(el =>
      {
        if (el.name == name)
        {
          throw new Error('Shop Name already taken')
        }
      })

      // create Shop
      const location = await Location.create({
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
      // push location onto Account 
      account.locations.push(location)
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

  console.log(openOnWeekends)

  try
  {
    const location = await Location.findById(id)

    if (!location)
    {
      throw new Error('Shop not found')
    }

    await Location.findByIdAndUpdate(id, {
      name,
      hoursOfOp: {
        weekdays: {
          open: weekdayOpenHour,
          close: weekdayCloseHour,
        },
        weekends: {
          isOpen: openOnWeekends,
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

const addLocationService = async (req) =>
{
  const { service } = await req.json()
  const {
    id,
    title,
    desc,
    question,
    answers
  } = service

  const data = {
    title,
    desc,
    question: {
      text: question,
      answers
    }
  }

  try
  {
    const location = await Location.findById(id)

    if (!location)
    {
      throw new Error('Location not found')
    }

    location.services.push(data)
    await location.save()

    return Response.json({ success: 'Service added to shop successfully' })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { createShop as POST, updateShop as PUT, addLocationService as PATCH }