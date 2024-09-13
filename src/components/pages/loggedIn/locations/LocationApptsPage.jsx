'use client'

import { useSession } from 'next-auth/react'
import TitleHeading from '@components/atom/Headings/TitleHeading'

import
{
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

import NoData from '@components/atom/NoData'

const LocationApptsPage = () =>
{
  // ====================================== Session details
  const {
    data: session,
    update: refresh
  } = useSession()

  // ======================================= End set location data

  return (
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
  )
}

export default LocationApptsPage