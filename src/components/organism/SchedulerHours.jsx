'use client'

import { useContext, useState } from 'react'
import { UserContext } from '@config/providers/context/UserContext'
import { toast } from 'react-toastify'

const SchedulerHours = ({ accountId, locationId }) =>
{
  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  const l = session?.locations?.find(location => location._id === locationId)

  const [ locationHrs, setLocationHrs ] = useState({
    id: locationId,
    name: l.name,
    weekdayOpenHour: l.hoursOfOp.weekdays.open,
    weekdayCloseHour: l.hoursOfOp.weekdays.close,
    openOnWeekends: l.hoursOfOp.weekends.isOpen || false,
    weekendOpenOn: l.hoursOfOp.weekends.days || '',
    weekendOpenHour: l.hoursOfOp.weekends.open || '',
    weekendCloseHour: l.hoursOfOp.weekends.close || '',
    nickname: l.nickname,
    email: l.email,
    phone: l.phone,
    website: l.website,
    address1: l.address.address1,
    address2: l.address.address2 || '',
    city: l.address.city,
    state: l.address.state,
    zip: l.address.zip,
  })

  const time = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
  ]

  const handleLocationHrsForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch('/api/locations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationHrs)
      })

      const res = await req.json()

      if (res.error)
      {
        toast.error(res.error)
      } else
      {
        toast.success(res.success)
      }

    } catch (error)
    {
      toast.error(error.message)
    }

    update()
  }

  return (
    <form onSubmit={ handleLocationHrsForm }>

      {
        session.locations.map(location => (
          location._id === locationId &&

          <div key={ location._id }>
            <div className="space-y-12">
              <div className="py-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Location Hours & Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please verify the hours of operation & address for this location.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="col-span-12 sm:col-span-3">
                    <label htmlFor="wkday-open" className="block text-sm font-medium leading-6 text-gray-900">
                      Weekday Open Time
                    </label>
                    <div className="mt-2">
                      <select
                        id="wkday-open"
                        name="wkday-open"
                        defaultValue={ locationHrs.weekdayOpenHour }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          weekdayOpenHour: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      >
                        <option value='blank' disabled>Select Time</option>
                        {
                          time.map((t, i) => (
                            <option key={ i }>{ t }</option>
                          ))
                        }

                      </select>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-3">
                    <label htmlFor="wkday-close" className="block text-sm font-medium leading-6 text-gray-900">
                      Weekday Close Time
                    </label>
                    <div className="mt-2">
                      <select
                        id="wkday-close"
                        name="wkday-close"
                        defaultValue={ locationHrs.weekdayCloseHour }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          weekdayCloseHour: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      >
                        <option value='blank' disabled>Select Time</option>
                        {
                          time.map((t, i) => (
                            <option key={ i }>{ t }</option>
                          ))
                        }

                      </select>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-3 flex items-center">
                    <fieldset>
                      <legend className="sr-only">Notifications</legend>
                      <div className="h-full">
                        <div className="relative flex">
                          <div className="flex h-6 items-center">
                            <input
                              id="isOpenWkends"
                              name="isOpenWkends"
                              type="checkbox"
                              defaultChecked={ locationHrs.openOnWeekends }
                              onClick={ () => setLocationHrs(prev => ({
                                ...prev,
                                openOnWeekends: !prev.openOnWeekends
                              })) }
                              aria-describedby="isOpenWkends"
                              className="h-4 w-4 rounded border-gray-300 text-primary-300 focus:ring-primary-300"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="isOpenWkends" className="font-medium text-gray-900">
                              Open on weekends?
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  {
                    locationHrs.openOnWeekends ?

                      <>
                        <div className="col-span-12 sm:col-span-3">
                          <label htmlFor="open-wkend" className="block text-sm font-medium leading-6 text-gray-900">
                            Which days are you open?
                          </label>
                          <div className="mt-2">
                            <select
                              id="open-wkend"
                              name="open-wkend"
                              defaultValue={ locationHrs.weekendOpenOn || 'blank' }
                              onChange={ (e) => setLocationHrs(prev => ({
                                ...prev,
                                weekendOpenOn: e.target.value
                              })) }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            >
                              <option value='blank' disabled>Select Days</option>
                              <option value='Saturday'>Saturday</option>
                              <option value='Sunday'>Sunday</option>
                              <option value='Saturday & Sunday'>Saturday & Sunday</option>


                            </select>
                          </div>
                        </div>

                        <div className="col-span-12 sm:col-span-3">
                          <label htmlFor="wkend-open" className="block text-sm font-medium leading-6 text-gray-900">
                            Weekend Open Time
                          </label>
                          <div className="mt-2">
                            <select
                              id="wkend-open"
                              name="wkend-open"
                              defaultValue={ locationHrs.weekendOpenHour || 'blank' }
                              onChange={ (e) => setLocationHrs(prev => ({
                                ...prev,
                                weekendOpenHour: e.target.value
                              })) }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            >
                              <option value='blank' disabled>Select Time</option>
                              {
                                time.map((t, i) => (
                                  <option key={ i }>{ t }</option>
                                ))
                              }

                            </select>
                          </div>
                        </div>

                        <div className="col-span-12 sm:col-span-3">
                          <label htmlFor="wkend-close" className="block text-sm font-medium leading-6 text-gray-900">
                            Weekend Close Time
                          </label>
                          <div className="mt-2">
                            <select
                              id="wkend-close"
                              name="wkend-close"
                              defaultValue={ locationHrs.weekendCloseHour || 'blank' }
                              onChange={ (e) => setLocationHrs(prev => ({
                                ...prev,
                                weekendCloseHour: e.target.value
                              })) }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            >
                              <option value='blank' disabled>Select Time</option>
                              {
                                time.map((t, i) => (
                                  <option key={ i }>{ t }</option>
                                ))
                              }

                            </select>
                          </div>
                        </div>
                      </>

                      :

                      <div className="hidden sm:block sm:col-span-3"></div>
                  }

                  <div className="col-span-12 sm:col-span-3">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        value={ locationHrs.address1 }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          address1: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-3">
                    <label htmlFor="apt" className="block text-sm font-medium leading-6 text-gray-900">
                      Apt/Unit #
                    </label>
                    <div className="mt-2">
                      <input
                        id="apt"
                        name="apt"
                        type="text"
                        value={ locationHrs.address2 }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          address2: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        value={ locationHrs.city }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          city: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        value={ locationHrs.state }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          state: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        value={ locationHrs.zip }
                        onChange={ (e) => setLocationHrs(prev => ({
                          ...prev,
                          zip: e.target.value
                        })) }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
              >
                Update
              </button>
            </div>
          </div>

        ))
      }


    </form>
  )
}

export default SchedulerHours