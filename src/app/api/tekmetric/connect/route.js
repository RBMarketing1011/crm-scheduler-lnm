import { getToken } from '@lib/utils/TekMetric/TekMetricApi.js'
import Shop from '@db/models/locations'

const connectTM = async (req) =>
{
  const { locationId, tmlocationId } = await req.json()

  const token = await getToken()

  console.log(token)

  try
  {
    const location = await Location.findById(locationId)

    if (!shop)
    {
      throw new Error('Shop not found. Please try again.')
    }

    // throw new Error('Test')

    if (!token.scope.includes(tmlocationId))
    {
      await Location.findByIdAndUpdate(locationId, {
        tekMetricIntegration: {
          locationId: tmlocationId,
          connected: false
        }
      })
      throw new Error('locationId not contained in our scope. Please contact TekMetric to have it added to our scope.')
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
      { status: 403 }
    )
  }
}

export { connectTM as POST }