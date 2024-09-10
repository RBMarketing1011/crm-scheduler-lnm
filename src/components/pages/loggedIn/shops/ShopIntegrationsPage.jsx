'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import PopupForm from '@components/molecule/Popups/PopupForm'

const ShopIntegrationsPage = ({ shopId }) =>
{
  // ====================================== Notifi state 
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })
  // ====================================== Session details
  const {
    data: session,
    update: refresh
  } = useSession()

  // ================================== Connect to tekmetric 
  const [ tmPopup, setTmPopup ] = useState(false)
  const [ tmShopId, setTmShopId ] = useState('')
  // ================================== End Connect to tekmetric
  // ====================================== Set shop data
  const [ shop, setShop ] = useState()

  useEffect(() =>
  {
    const getShop = () =>
    {
      session?.shops.length &&
        session?.shops.map(shop =>
        {
          if (shop._id.includes(shopId))
          {
            setShop({
              id: shop?._id,
              name: shop?.name,
              nickname: shop?.nickname,
              email: shop?.email,
              phone: shop?.phone,
              website: shop?.website,
              address1: shop?.address.address1,
              address2: shop?.address.address2,
              city: shop?.address.city,
              state: shop?.address.state,
              zip: shop?.address.zip,
              tekMetricConnected: shop?.tekMetricIntegration.connected,
              tekmetricShopId: shop?.tekMetricIntegration.shopId
            })
            setTmShopId(shop?.tekMetricIntegration.shopId || '')
          }
        })
    }

    getShop()

  }, [ session ])

  // ======================================= End set shop data

  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
      <div className="border-b border-gray-200 bg-white pb-2 mb-5">
        <TitleHeading title='Integrations' />
      </div>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='flex gap-20'>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Tek Metric -
                  <span className={ `${ shop?.tekMetricConnected ? 'text-green-500'
                    :
                    'text-red-500' }` }
                  >
                    {
                      shop?.tekMetricConnected ?
                        ' Connected'
                        :
                        ' Not Connected'
                    }
                  </span>
                </h2>
                <h2 className="text-base font-semibold leading-7 text-primary-300">
                  {
                    shop?.tekmetricShopId &&
                    <>
                      <span className='text-gray-900'>
                        shopId: { ' ' }
                      </span>
                      { shop?.tekmetricShopId }
                    </>
                  }
                </h2>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-500 w-1/2">
                Make sure your shopId is correct and associated with this shop. Leads Near Me® is not responsible for bad data associated with integrating the wrong shopId.
              </p>
            </div>
            <button
              type="button"
              className="font-semibold text-primary-300 hover:text-primary-500 w-1/4"
              onClick={ () => setTmPopup(true) }
            >
              {
                shop?.tekMetricConnected ?
                  'Disconnect'
                  :
                  'Connect'
              }
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Connect Tekmetric Form */ }
      <PopupForm
        title='Connect Tekmetric'
        openPopupState={ { state: tmPopup, setState: setTmPopup } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/tekmetric/connect`,
          method: 'POST',
          body: JSON.stringify({ shopId: shop?.id, tmShopId })
        } }
        notifiSetState={ setNotify }
        textFields={ [
          {
            width: 'sm:w-[100%]',
            type: 'text',
            label: 'TekMetric Shop ID',
            value: tmShopId,
            required: true,
            onChange: (e) =>
            {
              setTmShopId(e.target.value)
            }
          }
        ] }
      />


    </main>
  )
}

export default ShopIntegrationsPage