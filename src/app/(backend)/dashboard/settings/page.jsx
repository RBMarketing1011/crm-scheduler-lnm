'use client'

import { useState, useEffect } from 'react'
import { Label, Switch, Field } from '@headlessui/react'
import
{
  BellIcon,
  UserCircleIcon,
  UsersIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline'
import { IoIosPeople } from "react-icons/io"
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'

import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import Container from '@components/Dashboard/Container'
import { useSession } from 'next-auth/react'
import { Notifi, notifi } from '@components/Notifications/Notify'
import Button from '@components/Dashboard/Button'
import PopupForm from '@components/Dashboard/Popups/PopupForm'
import DeleteItemPopup from '@components/Dashboard/Popups/DeleteItemPopup'

const navigation = [
  { name: 'Profile', icon: UserCircleIcon },
  { name: 'Security', icon: FingerPrintIcon },
  { name: 'Team Members', icon: UsersIcon },
  { name: 'Notifications', icon: BellIcon },
]

const notifications = [
  {
    title: 'Appointments',
    children: [
      "Appointment reminders",
      "Appointment booked",
      "Appointment rescheduled",
      "Appointment canceled",
    ]
  },
  {
    title: 'Miscellaneous',
    children: [
      "Special offers and promotions",
      "New feature announcements",
      "Profile information changed",
      "System maintenance alerts"
    ]
  },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function Page ()
{
  const {
    data: session,
    update: refresh
  } = useSession()

  const [ page, setPage ] = useState('Profile')

  // ======================================== For Notifi State
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })
  // ======================================== End For Notifi State

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

    session && setSliders(session?.user?.notifications)

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
        notifi.success(res.success, setNotify)
        refresh
      } else if (res.error)
      {
        notifi.error(res.error, setNotify)
      }
    } catch (error)
    {
      notifi.error(error.message, setNotify)
    }
  }

  // ======================================== For Notifications toggle
  let turnOn = true
  const [ sliders, setSliders ] = useState()

  const isSelected = (string) =>
  (
    sliders?.includes(string) ? true : false
  )
  // ======================================== End For Notifications toggle

  // ================================= PopupForm
  // For adding employee
  const [ openPopupForm, setOpenPopupForm ] = useState(false)
  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    shops: '',
    employeeRole: '',
  })
  // For Editing Employee
  const [ openEditEmployeePopupForm, setEditEmployeeOpenPopupForm ] = useState(false)
  const [ editEmployeeData, setEditEmployeeData ] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    shops: '',
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
  let shopsOptions = []
  shopsOptions.push('All')
  session?.shops?.map(el => (shopsOptions.push(el.name)))
  // ================================= End Options for adding shops employee has access to
  // ================================= Change/Update Password
  const [ showPw, setShowPw ] = useState(false)
  const [ changePw, setChangePw ] = useState({
    current: '',
    newPw: '',
    confirm: ''
  })

  const updatePw = async () =>
  {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,16}$/

    if (!changePw.current || !changePw.newPw || !changePw.confirm)
    {
      notifi.error('Please fill out all password fields', setNotify)
    } else if (!regex.test(changePw.newPw))
    {
      notifi.error("New password doesn't follow guidelines.", setNotify)
    } else if (changePw.newPw !== changePw.confirm)
    {
      notifi.error('New password does not match confirm password', setNotify)
    } else
    {
      try
      {
        const employeeId = session?.user._id

        const result = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees/updatepassword`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: changePw, employeeId })
        })

        const res = await result.json()

        if (res.success)
        {
          notifi.success(res.success, setNotify)
        } else if (res.error)
        {
          notifi.error(res.error, setNotify)
        }
      } catch (error)
      {
        notifi.error(error.message, setNotify)
      }
    }
  }
  // ================================= Change/Update Password

  return (
    <Container>

      <Notifi data={ { state: notify, setState: setNotify } } />

      <TitleHeading title='Settings' />
      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              { navigation.map((item) => (
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
                </li >
              ))
              }
            </ul >
          </nav >
        </aside >

        {
          page === 'Profile' ?

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

            :

            page === 'Security' ?

              <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
                <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                  <TitleHeading title='Security' />
                </div>
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                  <div>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Password
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          Change/Update your current password
                        </p>
                      </div>
                      <button
                        type="button"
                        className="font-semibold text-primary-300 hover:text-primary-500"
                        onClick={ updatePw }
                      >
                        Update Password
                      </button>
                    </div>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">

                      <div className="pt-6 sm:flex sm:justify-between sm:items-center">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          Current Password
                        </dt>
                        <div>
                          <label htmlFor="currentPassword" className="sr-only">
                            Password
                          </label>
                          <input
                            type={ `${ showPw ? 'text' : 'password' }` }
                            name="Current Password"
                            id="currentPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            value={ changePw.current }
                            onChange={ (e) => setChangePw(prev => ({
                              ...prev,
                              current: e.target.value
                            })) }
                          />
                        </div>
                      </div>
                      <div className="pt-6 sm:flex sm:justify-between sm:items-center">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          New Password
                        </dt>
                        <div>
                          <label htmlFor="confirmPassword" className="sr-only">
                            Password
                          </label>
                          <input
                            type={ `${ showPw ? 'text' : 'password' }` }
                            name="Confirm Password"
                            id="confirmPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            value={ changePw.newPw }
                            onChange={ (e) => setChangePw(prev => ({
                              ...prev,
                              newPw: e.target.value
                            })) }
                          />
                        </div>
                      </div>
                      <div className="pt-6 sm:flex sm:justify-between sm:items-center">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          Confirm Password
                        </dt>
                        <div>
                          <label htmlFor="newPassword" className="sr-only">
                            Password
                          </label>
                          <input
                            type={ `${ showPw ? 'text' : 'password' }` }
                            name="New Password"
                            id="newPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            value={ changePw.confirm }
                            onChange={ (e) => setChangePw(prev => ({
                              ...prev,
                              confirm: e.target.value
                            })) }
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className='col-span-full flex flex-col gap-5'>
                          <p className='text-xs'>Password guidelines:</p>
                          <div className='flex flex-wrap gap-2'>
                            <p className="text-xs flex gap-1 items-center">
                              {
                                changePw.newPw.length > 7 && changePw.newPw.length < 17 ?
                                  <FaCircleCheck className='text-green-500' />
                                  :
                                  <FaCircleXmark className='text-red-500' />
                              }
                              8-16 characters
                            </p>
                            <p className="text-xs flex gap-1 items-center">
                              {
                                changePw.newPw.search(/[A-Z]/) < 0 ?
                                  <FaCircleXmark className='text-red-500' />
                                  :
                                  <FaCircleCheck className='text-green-500' />
                              }
                              1 uppercase letter
                            </p>
                            <p className="text-xs flex gap-1 items-center">
                              {
                                changePw.newPw.search(/[a-z]/) < 0 ?
                                  <FaCircleXmark className='text-red-500' />
                                  :
                                  <FaCircleCheck className='text-green-500' />
                              }
                              1 lowercase letter
                            </p>
                            <p className="text-xs flex gap-1 items-center">
                              {
                                changePw.newPw.search(/[0-9]/) < 0 ?
                                  <FaCircleXmark className='text-red-500' />
                                  :
                                  <FaCircleCheck className='text-green-500' />
                              }
                              1 number
                            </p>
                            <p className="text-xs flex gap-1 items-center">
                              {
                                changePw.newPw.search(/[[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0 ?
                                  <FaCircleXmark className='text-red-500' />
                                  :
                                  <FaCircleCheck className='text-green-500' />
                              }
                              1 special character
                            </p>
                          </div>
                        </div>
                        <div
                          className="pt-6 sm:flex sm:justify-end font-bold text-primary-300 hover:cursor-pointer hover:text-primary-500"
                          onClick={ () => setShowPw(!showPw) }
                        >
                          { showPw ? 'Hide Passwords' : 'Show Passwords' }
                        </div>
                      </div>

                    </dl>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Delete account
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500 w-1/2">
                        No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
                      </p>
                    </div>
                    <Button text='Delete Account' />


                  </div>
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
                            session?.employees.length ?

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
                                    session?.employees.map((person) => (

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

                page === 'Notifications' &&

                <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
                  <div className="mx-auto max-w-2xl space-y-4 sm:space-y-10 lg:mx-0 lg:max-w-none">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-primary-300">
                          Notifications & Reminders
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          Choose what type of notifications to recieve.
                        </p>
                      </div>
                      <Button text='Save Changes' />
                    </div>

                    {
                      notifications.map((el, idx) => (

                        <div key={ idx } className='text-sm leading-6'>
                          <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                            { el.title }
                          </p>

                          {
                            el.children.map((child, childIdx) => (

                              <dl key={ childIdx } className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200">
                                <Field as="div" className="flex pt-2">
                                  <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                                    { child }
                                  </Label>
                                  <dd className="flex flex-auto items-center justify-end">
                                    <Switch
                                      checked={ (child) =>
                                      {
                                        isSelected(child)
                                      } }
                                      onChange={ () => console.log('change') }
                                      className={ classNames(
                                        turnOn ? 'bg-primary-300' : 'bg-gray-200',
                                        'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                                      ) }
                                    >
                                      <span
                                        aria-hidden="true"
                                        className={ classNames(
                                          turnOn ? 'translate-x-3.5' : 'translate-x-0',
                                          'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                        ) }
                                      />
                                    </Switch>
                                  </dd>
                                </Field>
                              </dl>

                            ))
                          }

                        </div>
                      ))
                    }

                  </div>
                </main>
        }

      </div >

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
            options: shopsOptions,
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
            options: shopsOptions,
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


    </Container >
  )
}