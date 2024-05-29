'use client'

import { useState } from 'react'
import { Label, Switch, SwitchGroup } from '@headlessui/react'
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

import { getAllEmployees } from '@sampleData/sample'
import Button from '@components/Dashboard/Button'

const navigation = [
  { name: 'General', href: '#', icon: UserCircleIcon },
  { name: 'Security', href: '#', icon: FingerPrintIcon },
  { name: 'Plan', href: '#', icon: CubeIcon },
  { name: 'Billing', href: '#', icon: CreditCardIcon },
  { name: 'Team Members', href: '#', icon: UsersIcon },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function Page ()
{
  const [ twoFA, setTwoFA ] = useState(true)
  const [ automaticTimezoneEnabled, setAutomaticTimezoneEnabled ] = useState(false)
  const [ page, setPage ] = useState('General')

  const people = getAllEmployees.content

  return (
    <Container>
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
          page === 'General' ?

            <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
              <div className="border-b border-gray-200 bg-white pb-2 mb-5">
                <TitleHeading title='General' />
              </div>
              <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Settings</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    This information will be used to contact you about your account.
                  </p>

                  <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">tom.cook@example.com</div>
                        <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                          Update
                        </button>
                      </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Phone Number</dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">
                          678-851-1051
                        </div>
                        <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                          Update
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Choose what language and date format to use throughout your account.
                  </p>

                  <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">English</div>
                        <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                          Update
                        </button>
                      </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">DD-MM-YYYY</div>
                        <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
                          Update
                        </button>
                      </dd>
                    </div>
                    <SwitchGroup as="div" className="flex pt-6">
                      <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                        Automatic timezone
                      </Label>
                      <dd className="flex flex-auto items-center justify-end">
                        <Switch
                          checked={ automaticTimezoneEnabled }
                          onChange={ setAutomaticTimezoneEnabled }
                          className={ classNames(
                            automaticTimezoneEnabled ? 'bg-primary-300' : 'bg-gray-200',
                            'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                          ) }
                        >
                          <span
                            aria-hidden="true"
                            className={ classNames(
                              automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',
                              'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                            ) }
                          />
                        </Switch>
                      </dd>
                    </SwitchGroup>
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
                      <button type="button" className="font-semibold text-primary-300 hover:text-primary-500">
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
                            type="password"
                            name="Current Password"
                            id="currentPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="pt-6 sm:flex sm:justify-between sm:items-center">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          Confirm Password
                        </dt>
                        <div>
                          <label htmlFor="confirmPassword" className="sr-only">
                            Password
                          </label>
                          <input
                            type="password"
                            name="Confirm Password"
                            id="confirmPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="pt-6 sm:flex sm:justify-between sm:items-center">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                          New Password
                        </dt>
                        <div>
                          <label htmlFor="newPassword" className="sr-only">
                            Password
                          </label>
                          <input
                            type="password"
                            name="New Password"
                            id="newPassword"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Two-Factor Authentication
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          Recommended for more security for your account.
                        </p>
                      </div>
                      <Switch
                        checked={ twoFA }
                        onChange={ setTwoFA }
                        className={ classNames(
                          twoFA ? 'bg-primary-300' : 'bg-gray-200',
                          'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        ) }
                      >
                        <span
                          aria-hidden="true"
                          className={ classNames(
                            twoFA ? 'translate-x-3.5' : 'translate-x-0',
                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                          ) }
                        />
                      </Switch>
                    </div>

                    <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                      <li className="flex justify-between gap-x-6 py-6">
                        <div className="font-medium text-gray-900">Google Authenticator</div>
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
                            A list of all the users in your account including their name, title, email and role.
                          </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                          <button
                            type="button"
                            className="block rounded-md bg-primary-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add user
                          </button>
                        </div>
                      </div>
                      <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead>
                                <tr>
                                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                                    Name
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Title
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Email
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                                    Certification #
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
                                { people.map((person) => (
                                  <tr key={ person.email }>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                      { person.firstName } { person.lastName }
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ person.employeeRole.name }</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ person.email }</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ person.certificationNumber }</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                      <a href="#" className="text-slate-500 hover:text-slate-900">
                                        Edit<span className="sr-only">Edit { person.firstName } { person.lastName }</span>
                                      </a>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                      <a href="#" className="text-red-500 hover:text-primary-500">
                                        Delete<span className="sr-only">Delete { person.firstName } { person.lastName }</span>
                                      </a>
                                    </td>
                                  </tr>
                                )) }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
        }

      </div >
    </Container>
  )
}