'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import PopupForm from '@components/molecule/Popups/PopupForm'

const LocationIntegrationsPage = ({ locationId }) =>
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
  const [ tmlocationId, setTmlocationId ] = useState('')
  // ================================== End Connect to tekmetric
  // ====================================== Set location data
  const [ location, setLocation ] = useState()

  useEffect(() =>
  {
    const getShop = () =>
    {
      session?.locations.length &&
        session?.locations.map(location =>
        {
          if (location._id.includes(locationId))
          {
            setLocation({
              id: location?._id,
              name: location?.name,
              nickname: location?.nickname,
              email: location?.email,
              phone: location?.phone,
              website: location?.website,
              address1: location?.address.address1,
              address2: location?.address.address2,
              city: location?.address.city,
              state: location?.address.state,
              zip: location?.address.zip,
              tekMetricConnected: location?.tekMetricIntegration.connected,
              tekmetriclocationId: location?.tekMetricIntegration.locationId
            })
            setTmlocationId(location?.tekMetricIntegration.locationId || '')
          }
        })
    }

    getShop()

  }, [ session ])

  // ======================================= End set location data

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
                  <span className={ `${ location?.tekMetricConnected ? 'text-green-500'
                    :
                    'text-red-500' }` }
                  >
                    {
                      location?.tekMetricConnected ?
                        ' Connected'
                        :
                        ' Not Connected'
                    }
                  </span>
                </h2>
                <h2 className="text-base font-semibold leading-7 text-primary-300">
                  {
                    location?.tekmetriclocationId &&
                    <>
                      <span className='text-gray-900'>
                        locationId: { ' ' }
                      </span>
                      { location?.tekmetriclocationId }
                    </>
                  }
                </h2>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-500 w-1/2">
                Make sure your locationId is correct and associated with this location. Leads Near Me® is not responsible for bad data associated with integrating the wrong location id.
              </p>
            </div>
            <button
              type="button"
              className="font-semibold text-primary-300 hover:text-primary-500 w-1/4"
              onClick={ () => setTmPopup(true) }
            >
              {
                location?.tekMetricConnected ?
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
          body: JSON.stringify({ locationId: location?.id, tmlocationId })
        } }
        notifiSetState={ setNotify }
        textFields={ [
          {
            width: 'sm:w-[100%]',
            type: 'text',
            label: 'TekMetric Shop ID',
            value: tmlocationId,
            required: true,
            onChange: (e) =>
            {
              setTmlocationId(e.target.value)
            }
          }
        ] }
      />


    </main>
  )
}

export default LocationIntegrationsPage