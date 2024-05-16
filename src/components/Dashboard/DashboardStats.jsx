import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { DocumentPlusIcon, DocumentMinusIcon, WrenchScrewdriverIcon, BanknotesIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Appointments', stat: '59', icon: DocumentPlusIcon, change: '12', changeType: 'increase' },
  { id: 2, name: 'Appointments Cancelled', stat: '3', icon: DocumentMinusIcon, change: '5', changeType: 'decrease' },
  { id: 3, name: 'Average repair time', stat: '3.65', icon: WrenchScrewdriverIcon, change: '5.4%', changeType: 'increase' },
  { id: 4, name: 'Avg. Repair Ticket', stat: '$963.21', icon: BanknotesIcon, change: '$79', changeType: 'decrease' },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const DashboardStats = () =>
{
  return (
    <div>
      <div className="relative flex items-center rounded-md bg-white items-stretch">
        <button
          type="button"
          className="flex h-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:text-gray-500 focus:relative w-9 hover:bg-gray-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="border-y border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative flex h-9 w-12 items-center justify-center"
        >
          Week
        </button>
        <button
          type="button"
          className="flex h-9 items-center justify-center rounded-r-md border-y border-r border-gray-300 text-gray-400 hover:text-gray-500 focus:relative w-9 pl-0 hover:bg-gray-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <dl className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
        { stats.map((item) => (
          <div
            key={ item.id }
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow-[0_0_10px_lightgrey] sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-300 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{ item.name }</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{ item.stat }</p>
              <p
                className={ classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                ) }
              >
                { item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                ) }

                <span className="sr-only"> { item.changeType === 'increase' ? 'Increased' : 'Decreased' } by </span>
                { item.change }
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-300 hover:text-primary-500">
                    View all<span className="sr-only"> { item.name } stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        )) }
      </dl>
    </div>
  )
}

export default DashboardStats