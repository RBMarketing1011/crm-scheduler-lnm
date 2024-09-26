'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import TitleHeading from '@components/atom/Headings/TitleHeading'

const AccountSettingsPage = () =>
{
  const { data: session, update: refresh } = useSession()

  const [ acctInfo, setAcctInfo ] = useState({
    id: '',
    name: '',
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
    session && setAcctInfo({
      id: session?.account?._id,
      name: session?.account?.name || '',
      email: session?.account?.email || '',
      phone: session?.account?.phone || '',
      address1: session?.account?.address?.address1 || '',
      address2: session?.account?.address?.address2 || '',
      city: session?.account?.address?.city || '',
      state: session?.account?.address?.state || '',
      zip: session?.account?.address?.zip || '',
    })

  }, [ session ])

  const submitCompanyInfoForm = async (e) =>
  {
    e.preventDefault()

    const req = await fetch('/api/account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(acctInfo),
    })

    const res = await req.json()

    if (res.error)
    {
      toast.error(res.error)
    } else if (res.success)
    {
      toast.success(res.success)
      refresh()
    }
  }

  return (
    <form className='mt-4' onSubmit={ (e) => submitCompanyInfoForm(e) }>
      <TitleHeading title='Company Profile' />
      <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4 border-t border-grey-200 mt-4">
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-primary-300">Company Information</h2>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">

                  <div className="col-span-full">
                    <label htmlFor="company-name" className="block text-sm font-medium leading-6 text-grey-900">
                      Company Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="company-name"
                        id="company-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                        value={ acctInfo.name }
                        onChange={ (e) =>
                        {
                          setAcctInfo(prev => ({
                            ...prev,
                            name: e.target.value
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
                          value={ acctInfo.email }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
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
                          value={ acctInfo.phone }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
                              ...prev,
                              phone: e.target.value
                            }))
                          } }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="mt-10 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-primary-300">HQ Address</h2>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">

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
                          value={ acctInfo.address1 }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
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
                          value={ acctInfo.address2 }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
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
                        <select
                          name="city"
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          value={ acctInfo.city }
                          onChange={ (e) =>
                          {
                            setAcctInfo((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          } }
                        >
                          <option value="" disabled>Select a state</option>
                          <option value="AL">AL</option>
                          <option value="AK">AK</option>
                          <option value="AZ">AZ</option>
                          <option value="AR">AR</option>
                          <option value="CA">CA</option>
                          <option value="CO">CO</option>
                          <option value="CT">CT</option>
                          <option value="DE">DE</option>
                          <option value="FL">FL</option>
                          <option value="GA">GA</option>
                          <option value="HI">HI</option>
                          <option value="ID">ID</option>
                          <option value="IL">IL</option>
                          <option value="IN">IN</option>
                          <option value="IA">IA</option>
                          <option value="KS">KS</option>
                          <option value="KY">KY</option>
                          <option value="LA">LA</option>
                          <option value="ME">ME</option>
                          <option value="MD">MD</option>
                          <option value="MA">MA</option>
                          <option value="MI">MI</option>
                          <option value="MN">MN</option>
                          <option value="MS">MS</option>
                          <option value="MO">MO</option>
                          <option value="MT">MT</option>
                          <option value="NE">NE</option>
                          <option value="NV">NV</option>
                          <option value="NH">NH</option>
                          <option value="NJ">NJ</option>
                          <option value="NM">NM</option>
                          <option value="NY">NY</option>
                          <option value="NC">NC</option>
                          <option value="ND">ND</option>
                          <option value="OH">OH</option>
                          <option value="OK">OK</option>
                          <option value="OR">OR</option>
                          <option value="PA">PA</option>
                          <option value="RI">RI</option>
                          <option value="SC">SC</option>
                          <option value="SD">SD</option>
                          <option value="TN">TN</option>
                          <option value="TX">TX</option>
                          <option value="UT">UT</option>
                          <option value="VT">VT</option>
                          <option value="VA">VA</option>
                          <option value="WA">WA</option>
                          <option value="WV">WV</option>
                          <option value="WI">WI</option>
                          <option value="WY">WY</option>
                        </select>
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
                          value={ acctInfo.state }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
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
                          value={ acctInfo.zip }
                          onChange={ (e) =>
                          {
                            setAcctInfo(prev => ({
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
                    Save Company Info
                  </button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
    </form>
  )
}

export default AccountSettingsPage