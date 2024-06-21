import
{
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'

import { EyeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Button from '../Button'
import NoData from '../NoData'

const CustomerAppts = ({ data: appointments }) =>
{
  return (
    <div className="w-full h-[440px] overflow-y-scroll pr-5">
      <ol className="divide-y divide-gray-300 text-sm ">
        {
          appointments &&
            appointments.length > 0 ?
            appointments.map(appt => (

              <li key={ appt._id } className="relative flex space-x-6 py-6 xl:static">
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{ appt.name }</h3>
                  <dl className="mt-2 flex flex-col text-gray-500">
                    <div className="flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </dt>
                      <dd>
                        <time dateTime={ appt.datetime }>
                          { appt.date } at { appt.time }
                        </time>
                      </dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Location</span>
                        <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </dt>
                      <dd>{ appt.shop }</dd>
                    </div>
                  </dl>
                </div>
                <Link href='#' className='text-primary-300 self-center '>
                  <Button
                    text='View'
                    icon={ <EyeIcon className='h-5 w-5' /> }
                  />
                </Link>
              </li>

            ))

            :

            <NoData
              data={ {
                title: 'No Appointments Found',
                text: 'Your upcoming appointments will populate here once they are scheduled',
                icon: CalendarDaysIcon
              } }
            />
        }
      </ol>
    </div>
  )
}

export default CustomerAppts