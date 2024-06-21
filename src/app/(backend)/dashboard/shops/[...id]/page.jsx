'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Container from '@components/Dashboard/Container'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'

import
{
  IdentificationIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline'
import { IoIosPeople } from "react-icons/io"
import { Notifi, notifi } from '@components/Notifications/Notify'
import NoData from '@components/Dashboard/NoData'
import PopupForm from '@components/Dashboard/Popups/PopupForm'
import DeleteItemPopup from '@components/Dashboard/Popups/DeleteItemPopup'
import Button from '@components/Dashboard/Button'

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
  // ======================================= side navigation and page
  const [ page, setPage ] = useState('Appointments')
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
  // ================================= PopupForm
  // For adding employee
  const [ openPopupForm, setOpenPopupForm ] = useState(false)
  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    shops: shop?.name,
    employeeRole: '',
  })
  // For Editing Employee
  const [ openEditEmployeePopupForm, setEditEmployeeOpenPopupForm ] = useState(false)
  const [ editEmployeeData, setEditEmployeeData ] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    shops: shop?.name,
    employeeRole: '',
  })
  // ================================= PopupForm
  // ================================= Delete Employee 
  const [ showDeleteEmployee, setShowDeleteEmployee ] = useState(false)
  const [ deleteEmployeeData, setDeleteEmployeeData ] = useState({
    id: '',
    accountId: '',
    url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
  })
  // ================================= End Delete Employee 
  // ================================= Options for adding shops employee has access to
  let shopsEmployees = session?.employees.filter(el =>
  {
    return el.shops === shop?.name || el.shops === 'All'
  })
  // ================================= End Options for adding shops employee has access to 

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
            page === 'Appointments' ?

            <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
              <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                <TitleHeading title='Appointments' />
              </div>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-primary-300">Today&#39;s Appointments</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the appoinments scheduled for today.
                  </p>
                </div>
              </div>
              <div className="-mx-4 mt-8 sm:-mx-0">

                {
                  session?.appts &&
                    session?.appts.length > 0 ?

                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Date & Time
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0"
                          >
                            Shop
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0"
                          >
                            Name
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Vehicle
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Description
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">View Full Appointment</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {
                          session?.appts.map(appt => (
                            <tr key={ appt.id }>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { convertDate(appt.dropoffTime) }<br />{ convertTime(appt.dropoffTime) }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { shops[ 0 ].name }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { customers[ 2 ].firstName }<br />{ customers[ 2 ].lastName }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { vehicles[ 0 ].year }<br />{ vehicles[ 0 ].make }<br />{ vehicles[ 0 ].model }
                              </td>
                              <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { appt.description }
                              </td>
                              <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <button
                                  className="text-primary-300 hover:text-primary-500"
                                  onClick={ () => setOpen(true) }
                                >
                                  Full Details<span className="sr-only">Appointment</span>
                                </button>
                              </td>
                            </tr>

                          ))
                        }
                      </tbody>
                    </table>

                    :

                    <NoData
                      data={ {
                        title: 'No Appointments Yet',
                        text: 'You do not have any scheduled appointments yet. Please check back in later.',
                        icon: CalendarDaysIcon
                      } }
                    />
                }

              </div>
            </main>

            :

            page === 'Team Members' ?

              <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
                <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                  <TitleHeading title='Team Members' />
                </div>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the employees in your account including their name, role, email and active status.
                      </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                      <button
                        type="button"
                        className="block rounded-md bg-primary-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={ () => setOpenPopupForm(true) }
                      >
                        Add employee
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {
                          shopsEmployees?.length ?

                            <table className="min-w-full divide-y divide-gray-300">
                              <thead>
                                <tr>
                                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                                    Name
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Email
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Role
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Active
                                  </th>
                                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                  </th>
                                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Delete</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {
                                  shopsEmployees.map((person) => (

                                    <tr key={ person.email }>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        { person.firstname } { person.lastname }
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        { person.email }
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        { person.employeeRole }
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        { person.emailVerified ? 'True' : 'Acceptance Pending' }
                                      </td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button
                                          className="text-slate-500 hover:text-slate-900"
                                          onClick={ () =>
                                          {
                                            setEditEmployeeData({
                                              id: person._id,
                                              firstname: person.firstname,
                                              lastname: person.lastname,
                                              email: person.email,
                                              shops: person.shops,
                                              employeeRole: person.employeeRole,
                                            })

                                            setEditEmployeeOpenPopupForm(true)
                                          } }
                                        >
                                          Edit
                                          <span className="sr-only">
                                            Edit { person.firstname } { person.lastname }
                                          </span>
                                        </button>
                                      </td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button
                                          className="text-red-500 hover:text-primary-500"
                                          onClick={ () =>
                                          {
                                            setDeleteEmployeeData(prev => ({
                                              ...prev,
                                              id: person._id,
                                              accountId: session?.account._id
                                            }))

                                            setShowDeleteEmployee(true)
                                          } }
                                        >
                                          Delete
                                          <span className="sr-only">
                                            Delete
                                            { person.firstname } { person.lastname }
                                          </span>
                                        </button>
                                      </td>
                                    </tr>

                                  ))
                                }
                              </tbody>
                            </table>

                            :

                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                              <IoIosPeople className='text-6xl text-primary-300' />
                              <h3 className="mt-2 text-sm font-semibold text-gray-900">No Employees</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Get started by adding some employees to your account.
                              </p>
                              <Button
                                text='Add Employee'
                                onClick={ () => setEditEmployeeOpenPopupForm(true) }
                              />
                            </div>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </main>

              :

              page === 'Shop Details' ?

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

                :

                page === 'Integrations' &&

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
                </main>

        }

      </div>


      {/* Modal for Add Employee Form */ }
      <PopupForm
        title='Add Employee'
        openPopupState={ { state: openPopupForm, setState: setOpenPopupForm } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
          method: 'POST',
          body: JSON.stringify({ employee: formData, accountId: session?.user?.accountId })
        } }
        notifiSetState={ setNotify }
        textFields={ [
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'First Name',
            value: formData.firstname,
            required: true,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                firstname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Last Name',
            value: formData.lastname,
            required: true,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                lastname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'email',
            label: 'Email',
            value: formData.email,
            required: true,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'select',
            label: 'Shops',
            options: [ shop?.name ],
            required: true,
            value: formData.shops,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                shops: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'select',
            label: 'Employee Role',
            options: [
              'Employee',
              'Lead',
              'Manager',
              'Admin'
            ],
            required: true,
            value: formData.employeeRole,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                employeeRole: e.target.value
              }))
            }
          }
        ] }
      />



      {/* Modal for Edit Employee Form */ }
      <PopupForm
        title='Edit Employee'
        openPopupState={ { state: openEditEmployeePopupForm, setState: setEditEmployeeOpenPopupForm } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees/details`,
          method: 'PUT',
          body: JSON.stringify({ employee: editEmployeeData, accountId: session?.user?.accountId })
        } }
        notifiSetState={ setNotify }
        textFields={ [
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'First Name',
            value: editEmployeeData.firstname,
            required: true,
            onChange: (e) =>
            {
              setEditEmployeeData(prev => ({
                ...prev,
                firstname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Last Name',
            value: editEmployeeData.lastname,
            required: true,
            onChange: (e) =>
            {
              setEditEmployeeData(prev => ({
                ...prev,
                lastname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'email',
            label: 'Email',
            value: editEmployeeData.email,
            required: true,
            onChange: (e) =>
            {
              setEditEmployeeData(prev => ({
                ...prev,
                email: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'select',
            label: 'Shops',
            options: [ shop?.name ],
            required: true,
            value: editEmployeeData.shops,
            onChange: (e) =>
            {
              setEditEmployeeData(prev => ({
                ...prev,
                shops: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'select',
            label: 'Employee Role',
            options: [
              'Employee',
              'Lead',
              'Manager',
              'Admin'
            ],
            required: true,
            value: editEmployeeData.employeeRole,
            onChange: (e) =>
            {
              setEditEmployeeData(prev => ({
                ...prev,
                employeeRole: e.target.value
              }))
            }
          }
        ] }
      />


      {/* Delete Employee Popup Confirmation */ }
      <DeleteItemPopup
        state={ showDeleteEmployee }
        setState={ setShowDeleteEmployee }
        item='Employee'
        data={ deleteEmployeeData }
      />


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


    </Container>
  )
}

export default ShopPage