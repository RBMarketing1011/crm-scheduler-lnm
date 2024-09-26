'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const AccountProfilePage = () =>
{
  const { data: session, update: refresh } = useSession()

  const [ userInfo, setUserInfo ] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  })

  useEffect(() =>
  {
    session && setUserInfo({
      id: session?.user._id,
      firstname: session?.user.firstname === null ? '' : session?.user.firstname,
      lastname: session?.user.lastname === null ? '' : session?.user.lastname,
      email: session?.user.email === null ? '' : session?.user.email,
      phone: session?.user.phone === null ? '' : session?.user.phone,
      address1: session?.user.address.address1 === null ? '' : session?.user.address.address1,
      address2: session?.user.address.address2 === null ? '' : session?.user.address.address2,
      city: session?.user.address.city === null ? '' : session?.user.address.city,
      state: session?.user.address.state === null ? '' : session?.user.address.state,
      zip: session?.user.address.zip === null ? '' : session?.user.address.zip
    })

  }, [ session ])

  const submitForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const result = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees/updatesettings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })

      const res = await result.json()

      if (res.success)
      {
        toast.success(res.success)
        refresh
      } else if (res.error)
      {
        toast.error(res.error)
      }
    } catch (error)
    {
      toast.error(error.message)
    }
  }

  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-primary-300">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Use a permanent email address where you can receive notifications.
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={ submitForm }>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-grey-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ userInfo.firstname }
                      onChange={ (e) =>
                      {
                        setUserInfo(prev => ({
                          ...prev,
                          firstname: e.target.value
                        }))
                      } }
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-grey-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                      value={ userInfo.lastname }
                      onChange={ (e) =>
                      {
                        setUserInfo(prev => ({
                          ...prev,
                          lastname: e.target.value
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
                        value={ userInfo.email }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
                            ...prev,
                            email: e.target.value
                          }))
                        } }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-grey-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ userInfo.phone }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
                            ...prev,
                            phone: e.target.value
                          }))
                        } }
                      />
                    </div>
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
                        value={ userInfo.address1 }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
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
                        value={ userInfo.address2 }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
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
                        value={ userInfo.city }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
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
                        value={ userInfo.state }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
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
                        value={ userInfo.zip }
                        onChange={ (e) =>
                        {
                          setUserInfo(prev => ({
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccountProfilePage