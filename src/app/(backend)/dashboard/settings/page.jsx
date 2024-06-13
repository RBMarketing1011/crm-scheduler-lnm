'use client'

import { useState } from 'react'
import { Label, Switch, Field } from '@headlessui/react'
import
{
  BellIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import Container from '@components/Dashboard/Container'
import Image from 'next/image'

const navigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function Page ()
{
  const [ page, setPage ] = useState('Profile')
  const [ appointmentReminders, setAppointmentReminders ] = useState(true)
  const [ serviceUpdates, setServiceUpdates ] = useState(true)
  const [ specialOffersAndPromotions, setSpecialOffersAndPromotions ] = useState(true)
  const [ newFeatureAnnouncements, setNewFeatureAnnouncements ] = useState(false)
  const [ accountActivityAlerts, setAccountActivityAlerts ] = useState(false)
  const [ customerFeedbackRequests, setCustomerFeedbackRequests ] = useState(false)
  const [ billingAndPaymentNotifications, setBillingAndPaymentNotifications ] = useState(true)
  const [ appointmentBooked, setAppointmentBooked ] = useState(false)
  const [ appointmentRescheduled, setAppointmentRescheduled ] = useState(true)
  const [ appointmentCanceled, setAppointmentCanceled ] = useState(false)
  const [ serviceCompleted, setServiceCompleted ] = useState(true)
  const [ newMessageReceived, setNewMessageReceived ] = useState(false)
  const [ paymentProcessed, setPaymentProcessed ] = useState(false)
  const [ planUpgradedDowngraded, setPlanUpgradedDowngraded ] = useState(true)
  const [ securitySettingsUpdated, setSecuritySettingsUpdated ] = useState(false)
  const [ profileInformationChanged, setProfileInformationChanged ] = useState(true)
  const [ systemMaintenanceAlerts, setSystemMaintenanceAlerts ] = useState(true)

  return (
    <Container>
      <TitleHeading title='User Settings' />
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
                        Use a permanent address where you can receive mail.
                      </p>
                    </div>

                    <form className="md:col-span-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full flex items-center gap-x-8">
                          <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Alt"
                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                            width={ 0 }
                            height={ 0 }
                            sizes='100vw'
                          />
                          <div>
                            <button
                              type="button"
                              className="rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                            >
                              Change avatar
                            </button>
                            <p className="mt-2 text-xs leading-5 text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                          </div>
                        </div>

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
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-grey-900">
                            Username
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-300">
                              <span className="flex select-none items-center pl-3 text-gray-600 sm:text-sm">
                                example.com/
                              </span>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-grey-600 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="janesmith"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-grey-900">
                            Timezone
                          </label>
                          <div className="mt-2">
                            <select
                              id="timezone"
                              name="timezone"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            >
                              <option>Pacific Standard Time</option>
                              <option>Eastern Standard Time</option>
                              <option>Greenwich Mean Time</option>
                            </select>
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

                  <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-3 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-primary-300">Bio</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Share something about yourself so people can get to know you.
                        <br />
                        <br />
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <form className="md:col-span-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full">
                          <label htmlFor="bio" className="block text-sm font-medium leading-6 text-white">
                            Bio
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="bio"
                              name="Bio"
                              rows='10'
                              type="password"
                              autoComplete="current-password"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex">
                        <button
                          type="submit"
                          className="rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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

            <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
              <div className="mx-auto max-w-2xl space-y-4 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div className="divide-y divide-white/5">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-primary-300">
                      Notifications & Reminders
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Choose what type of notifications to recieve.
                    </p>

                    <div className='mt-6 text-sm leading-6 pt-4'>
                      <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                        Appointments
                      </p>
                      <dl className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200">
                        <Field as="div" className="flex pt-2">
                          <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                            Appointment reminders
                          </Label>
                          <dd className="flex flex-auto items-center justify-end">
                            <Switch
                              checked={ appointmentReminders }
                              onChange={ setAppointmentReminders }
                              className={ classNames(
                                appointmentReminders ? 'bg-primary-300' : 'bg-gray-200',
                                'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                              ) }
                            >
                              <span
                                aria-hidden="true"
                                className={ classNames(
                                  appointmentReminders ? 'translate-x-3.5' : 'translate-x-0',
                                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                ) }
                              />
                            </Switch>
                          </dd>
                        </Field>
                      </dl>
                      <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                        <Field as="div" className="flex pt-2">
                          <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                            Appointment booked
                          </Label>
                          <dd className="flex flex-auto items-center justify-end">
                            <Switch
                              checked={ appointmentBooked }
                              onChange={ setAppointmentBooked }
                              className={ classNames(
                                appointmentBooked ? 'bg-primary-300' : 'bg-gray-200',
                                'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                              ) }
                            >
                              <span
                                aria-hidden="true"
                                className={ classNames(
                                  appointmentBooked ? 'translate-x-3.5' : 'translate-x-0',
                                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                ) }
                              />
                            </Switch>
                          </dd>
                        </Field>
                      </dl>
                      <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                        <Field as="div" className="flex pt-2">
                          <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                            Appointment rescheduled
                          </Label>
                          <dd className="flex flex-auto items-center justify-end">
                            <Switch
                              checked={ appointmentRescheduled }
                              onChange={ setAppointmentRescheduled }
                              className={ classNames(
                                appointmentRescheduled ? 'bg-primary-300' : 'bg-gray-200',
                                'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                              ) }
                            >
                              <span
                                aria-hidden="true"
                                className={ classNames(
                                  appointmentRescheduled ? 'translate-x-3.5' : 'translate-x-0',
                                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                ) }
                              />
                            </Switch>
                          </dd>
                        </Field>
                      </dl>
                      <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                        <Field as="div" className="flex pt-2">
                          <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                            Appointment canceled
                          </Label>
                          <dd className="flex flex-auto items-center justify-end">
                            <Switch
                              checked={ appointmentCanceled }
                              onChange={ setAppointmentCanceled }
                              className={ classNames(
                                appointmentCanceled ? 'bg-primary-300' : 'bg-gray-200',
                                'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                              ) }
                            >
                              <span
                                aria-hidden="true"
                                className={ classNames(
                                  appointmentCanceled ? 'translate-x-3.5' : 'translate-x-0',
                                  'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                ) }
                              />
                            </Switch>
                          </dd>
                        </Field>
                      </dl>
                    </div>
                  </div>
                  <div className='mt-6 border-t border-gray-200 text-sm leading-6 pt-4'>
                    <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                      Services
                    </p>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Service updates
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ serviceUpdates }
                            onChange={ setServiceUpdates }
                            className={ classNames(
                              serviceUpdates ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                serviceUpdates ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Service completed
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ serviceCompleted }
                            onChange={ setServiceCompleted }
                            className={ classNames(
                              serviceCompleted ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                serviceCompleted ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                  </div>
                  <div className='mt-6 border-t border-gray-200 text-sm leading-6 pt-4'>
                    <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                      Security
                    </p>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Account activity alerts
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ accountActivityAlerts }
                            onChange={ setAccountActivityAlerts }
                            className={ classNames(
                              accountActivityAlerts ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                accountActivityAlerts ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Billing and payment notifications
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ billingAndPaymentNotifications }
                            onChange={ setBillingAndPaymentNotifications }
                            className={ classNames(
                              billingAndPaymentNotifications ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                billingAndPaymentNotifications ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Payment proccessed
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ paymentProcessed }
                            onChange={ setPaymentProcessed }
                            className={ classNames(
                              paymentProcessed ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                paymentProcessed ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Plan upgraded/downgraded
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ planUpgradedDowngraded }
                            onChange={ setPlanUpgradedDowngraded }
                            className={ classNames(
                              planUpgradedDowngraded ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                planUpgradedDowngraded ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Security settings updated
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ securitySettingsUpdated }
                            onChange={ setSecuritySettingsUpdated }
                            className={ classNames(
                              securitySettingsUpdated ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                securitySettingsUpdated ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                  </div>
                  <div className='mt-6 border-t border-gray-200 text-sm leading-6 pt-4'>
                    <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                      Miscellaneous
                    </p>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Special offers and promotions
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ specialOffersAndPromotions }
                            onChange={ setSpecialOffersAndPromotions }
                            className={ classNames(
                              specialOffersAndPromotions ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                specialOffersAndPromotions ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          New feature announcements
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ newFeatureAnnouncements }
                            onChange={ setNewFeatureAnnouncements }
                            className={ classNames(
                              newFeatureAnnouncements ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                newFeatureAnnouncements ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Customer feedback requests
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ customerFeedbackRequests }
                            onChange={ setCustomerFeedbackRequests }
                            className={ classNames(
                              customerFeedbackRequests ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                customerFeedbackRequests ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          New message received
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ newMessageReceived }
                            onChange={ setNewMessageReceived }
                            className={ classNames(
                              newMessageReceived ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                newMessageReceived ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          Profile information changed
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ profileInformationChanged }
                            onChange={ setProfileInformationChanged }
                            className={ classNames(
                              profileInformationChanged ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                profileInformationChanged ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                    <dl className="pl-10 mt-2 space-y-6 text-sm leading-6">
                      <Field as="div" className="flex pt-2">
                        <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                          System maintenance alerts
                        </Label>
                        <dd className="flex flex-auto items-center justify-end">
                          <Switch
                            checked={ systemMaintenanceAlerts }
                            onChange={ setSystemMaintenanceAlerts }
                            className={ classNames(
                              systemMaintenanceAlerts ? 'bg-primary-300' : 'bg-gray-200',
                              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                            ) }
                          >
                            <span
                              aria-hidden="true"
                              className={ classNames(
                                systemMaintenanceAlerts ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                              ) }
                            />
                          </Switch>
                        </dd>
                      </Field>
                    </dl>
                  </div>
                </div>
              </div>
            </main>
        }

      </div >
    </Container>
  )
}