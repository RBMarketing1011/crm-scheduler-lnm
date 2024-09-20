'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import TitleHeading from '@components/atom/Headings/TitleHeading'

import { Notifi, notifi } from '@lib/utils/Notifications/Notify'

const LocationDetailsPage = ({ locationId }) =>
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

  // ====================================== Set location data
  const [ location, setLocation ] = useState()

  useEffect(() =>
  {
    const getShop = () =>
    {
      session?.locations.length &&
        session?.locations.map(location =>
        {
          if (location._id === locationId)
          {
            setLocation({
              id: location?._id || '',
              name: location?.name || '',
              nickname: location?.nickname || '',
              email: location?.email || '',
              phone: location?.phone || '',
              website: location?.website || '',
              address1: location?.address.address1 || '',
              address2: location?.address.address2 || '',
              city: location?.address.city || '',
              state: location?.address.state || '',
              zip: location?.address.zip || '',
              tekMetricConnected: location?.tekMetricIntegration.connected || '',
              tekmetriclocationId: location?.tekMetricIntegration.locationId || ''
            })
          }
        })
    }

    getShop()

  }, [ session, locationId ])

  // ======================================= End set location data
  // ======================================= Update location details
  const submitForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const result = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/shops`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shop)
      })

      const res = await result.json()

      if (res.success)
      {
        notifi.success(res.success, setNotify)
        refresh()
      } else if (res.error)
      {
        notifi.error(res.error, setNotify)
      }

    } catch (error)
    {
      notifi.error(error.message, setNotify)
    }
  }

  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
      <div className="border-b border-gray-200 bg-white pb-2 mb-5">
        <TitleHeading title='Shop Details' />
      </div>
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-primary-300">Shop Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Use an email address where you can receive appointment notifications.
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={ submitForm }>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-grey-900">
                    Shop Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ location?.name }
                      onChange={ (e) =>
                      {
                        setLocation(prev => ({
                          ...prev,
                          name: e.target.value
                        }))
                      } }
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-grey-900">
                    Nickname
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ location?.nickname }
                      onChange={ (e) =>
                      {
                        setLocation(prev => ({
                          ...prev,
                          nickname: e.target.value
                        }))
                      } }
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-grey-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.email }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            email: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-grey-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ location?.phone }
                      onChange={ (e) =>
                      {
                        setLocation(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))
                      } }
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-grey-900">
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ location?.website }
                      onChange={ (e) =>
                      {
                        setLocation(prev => ({
                          ...prev,
                          website: e.target.value
                        }))
                      } }
                    />
                  </div>
                </div>

                <h2 className='col-span-full block text-md font-medium leading-6 text-primary-300'>
                  Address
                </h2>

                <div className="col-span-full">
                  <label htmlFor="address1" className="block text-sm font-medium leading-6 text-grey-900">
                    Street
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="adress1"
                        id="address1"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.address1 }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            address1: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="address2" className="block text-sm font-medium leading-6 text-grey-900">
                    Apt/Unit #
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.address2 }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            address2: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-grey-900">
                    City
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete='city'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.city }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            city: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-grey-900">
                    State
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.state }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            state: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="zip" className="block text-sm font-medium leading-6 text-grey-900">
                    Zip
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="zip"
                        id="zip"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ location?.zip }
                        onChange={ (e) =>
                        {
                          setLocation(prev => ({
                            ...prev,
                            zip: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LocationDetailsPage