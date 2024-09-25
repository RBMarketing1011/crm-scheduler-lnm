'use client'

import { usePathname } from 'next/navigation'

import
{
  IdentificationIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline'

const ShopsSidebar = ({ accountId, locationId }) =>
{
  const pathname = usePathname()

  const sideNav = [
    { name: 'Appointments', href: `/account/${ accountId }/locations/${ locationId }/appointments`, icon: CalendarDaysIcon },
    { name: 'Details', href: `/account/${ accountId }/locations/${ locationId }/details`, icon: IdentificationIcon },
    { name: 'Team Members', href: `/account/${ accountId }/locations/${ locationId }/team`, icon: UserGroupIcon },
    { name: 'Integrations', href: `/account/${ accountId }/locations/${ locationId }/integrations`, icon: PuzzlePieceIcon }
  ]

  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">

          {
            sideNav.map((item) => (

              <li key={ item.name }>
                <a
                  href={ item.href }
                  className={ `${ pathname === item.href ?
                    'bg-primary-100 text-primary-300'
                    :
                    'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                      w-full  group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold
                    `}
                >
                  <item.icon
                    className={ `${ pathname === item.href ?
                      'text-primary-300'
                      : 'text-gray-400 group-hover:text-primary-300' }
                        h-6 w-6 shrink-0
                      `}
                    aria-hidden="true"
                  />
                  { item.name }
                </a>
              </li>

            ))
          }

        </ul>
      </nav>
    </aside>
  )
}

export default ShopsSidebar