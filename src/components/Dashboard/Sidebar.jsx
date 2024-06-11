'use client'

import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import
{
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  RectangleGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog8ToothIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

import { ChevronRightIcon } from '@heroicons/react/20/solid'

import Avatar from '@images/avatars/avatar.png'

import Image from 'next/image'
import Logo from '@images/logos/lnm-logo-black.png'
import Link from 'next/link'
import LinkPopover from './LinkPopover'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RectangleGroupIcon, },
  { name: 'Account', href: '/dashboard/account', icon: HomeIcon, },
  { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarDaysIcon, count: '12' },
]
const shops = [
  { id: 1, name: 'Blairsville', href: '/dashboard/shops/b', },
  { id: 2, name: 'Thomaston', href: '/dashboard/shops/t', },
  { id: 3, name: 'Cornerstone', href: '/dashboard/shops/c', },
]
const account = [
  { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftEllipsisIcon, count: '3' },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog8ToothIcon, },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}


const Sidebar = () =>
{
  const [ sidebarOpen, setSidebarOpen ] = useState(false)
  const path = usePathname()
  const { data: session } = useSession()

  const userInfo = session?.user
  const accountInfo = session?.account
  const shopsInfo = session?.shops

  // console.log(userInfo)
  // console.log(accountInfo)
  console.log(shopsInfo)

  return (
    <>
      <Transition show={ sidebarOpen } as={ Fragment }>
        <Dialog className="relative z-50 lg:hidden" onClose={ setSidebarOpen }>
          <TransitionChild
            as={ Fragment }
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={ Fragment }
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  as={ Fragment }
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={ () => setSidebarOpen(false) }>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */ }
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      src={ Logo }
                      alt="Your Company"
                      width={ 0 }
                      height={ 0 }
                      sizes='100vw'
                      priority
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {
                            navigation.map(item => (

                              <li key={ item.name }>
                                <Link
                                  href={ item.href }
                                  className={ `
                                    ${ path === item.href
                                      ? 'bg-primary-100 text-primary-300'
                                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  `}
                                >
                                  <item.icon
                                    className={ `
                                      ${ path === item.href ? 'text-primary-300' : 'text-gray-400 group-hover:text-primary-300' }
                                      h-6 w-6 shrink-0
                                    `}
                                    aria-hidden="true"
                                  />
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
                                </Link>
                              </li>

                            ))
                          }
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-primary-300">Shops</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {
                            shopsInfo &&
                            Object.keys(shopsInfo).length > 0 &&
                            shopsInfo.map(shop => (

                              <li key={ shop.name }>
                                <Link
                                  href={ shop.href }
                                  className={ `
                                    ${ path === shop.href
                                      ? 'bg-primary-100 text-primary-300'
                                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  `}
                                >
                                  <span
                                    className={ `
                                      ${ path === shop.href
                                        ? 'text-primary-300 border-primary-300'
                                        : 'text-gray-700 border-gray-200' } group-hover:border-primary-300 group-hover:text-primary-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                                    `}
                                  >
                                    { shop.name.slice(0, 1) }
                                  </span>
                                  <span className="truncate inline-flex">{ shop.name }</span>
                                </Link>
                              </li>

                            ))
                          }
                        </ul>
                      </li>
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {
                            account.map(item => (

                              <li key={ item.name }>
                                <Link
                                  href={ item.href }
                                  className={ `
                                    ${ path === item.href
                                      ? 'bg-primary-100 text-primary-300'
                                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  `}
                                >
                                  <item.icon
                                    className={ `
                                      ${ path === item.href ? 'text-primary-300' : 'text-gray-400 group-hover:text-primary-300' }
                                      h-6 w-6 shrink-0
                                    `}
                                    aria-hidden="true"
                                  />
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
                                </Link>
                              </li>

                            ))
                          }
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */ }
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */ }
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-8 shrink-0 items-center">
            <Image
              className="h-auto w-auto mt-4"
              src={ Logo }
              alt="Your Company"
              width={ 0 }
              height={ 0 }
              sizes='100vw'
              priority
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {
                    navigation.map(item => (

                      <li key={ item.name }>
                        <Link
                          href={ item.href }
                          className={ `
                            ${ path === item.href
                              ? 'bg-primary-100 text-primary-300'
                              : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          `}
                        >
                          <item.icon
                            className={ `
                              ${ path === item.href ? 'text-primary-300' : 'text-gray-400 group-hover:text-primary-300' }
                              h-6 w-6 shrink-0
                            `}
                            aria-hidden="true"
                          />
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
                        </Link>
                      </li>

                    ))
                  }
                </ul>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="text-xs font-semibold leading-6 text-primary-300">
                    Shops
                  </div>
                  <div className="text-xs font-semibold leading-6 text-primary-300">
                    Add Shop
                  </div>
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {
                    shopsInfo &&
                    Object.keys(shopsInfo).length > 0 &&
                    shopsInfo.map(team => (

                      <li key={ team.name }>
                        <Link
                          href={ team.href }
                          className={ `
                            ${ path === team.href
                              ? 'bg-primary-100 text-primary-300'
                              : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          `}
                        >
                          <span
                            className={ `
                              ${ path === team.href
                                ? 'text-primary-300 border-primary-300'
                                : 'text-gray-400 border-gray-200 group-hover:border-primary-300 group-hover:text-primary-300' }
                              flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                            `}
                          >
                            { team.name.slice(0, 1) }
                          </span>
                          <span className="truncate">{ team.name }</span>
                        </Link>
                      </li>

                    ))
                  }
                </ul>
              </li>
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {
                    account.map(item => (

                      <li key={ item.name }>
                        <Link
                          href={ item.href }
                          className={ `
                            ${ path === item.href
                              ? 'bg-primary-100 text-primary-300'
                              : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          `}
                        >
                          <item.icon
                            className={ `
                              ${ path === item.href ? 'text-primary-300' : 'text-gray-400 group-hover:text-primary-300' }
                              h-6 w-6 shrink-0
                            `}
                            aria-hidden="true"
                          />
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
                        </Link>
                      </li>

                    ))
                  }
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <LinkPopover
                  button={
                    <>
                      <Image
                        className="h-8 w-8 rounded-full bg-gray-50 border border-primary-300"
                        src={ Avatar }
                        alt=""
                        width={ 0 }
                        height={ 0 }
                        sizes='100vw'
                      />
                      <span className="sr-only">Your profile</span>
                      <span aria-hidden="true">Tom Cook</span>
                      <ChevronRightIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </>
                  }
                  x='left-10'
                  y='bottom-[55px]'
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={ () => setSidebarOpen(true) }>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-primary-300">Dashboard</div>
        <LinkPopover
          button={
            <>
              <span className="sr-only">Your profile</span>
              <Image
                className="h-8 w-8 rounded-full bg-gray-50 border border-primary-300"
                src={ Avatar }
                alt=""
                width={ 0 }
                height={ 0 }
                sizes='100vw'
              />
            </>
          }
          x='right-2'
          y='top-20'
        />
      </div>
    </>
  )
}

export default Sidebar