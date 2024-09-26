'use client'

import { usePathname } from 'next/navigation'

import
{
  BellIcon,
  UserCircleIcon,
  UsersIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline'
import Container from '@components/atom/Container'

import TitleHeading from '@components/atom/Headings/TitleHeading'


const Layout = ({ children, params }) =>
{
  const path = usePathname()

  const { accountId, userId } = params

  console.log(accountId)

  const navigation = [
    { name: 'Profile', href: `/account/${ accountId }/users/${ userId }/settings`, icon: UserCircleIcon },
    { name: 'Security', href: `/account/${ accountId }/users/${ userId }/settings/security`, icon: FingerPrintIcon },
  ]

  return (
    <Container>
      <TitleHeading title='Settings' />
      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-48 lg:flex-none lg:border-0 lg:py-5">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">

              {
                navigation.map((item) => (

                  <li key={ item.name }>
                    <a
                      href={ item.href }
                      className={ `${ path === item.href ?
                        'bg-primary-100 text-primary-300'
                        :
                        'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                      w-full  group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold
                    `}
                    >
                      <item.icon
                        className={ `${ path === item.href ?
                          'text-primary-300'
                          : 'text-gray-400 group-hover:text-primary-300' }
                        h-6 w-6 shrink-0
                      `}
                        aria-hidden="true"
                      />
                      { item.name }
                    </a>
                  </li >

                ))
              }

            </ul >
          </nav >
        </aside >

        { children }

      </div>
    </Container>
  )
}

export default Layout