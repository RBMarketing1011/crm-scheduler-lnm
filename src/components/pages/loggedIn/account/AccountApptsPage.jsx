'use client'

// Context 
import { useContext } from 'react'

import Container from '@components/atom/Container'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import { convertDate, convertTime } from '@lib/helpers/apptDateTime/convertDateTime'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Today', count: '3' },
  { name: 'Tomorrow', count: '2' },
  { name: 'Next Week', count: '12' },
  { name: 'Previous Week' },
  { name: 'Previous Month' },
  { name: 'Year To Date' },
]

// Sample Data
import { getAllShops } from '@sampleData/sample'
import { getAllAppts } from '@sampleData/sample'
import { getAllCustomers } from '@sampleData/sample'
import { getAllVehicles } from '@sampleData/sample'

const AccountApptsPage = () =>
{
  const [ tab, setTab ] = useState('All Shops')
  const [ page, setPage ] = useState('Today')
  const [ open, setOpen ] = useState(false)

  const shops = getAllShops
  const appts = getAllAppts.content
  const customers = getAllCustomers.content
  const vehicles = getAllVehicles.content

  return (
    <Container>
      <TitleHeading title='Appointments' />
      <div className="border-b border-gray-200 pb-5 sm:pb-0">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Choose your view</h3>
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-300 focus:outline-none focus:ring-primary-300 sm:text-sm"
              defaultValue='All'
              onChange={ (e) => setTab(e.target.value) }
            >

              <option value='All Shops'>All Shops</option>
              {
                locations.map(location => (
                  <option key={ location.name } value={ location.name }>{ location.name }</option>
                ))
              }

            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              <button
                className={ `${ tab === 'All Shops'
                  ? 'border-primary-300 text-primary-300'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`
                }
                aria-current={ tab === 'All Shops' ? 'page' : undefined }
                onClick={ () => setTab('All Shops') }
              >
                All Shops
              </button>

              {/* Create Gap Betwee All Shops and Specific Shops */ }
              <button></button><button></button>
              {/* Create Gap Betwee All Shops and Specific Shops */ }

              {
                locations.map(location => (

                  <button
                    key={ location.name }
                    className={ ` ${ tab === location.name
                      ? 'border-primary-300 text-primary-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`
                    }
                    aria-current={ tab === location.name ? 'page' : undefined }
                    onClick={ () => setTab(location.name) }
                  >
                    { location.name }
                  </button>

                ))
              }
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-8xl lg:flex lg:gap-x-5">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">

              {
                navigation.map((item) => (

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
                      { item.name }
                      {
                        item.count &&

                        <span
                          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary-300 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white"
                          aria-hidden="true"
                        >
                          { item.count }
                        </span>
                      }
                    </button>
                  </li >

                ))
              }
            </ul >
          </nav >
        </aside >

        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-primary-300">Today&#39;s Appointments</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the appoinments scheduled for today.
              </p>
            </div>
          </div>
          <div className="-mx-4 mt-8 sm:-mx-0">
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
                { appts.map(appt => (
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
                )) }
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide Over */ }
        <Transition show={ open } as={ Fragment }>
          <Dialog className="relative z-[100]" onClose={ setOpen }>
            <TransitionChild
              as={ Fragment }
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <TransitionChild
                    as={ Fragment }
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-hidden bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <DialogTitle className="text-base font-semibold leading-6 text-primary-300">
                              Appointment Details
                            </DialogTitle>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={ () => setOpen(false) }
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 overflow-y-auto flex-1 px-4 sm:px-6">
                          <div>
                            <div className="mt-6 border-t border-gray-100">
                              <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Date & Time
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    6/15/2024 9:15AM
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Shop name
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Demo Shop 1
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Customer name
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Joshua Anderson
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    857-568-5147
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    margotfoster@example.com
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Vehicle
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">2006 Ford Focus</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Ride Option
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Loaner
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Issue Decription
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    A/C Smells Funny, Oil leak in driveway, Blinker light is out
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Drop Off Time
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    8:00 AM
                                  </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Pick Up time
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    12:30 PM
                                  </dd>
                                </div>

                              </dl>
                            </div>
                          </div>

                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>



      </div >
    </Container>
  )
}

export default AccountApptsPage