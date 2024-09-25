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

  }, [ session, locationId ])

  // ======================================= End set location data

  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
      <div className="border-b border-gray-200 bg-white pb-2 mb-5">
        <TitleHeading title='Integrations' />
      </div>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <div className='flex justify-between items-start'>
            <div>
              <div className='flex gap-20'>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Tek Metric
                  {
                    location?.tekMetricConnected ?

                      <span className="ml-3 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-red-600/10">
                        Connected
                      </span>

                      :

                      <span className="ml-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/10">
                        Not Connected
                      </span>
                  }
                </h2>
                <h2 className="text-base font-semibold leading-7 text-primary-300">
                  {
                    location?.tekmetriclocationId &&
                    <>
                      <span className='text-gray-900'>
                        Shop Id: { ' ' }
                      </span>
                      { location?.tekmetriclocationId }
                    </>
                  }
                </h2>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-500 w-1/2">
                Make sure your locationId is correct and associated with this location. Leads Near Me® is not responsible for bad data associated with integrating the wrong location id.
              </p>

              {
                !location?.tekMetricConnected &&
                location?.tekmetriclocationId &&

                <span className="mt-5 p-5 max-w-72 inline-flex items-center rounded-md bg-red-50 text-center text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/10">
                  Please contact TekMetric and request that they add your shop ID to the list of shops accessible by Leads Near Me. This is necessary to ensure that Leads Near Me can properly integrate with TekMetric and access the relevant data needed to enhance your shop&apos;s performance and lead management. Once your shop ID is included, the system will show that it is properly connected.
                </span>
              }

            </div>

            {
              location?.tekMetricConnected ?

                <button
                  type="button"
                  className="font-semibold text-primary-300 hover:text-primary-500 w-1/4"
                  onClick={ async () =>
                  {
                    const req = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/tekmetric/connect`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ locationId: location?.id })
                    })

                    const res = await req.json()

                    if (res.error)
                    {
                      setNotify({
                        type: 'error',
                        text: res.error,
                        show: true
                      })
                    }

                    refresh()

                  } }
                >
                  Disconnect
                </button>
                :

                <button
                  type="button"
                  className="font-semibold text-primary-300 hover:text-primary-500 w-1/4"
                  onClick={ () => setTmPopup(true) }
                >
                  Connect
                </button>
            }

          </div>
        </div>
      </div>

      {/* Modal for Connect Tekmetric Form */ }
      <PopupForm
        title={ <div><span>Connect Tekmetric</span><br /><span className='text-xs text-gray-400 font-semibold'>Please make sure your shop id is included in the scope of Leads Near Me</span></div> }
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
            label: <p><span>TekMetric Shop ID</span><br /><span className='text-xs text-gray-400'>Contact Tekmetric if you do not know your shop id.</span></p>,
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