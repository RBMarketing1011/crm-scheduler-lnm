'use client'

import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@config/providers/context/UserContext'
import Link from 'next/link'

import
{
  GlobeAmericasIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const SchedulerSidebar = ({ accountId }) =>
{
  const { sessionState } = useContext(UserContext)
  const [ session ] = sessionState

  const pathname = usePathname()

  return (
    <aside className="lg:fixed lg:top-15 flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
      <nav className="flex-none px-4 sm:px-6 lg:px-0 mb-5 lg:mb-0">
        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">

          <li className='lg:mb-10'>
            <a
              href={ `/account/${ accountId }/scheduler` }
              className={ `${ pathname === `/account/${ accountId }/scheduler` ?
                'bg-primary-100 text-primary-300'
                :
                'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                      w-full  group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold
                    `}
            >
              <ClipboardDocumentListIcon
                className={ `${ pathname === `/account/${ accountId }/scheduler/instructions` ?
                  'text-primary-300'
                  : 'text-gray-400 group-hover:text-primary-300' }
                        h-6 w-6 shrink-0
                      `}
                aria-hidden="true"
              />
              Instructions
            </a>
          </li>

          <h3 className='hidden lg:block text-xs font-semibold text-primary-300'>Locations</h3>
          {
            session?.locations?.map(location => (

              session?.user?.employeeRole === 'Owner' ||
                session?.user?.shops === 'all' ?

                <li key={ location._id }>
                  <Link
                    href={ `/account/${ session?.user?.accountId }/scheduler/${ location._id }` }
                    className={ `${ pathname.includes(`/account/${ session?.user?.accountId }/scheduler/${ location._id }`)
                      ? 'bg-primary-100 text-primary-300'
                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100'
                      } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold` }
                  >
                    <span
                      className={ `${ pathname === `/account/${ session?.user?.accountId }/locations/${ location._id }`
                        ? 'text-primary-300 border-primary-300'
                        : 'text-gray-700 border-gray-200' } group-hover:border-primary-300 group-hover:text-primary-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                                    `}
                    >
                      { location.nickname.slice(0, 1) }
                    </span>
                    <span className="truncate inline-flex">{ location.nickname }</span>
                  </Link>
                </li>

                :

                session?.user?.shops?.includes(location.name) &&

                <li key={ location._id }>
                  <Link
                    href={ `/account/${ session?.user?.accountId }/scheduler/${ location._id }` }
                    className={ `${ pathname.includes(`/account/${ session?.user?.accountId }/scheduler/${ location._id }`)
                      ? 'bg-primary-100 text-primary-300'
                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100'
                      } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold` }
                  >
                    <span
                      className={ `${ pathname === `/account/${ session?.user?.accountId }/locations/${ location._id }`
                        ? 'text-primary-300 border-primary-300'
                        : 'text-gray-700 border-gray-200' } group-hover:border-primary-300 group-hover:text-primary-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                                    `}
                    >
                      { location.nickname.slice(0, 1) }
                    </span>
                    <span className="truncate inline-flex">{ location.nickname }</span>
                  </Link>
                </li>

            ))
          }

        </ul>
      </nav>
    </aside>
  )
}

export default SchedulerSidebar