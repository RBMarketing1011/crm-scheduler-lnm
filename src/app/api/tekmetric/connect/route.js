import { getToken } from '@lib/utils/TekMetric/TekMetricApi.js'
import Location from '@db/models/locations'
import connectDB from '@db/connectDB'

const connectTM = async (req) =>
{
  const { locationId, tmlocationId } = await req.json()

  const token = await getToken()

  try
  {
    await connectDB()
    const location = await Location.findById(locationId)

    console.log(location)

    if (!location)
    {
      return Response.json({ error: 'Location not found. Please try again.' }, { status: 200 })
    }

    if (!token.scope.includes(tmlocationId))
    {
      await Location.findByIdAndUpdate(locationId, {
        tekMetricIntegration: {
          locationId: tmlocationId,
          connected: false
        }
      })

      return Response.json({ success: 'locationId not contained in our scope. Please contact TekMetric to have it added to our scope.' }, { status: 200 })
    }

    await Location.findByIdAndUpdate(locationId, {
      tekMetricIntegration: {
        locationId: tmlocationId,
        connected: true
      }
    })

    return Response.json({ success: 'Integration successful. locationId added to your profile.' })

  } catch (error)
  {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

const deleteConnection = async (req) =>
{
  const { locationId } = await req.json()
  try
  {
    await connectDB()
    const location = await Location.findById(locationId)

    if (!location)
    {
      return Response.json({ error: 'Location not found. Please try again.' }, { status: 200 })
    }

    await Location.findByIdAndUpdate(locationId, {
      tekMetricIntegration: {
        locationId: '',
        connected: false
      }
    })

    return Response.json({ success: 'TekMetric Integration disconnected.' }, { status: 200 })

  } catch (error)
  {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export { connectTM as POST, deleteConnection as DELETE }