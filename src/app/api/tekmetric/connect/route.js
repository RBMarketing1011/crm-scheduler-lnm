import { getToken } from '@lib/utils/TekMetric/TekMetricApi.js'
import Shop from '@db/models/shops'

const connectTM = async (req) =>
{
  const { shopId, tmShopId } = await req.json()

  const token = await getToken()

  console.log(token)

  try
  {
    const shop = await Shop.findById(shopId)

    if (!shop)
    {
      throw new Error('Shop not found. Please try again.')
    }

    // throw new Error('Test')

    if (!token.scope.includes(tmShopId))
    {
      await Shop.findByIdAndUpdate(shopId, {
        tekMetricIntegration: {
          shopId: tmShopId,
          connected: false
        }
      })
      throw new Error('ShopId not contained in our scope. Please contact TekMetric to have it added to our scope.')
    }

    await Shop.findByIdAndUpdate(shopId, {
      tekMetricIntegration: {
        shopId: tmShopId,
        connected: true
      }
    })

    return Response.json({ success: 'Integration successful. ShopId added to your profile.' })

  } catch (error)
  {
    return Response.json(
      { error: error.message },
      { status: 403 }
    )
  }
}

export { connectTM as POST }