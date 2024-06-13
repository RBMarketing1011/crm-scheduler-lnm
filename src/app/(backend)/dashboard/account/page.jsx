'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { IoIosPeople } from "react-icons/io"
import
{
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import Container from '@components/Dashboard/Container'

import Button from '@components/Dashboard/Button'
import PopupForm from '@components/Dashboard/Popups/PopupForm'
import { Notifi, notifi } from '@components/Notifications/Notify'
import DeleteItemPopup from '@components/Dashboard/Popups/DeleteItemPopup'

const navigation = [
  { name: 'Security', icon: FingerPrintIcon },
  { name: 'Plan', icon: CubeIcon },
  { name: 'Billing', icon: CreditCardIcon },
  { name: 'Team Members', icon: UsersIcon },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function Page ()
{
  const [ twoFA, setTwoFA ] = useState(true)
  const [ automaticTimezoneEnabled, setAutomaticTimezoneEnabled ] = useState(false)
  const [ page, setPage ] = useState('Security')

  const { data: session } = useSession()

  // ================================= PopupForm
  // For Notifications
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })
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
    new: '',
    confirm: ''
  })

  const updatePw = async () =>
  {
    if (!changePw.current || !changePw.new || !changePw.confirm)
    {
      notifi.error('Please fill out all password fields', setNotify)
    }
  }
  // ================================= Change/Update Password

  return (
    <Container>
      <Notifi data={ { state: notify, setState: setNotify } } />

      <TitleHeading title='Account Settings' />
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
                          value={ changePw.new }
                          onChange={ (e) => setChangePw(prev => ({
                            ...prev,
                            new: e.target.value
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
                    <div
                      className="pt-6 sm:flex sm:justify-end font-bold text-primary-300 hover:cursor-pointer hover:text-primary-500"
                      onClick={ () => setShowPw(!showPw) }
                    >
                      { showPw ? 'Hide Passwords' : 'Show Passwords' }
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


            page === 'Plan' ?

              <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
                <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                  <TitleHeading title='Plan' />
                </div>
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Current Plan
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      This account is subscribed to
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                      <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          Business Essentials
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="text-gray-900">$99 /mo</div>
                          <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                            Update
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Renewal
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Date your plan renews
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                      <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          April 31, 2023
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="text-gray-900">PNC **** 4561</div>
                          <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                            Update
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

                    <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                      <li className="flex justify-between gap-x-6 py-6">
                        <div className="font-medium text-gray-900">QuickBooks</div>
                        <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                          Update
                        </button>
                      </li>
                    </ul>

                    <div className="flex border-t border-gray-100 pt-6">
                      <button type="button" className="text-sm font-semibold leading-6 text-primary-300 hover:text-primary-500">
                        <span aria-hidden="true">+</span> Add another application
                      </button>
                    </div>
                  </div>
                </div>
              </main>

              :


              page === 'Billing' ?

                <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
                  <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                    <TitleHeading title='Billing' />
                  </div>
                  {/* Debit / Credit Cards */ }
                  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Debit / Credit Cards
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">Connect cards to your account.</p>

                      <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li className="flex justify-between gap-x-6 py-6">
                          <div className="font-medium text-gray-900">PNC **** 4561</div>
                          <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                            Update
                          </button>
                        </li>
                        <li className="flex justify-between gap-x-6 py-6">
                          <div className="font-medium text-gray-900">Bank of America **** 9816</div>
                          <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                            Update
                          </button>
                        </li>
                      </ul>

                      <div className="flex border-t border-gray-100 pt-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-primary-300 hover:text-primary-500">
                          <span aria-hidden="true">+</span> Add another card
                        </button>
                      </div>
                    </div>

                    {/* Billing Address */ }
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Billing Address</h2>

                      <ul role="list" className="mt-3 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li className="flex justify-between gap-x-6 py-6">
                          <div className="font-medium text-gray-900">2396 Greendale Blvd Hillside, CN 51795</div>
                          <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                            Update
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                      <div className="border-b border-gray-200 bg-white pb-2 mb-10">
                        <TitleHeading title='Invoices' />
                      </div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-2 mb-5">
                        Upcoming Invoice
                      </h2>
                      <div className="w-full">
                        <h2 className="sr-only">Summary</h2>
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                          <dl className="flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                              <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$99.00</dd>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
                              <dt className="sr-only">Status</dt>
                              <dd className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
                                Upcoming
                              </dd>
                            </div>
                            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                              <dt className="flex-none">
                                <span className="sr-only">Client</span>
                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Due date</span>
                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">
                                <time dateTime="2023-01-31">April 31, 2023</time>
                              </dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none justify-between items-center gap-x-4 px-6 pb-6">
                              <div className='flex gap-4'>
                                <dt className="flex-none">
                                  <span className="sr-only">Status</span>
                                  <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd className="text-sm leading-6 text-gray-500">
                                  PNC **** 4561
                                </dd>
                              </div>
                              <a href="#" className="text-sm font-semibold leading-6 text-primary-300 hover:text-primary-500">
                                Change payment method
                              </a>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>

                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                      <div className='w-full flex justify-between items-center border-b border-gray-200 pb-2 mb-5'>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Previous Invoices
                        </h2>
                        <div className="text-base font-semibold leading-7 text-gray-900">
                          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            View All <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
                        <h2 className="sr-only">Summary</h2>
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                          <dl className="flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                              <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$99.00</dd>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
                              <dt className="sr-only">Status</dt>
                              <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Paid
                              </dd>
                            </div>
                            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                              <dt className="flex-none">
                                <span className="sr-only">Client</span>
                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm font-medium leading-6 text-gray-900">
                                Alex Curren
                              </dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Due date</span>
                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">
                                <time dateTime="2023-01-31">January 31, 2023</time>
                              </dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Status</span>
                                <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">Paid with PNC **** 4561</dd>
                            </div>
                          </dl>
                          <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                              Download receipt <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                          <dl className="flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                              <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$99.00</dd>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
                              <dt className="sr-only">Status</dt>
                              <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Paid
                              </dd>
                            </div>
                            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                              <dt className="flex-none">
                                <span className="sr-only">Client</span>
                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Due date</span>
                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">
                                <time dateTime="2023-01-31">Feburary 31, 2023</time>
                              </dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Status</span>
                                <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">Paid with PNC **** 4561</dd>
                            </div>
                          </dl>
                          <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                              Download receipt <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                          <dl className="flex flex-wrap">
                            <div className="flex-auto pl-6 pt-6">
                              <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$99.00</dd>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
                              <dt className="sr-only">Status</dt>
                              <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Paid
                              </dd>
                            </div>
                            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                              <dt className="flex-none">
                                <span className="sr-only">Client</span>
                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Due date</span>
                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">
                                <time dateTime="2023-01-31">March 31, 2023</time>
                              </dd>
                            </div>
                            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                              <dt className="flex-none">
                                <span className="sr-only">Status</span>
                                <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                              </dt>
                              <dd className="text-sm leading-6 text-gray-500">Paid with PNC **** 4561</dd>
                            </div>
                          </dl>
                          <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                              Download receipt <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>

                :


                page === 'Team Members' &&

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

    </Container>
  )
}