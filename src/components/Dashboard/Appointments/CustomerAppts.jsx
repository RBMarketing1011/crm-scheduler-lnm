import
{
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'

import { EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Button from '../Button'

const appointments = [
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '9:00 AM',
    datetime: '2022-01-10T09:00',
    name: 'Leslie Alexander',
    shop: 'Blairsville',
  },
  {
    id: 2,
    date: 'January 10th, 2022',
    time: '9:45 AM',
    datetime: '2022-01-10T09:45',
    name: 'Russ Carlson',
    shop: 'Blairesville',
  },
  {
    id: 3,
    date: 'January 10th, 2022',
    time: '10:15 AM',
    datetime: '2022-01-10T10:15',
    name: 'Jack Romero',
    shop: 'Cornerstone',
  },
  {
    id: 4,
    date: 'January 10th, 2022',
    time: '2:00 PM',
    datetime: '2022-01-10T14:00',
    name: 'Francis Bushner',
    shop: 'Thomaston',
  },
  // More meetings...
]

const CustomerAppts = () =>
{
  return (
    <div className="w-full h-[440px] overflow-y-scroll pr-5">
      <ol className="divide-y divide-gray-300 text-sm ">
        {
          appointments.map(appt => (
            <li key={ appt.id } className="relative flex space-x-6 py-6 xl:static">
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
          )) }
      </ol>
    </div>
  )
}

export default CustomerAppts