'use client'

import { useState } from 'react'
import Container from '@components/Dashboard/Container'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'

import
{
  getAllAppts,
  getAllCustomers,
  getRepairOrders,
  getAllEmployees,
  getAllVehicles,
  getAllShops
} from '@sampleData/sample'

const tabs = [
  { name: 'Overview' },
  { name: 'Appointments' },
  { name: 'Customers' },
  { name: 'Repair Orders' },
  { name: 'Employees' },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const Page = () =>
{
  const [ page, setPage ] = useState('Overview')

  const appts = getAllAppts.content
  const customers = getAllCustomers.content
  const vehicles = getAllVehicles.content
  const employees = getAllEmployees.content
  const repairOrders = getRepairOrders.content
  const shops = getAllShops

  const convertDate = (x) =>
  {
    const d = new Date(x).toLocaleDateString()
    return d
  }

  const convertTime = (x) =>
  {
    const t = new Date(x).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return t
  }

  return (
    <Container>
      <TitleHeading title='Blairsville' />
      <div className="border-b border-gray-200 pb-5 sm:pb-0">
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-300 focus:outline-none focus:ring-primary-300 sm:text-sm"
              defaultValue={ tabs.find(tab => page === tab.name) }
            >
              {
                tabs.map(tab => (

                  <option key={ tab.name } value={ tab.name }>{ tab.name }</option>

                ))
              }
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {
                tabs.map(tab => (

                  <button
                    key={ tab.name }
                    className={ `
                      ${ page === tab.name
                        ? 'border-primary-300 text-primary-300'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' }
                      whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium
                    `}
                    aria-current={ page === tab.name ? 'page' : undefined }
                    onClick={ () => setPage(tab.name) }
                  >
                    { tab.name }
                  </button>

                ))
              }
            </nav>
          </div>
        </div>
      </div>

      {
        page === 'Overview' ?

          <h1>Overview</h1>

          :

          page === 'Appointments' ?

            <div className="w-full">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-primary-300">
                    Appointments
                  </h1>
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
                    {
                      appts.map(appt => (

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
              </div>
            </div>

            :

            page === 'Customers' ?

              <div className="w-full">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-primary-300">
                      Customers
                    </h1>
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
                      {
                        appts.map(appt => (

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
                </div>
              </div>

              :

              page === 'Repair Orders' ?

                <div className="w-full">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-primary-300">
                        Repair Orders
                      </h1>
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
                            Status
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0"
                          >
                            Customer Name
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Vehicle
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Tech
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Miles In - Out
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Total Sale
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">View Full Appointment</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {
                          repairOrders.map(ro => (

                            <tr key={ ro.id }>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { convertDate(ro.appointmentStartTime) }<br />{ convertTime(ro.appointmentStartTime) }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { ro.repairOrderStatus.name }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { customers[ 2 ].firstName }<br />{ customers[ 2 ].lastName }
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { vehicles[ 0 ].year }<br />{ vehicles[ 0 ].make }<br />{ vehicles[ 0 ].model }
                              </td>
                              <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { employees[ 0 ].name }
                              </td>
                              <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                In: { ro.milesIn }<br />
                                Out: { ro.milesOut }
                              </td>
                              <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                ${ ro.feeTotal }
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
                  </div>
                </div>

                :

                page === 'Employees' &&


                <div className="w-full">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-primary-300">
                        Employees
                      </h1>
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
                        {
                          appts.map(appt => (

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
                  </div>
                </div>
      }

    </Container>
  )
}

export default Page