'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Container } from '@components/HomePage/Container'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'

import
{
  IdentificationIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline'
import { Notifi, notifi } from '@components/Notifications/Notify'

const ShopPage = ({ params }) =>
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
  // ====================================== Set shop data
  const [ shop, setShop ] = useState()

  useEffect(() =>
  {
    const getShop = () =>
    {
      session?.shops.length &&
        session?.shops.map(shop =>
        {
          if (shop._id.includes(params.id))
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
              zip: shop?.address.zip
            })
          }
        })
    }

    getShop()

  }, [ session ])

  // ======================================= End set shop data
  // ======================================= side navigation and page
  const [ page, setPage ] = useState('Shop Details')
  const sideNav = [
    { name: 'Appointments', icon: CalendarDaysIcon },
    { name: 'Team Members', icon: UserGroupIcon },
    { name: 'Shop Details', icon: IdentificationIcon },
    { name: 'Integrations', icon: PuzzlePieceIcon }
  ]
  // ======================================= End side navigation and page
  // ======================================= Update shop details
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
  // ======================================= End Update shop details

  return (
    <Container>
      <Notifi data={ { state: notify, setState: setNotify } } />

      <TitleHeading title={ shop?.name } />

      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              { sideNav.map((item) => (
                <li key={ item.name }>
                  <button
                    className={ `${ page === item.name ?
                      'bg-primary-100 text-primary-300'
                      :
                      'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                      w-full  group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold
                    `}
                    onClick={ () => setPage(item.name) }
                  >
                    <item.icon
                      className={ `${ page === item.name ?
                        'text-primary-300'
                        : 'text-gray-400 group-hover:text-primary-300' }
                        h-6 w-6 shrink-0
                      `}
                      aria-hidden="true"
                    />
                    { item.name }
                  </button>
                </li>
              ))
              }
            </ul>
          </nav>
        </aside>

        {
          shop &&
          page === 'Shop Details' &&

          <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
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
                            value={ shop.name }
                            onChange={ (e) =>
                            {
                              setShop(prev => ({
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
                            value={ shop.nickname }
                            onChange={ (e) =>
                            {
                              setShop(prev => ({
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
                              value={ shop.email }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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
                            value={ shop.phone }
                            onChange={ (e) =>
                            {
                              setShop(prev => ({
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
                            value={ shop.website }
                            onChange={ (e) =>
                            {
                              setShop(prev => ({
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
                              value={ shop.address1 }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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
                              value={ shop.address2 }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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
                              value={ shop.city }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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
                              value={ shop.state }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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
                              value={ shop.zip }
                              onChange={ (e) =>
                              {
                                setShop(prev => ({
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

        }

      </div>
    </Container>
  )
}

export default ShopPage