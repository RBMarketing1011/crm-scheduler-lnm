'use client'

import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import
{
  Bars3Icon,
  XMarkIcon,
  RectangleGroupIcon,
  Cog8ToothIcon,
  CalendarDaysIcon,
  PlusIcon,
  CodeBracketSquareIcon
} from '@heroicons/react/24/outline'

import { ChevronRightIcon } from '@heroicons/react/20/solid'

import Avatar from '@images/avatars/avatar.png'

import Image from 'next/image'
import Logo from '@images/logos/lnm-logo-black.png'
import Link from 'next/link'
import LinkPopover from '@components/molecule/Popups/LinkPopover'
import PopupForm from '@components/molecule/Popups/PopupForm'
import { Notifi } from '@lib/utils/Notifications/Notify'
import InitialsIcon from '@components/molecule/Employees/InitialsIcon'

const Sidebar = () =>
{
  const [ sidebarOpen, setSidebarOpen ] = useState(false)
  const path = usePathname()

  // ================== Session Data
  const { data: session, update } = useSession()

  const navigation = [
    { name: 'Dashboard', href: `/account/${ session?.user?.accountId }/dashboard`, icon: RectangleGroupIcon, },
    { name: 'Appointments', href: `/account/${ session?.user?.accountId }/appointments`, icon: CalendarDaysIcon, count: '12' },
  ]
  const account = [
    { name: 'Settings', href: `/account/${ session?.user?.accountId }/settings`, icon: Cog8ToothIcon, },
    { name: 'Install Scheduler', href: `/account/${ session?.user?.accountId }/scheduler/instructions`, icon: CodeBracketSquareIcon, },
  ]

  // ================= End Session Data

  // ================= Add Shop Popup
  const [ openAddShopPopup, setOpenAddShopPopup ] = useState(false)
  const [ addShopFormData, setAddShopFormData ] = useState({
    name: '',
    weekdayOpenHour: '',
    weekdayCloseHour: '',
    openOnWeekends: false,
    weekendOpenOn: '',
    weekendOpenHour: '',
    weekendCloseHour: '',
    nickname: '',
    phone: '',
    email: '',
    website: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  })
  // ================= End Add Shop Popup

  // =================== Notifi State 
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })
  // =================== End Notifi State

  return (
    <>
      <Notifi data={ { state: notify, setState: setNotify } } />
      {/* Sidebar For Mobile */ }
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
                      alt="Leads Near Me Logo"
                      width={ 0 }
                      height={ 0 }
                      sizes='100vw'
                      priority
                      preload={ false }
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
                                  onClick={ () => setSidebarOpen(false) }
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
                            Locations
                          </div>
                          <div className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary-300 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white flex items-center gap-2 hover:cursor-pointer"
                            onClick={ () =>
                            {
                              setOpenAddShopPopup(true)
                              setSidebarOpen(false)
                            } }
                          >
                            <PlusIcon className='w-[20px] stroke-[2px]' /> Add
                          </div>
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {
                            session?.locations &&
                            session?.locations.map(location => (

                              <li key={ location.name }>
                                <Link
                                  href={ `/account/${ session?.user?.accountId }/locations/${ location._id }/appointments` }
                                  className={ `
                                    ${ path.includes(`/account/${ session?.user?.accountId }/locations/${ location._id }`)
                                      ? 'bg-primary-100 text-primary-300'
                                      : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  `}
                                  onClick={ () => setSidebarOpen(false) }
                                >
                                  <span
                                    className={ `
                                      ${ path.includes(`/account/${ session?.user?.accountId }/locations/${ location._id }`)
                                        ? 'text-primary-300 border-primary-300'
                                        : 'text-gray-700 border-gray-200' } group-hover:border-primary-300 group-hover:text-primary-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                                    `}
                                  >
                                    { location.name.slice(0, 1) }
                                  </span>
                                  <span className="truncate inline-flex">{ location.name }</span>
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
                                  onClick={ () => setSidebarOpen(false) }
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
              alt="Leads Near Me Logo"
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
                    Locations
                  </div>
                  <div className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary-300 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white flex items-center gap-2 hover:cursor-pointer"
                    onClick={ () => setOpenAddShopPopup(true) }
                  >
                    <PlusIcon className='w-[20px] stroke-[2px]' /> Add
                  </div>
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {
                    session?.locations &&
                    Object.keys(session?.locations).length > 0 &&
                    session?.locations.map((location, locationIdx) => (

                      <li key={ locationIdx }>
                        <Link
                          href={ `/account/${ session?.user?.accountId }/locations/${ location._id }/appointments` }
                          className={ `
                            ${ path.includes(`/account/${ session?.user?.accountId }/locations/${ location._id }`)
                              ? 'bg-primary-100 text-primary-300'
                              : 'text-gray-700 hover:text-primary-300 hover:bg-primary-100' }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          `}
                        >
                          <span
                            className={ `
                              ${ path.includes(`/account/${ session?.user?.accountId }/locations/${ location._id }`)
                                ? 'text-primary-300 border-primary-300'
                                : 'text-gray-400 border-gray-200 group-hover:border-primary-300 group-hover:text-primary-300' }
                              flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                            `}
                          >
                            { location.name.slice(0, 1) }
                          </span>
                          <span className="truncate">{ location.name }</span>
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
                      <InitialsIcon
                        borderColor='border-primary-300'
                        textColor='text-primary-300'
                        bgColor='bg-primary-100'
                        firstInitial={ session?.user?.firstname.slice(0, 1) }
                        lastInitial={ session?.user?.lastname.slice(0, 1) }
                      />
                      <span className="sr-only">Your profile</span>
                      <span aria-hidden="true">{ session?.user?.firstname }</span>
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
                src={ session?.user?.image || Avatar }
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

      {/* Modal for Add Shop Form */ }
      <PopupForm
        title='Add Location'
        refreshSession={ update }
        openPopupState={ { state: openAddShopPopup, setState: setOpenAddShopPopup } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/locations`,
          method: 'POST',
          body: JSON.stringify({ shop: addShopFormData, accountId: session?.user?.accountId })
        } }
        notifiSetState={ setNotify }
        textFields={ [
          {
            width: 'sm:w-[99.5%]',
            type: 'text',
            label: 'Name',
            value: addShopFormData.name,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                name: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'select',
            options: [
              '12:00 AM',
              '12:30 AM',
              '1:00 AM',
              '1:30 AM',
              '2:00 AM',
              '2:30 AM',
              '3:00 AM',
              '3:30 AM',
              '4:00 AM',
              '4:30 AM',
              '5:00 AM',
              '5:30 AM',
              '6:00 AM',
              '6:30 AM',
              '7:00 AM',
              '7:30 AM',
              '8:00 AM',
              '8:30 AM',
              '9:00 AM',
              '9:30 AM',
              '10:00 AM',
              '10:30 AM',
              '11:00 AM',
              '11:30 AM',
              '12:00 PM',
              '12:30 PM',
              '1:00 PM',
              '1:30 PM',
              '2:00 PM',
              '2:30 PM',
              '3:00 PM',
              '3:30 PM',
              '4:00 PM',
              '4:30 PM',
              '5:00 PM',
              '5:30 PM',
              '6:00 PM',
              '6:30 PM',
              '7:00 PM',
              '7:30 PM',
              '8:00 PM',
              '8:30 PM',
              '9:00 PM',
              '9:30 PM',
              '10:00 PM',
              '10:30 PM',
              '11:00 PM',
              '11:30 PM',
            ],
            label: 'Weekday Open Time',
            value: addShopFormData.weekdayOpenHour,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                weekdayOpenHour: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'select',
            options: [
              '12:00 AM',
              '12:30 AM',
              '1:00 AM',
              '1:30 AM',
              '2:00 AM',
              '2:30 AM',
              '3:00 AM',
              '3:30 AM',
              '4:00 AM',
              '4:30 AM',
              '5:00 AM',
              '5:30 AM',
              '6:00 AM',
              '6:30 AM',
              '7:00 AM',
              '7:30 AM',
              '8:00 AM',
              '8:30 AM',
              '9:00 AM',
              '9:30 AM',
              '10:00 AM',
              '10:30 AM',
              '11:00 AM',
              '11:30 AM',
              '12:00 PM',
              '12:30 PM',
              '1:00 PM',
              '1:30 PM',
              '2:00 PM',
              '2:30 PM',
              '3:00 PM',
              '3:30 PM',
              '4:00 PM',
              '4:30 PM',
              '5:00 PM',
              '5:30 PM',
              '6:00 PM',
              '6:30 PM',
              '7:00 PM',
              '7:30 PM',
              '8:00 PM',
              '8:30 PM',
              '9:00 PM',
              '9:30 PM',
              '10:00 PM',
              '10:30 PM',
              '11:00 PM',
              '11:30 PM',
            ],
            label: 'Weekday Close Time',
            value: addShopFormData.weekdayCloseHour,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                weekdayCloseHour: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'checkbox',
            label: 'Open On The Weekends?',
            value: addShopFormData.openOnWeekends,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                openOnWeekends: !addShopFormData.openOnWeekends
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            hidden: true,
            type: 'select',
            options: [
              'Saturday',
              'Sunday',
              'Saturday & Sunday'
            ],
            label: 'Which days?',
            value: addShopFormData.weekendOpenOn,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                weekendOpenOn: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            hidden: true,
            type: 'select',
            options: [
              '12:00 AM',
              '12:30 AM',
              '1:00 AM',
              '1:30 AM',
              '2:00 AM',
              '2:30 AM',
              '3:00 AM',
              '3:30 AM',
              '4:00 AM',
              '4:30 AM',
              '5:00 AM',
              '5:30 AM',
              '6:00 AM',
              '6:30 AM',
              '7:00 AM',
              '7:30 AM',
              '8:00 AM',
              '8:30 AM',
              '9:00 AM',
              '9:30 AM',
              '10:00 AM',
              '10:30 AM',
              '11:00 AM',
              '11:30 AM',
              '12:00 PM',
              '12:30 PM',
              '1:00 PM',
              '1:30 PM',
              '2:00 PM',
              '2:30 PM',
              '3:00 PM',
              '3:30 PM',
              '4:00 PM',
              '4:30 PM',
              '5:00 PM',
              '5:30 PM',
              '6:00 PM',
              '6:30 PM',
              '7:00 PM',
              '7:30 PM',
              '8:00 PM',
              '8:30 PM',
              '9:00 PM',
              '9:30 PM',
              '10:00 PM',
              '10:30 PM',
              '11:00 PM',
              '11:30 PM',
            ],
            label: 'Weekend Open Time',
            value: addShopFormData.weekendOpenHour,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                weekendOpenHour: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            hidden: true,
            type: 'select',
            options: [
              '12:00 AM',
              '12:30 AM',
              '1:00 AM',
              '1:30 AM',
              '2:00 AM',
              '2:30 AM',
              '3:00 AM',
              '3:30 AM',
              '4:00 AM',
              '4:30 AM',
              '5:00 AM',
              '5:30 AM',
              '6:00 AM',
              '6:30 AM',
              '7:00 AM',
              '7:30 AM',
              '8:00 AM',
              '8:30 AM',
              '9:00 AM',
              '9:30 AM',
              '10:00 AM',
              '10:30 AM',
              '11:00 AM',
              '11:30 AM',
              '12:00 PM',
              '12:30 PM',
              '1:00 PM',
              '1:30 PM',
              '2:00 PM',
              '2:30 PM',
              '3:00 PM',
              '3:30 PM',
              '4:00 PM',
              '4:30 PM',
              '5:00 PM',
              '5:30 PM',
              '6:00 PM',
              '6:30 PM',
              '7:00 PM',
              '7:30 PM',
              '8:00 PM',
              '8:30 PM',
              '9:00 PM',
              '9:30 PM',
              '10:00 PM',
              '10:30 PM',
              '11:00 PM',
              '11:30 PM',
            ],
            label: 'Weekend Close Time',
            value: addShopFormData.weekendCloseHour,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                weekendCloseHour: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Nickname',
            value: addShopFormData.nickname,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                nickname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Phone',
            value: addShopFormData.phone,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                phone: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'email',
            label: 'Email',
            value: addShopFormData.email,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                email: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Website',
            value: addShopFormData.website,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                website: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[98.5%]',
            type: 'text',
            label: 'Street Address',
            value: addShopFormData.address1,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                address1: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Apt/Unit #',
            value: addShopFormData.address2,
            required: false,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                address2: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'City',
            value: addShopFormData.city,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                city: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'State',
            value: addShopFormData.state,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                state: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Zip',
            value: addShopFormData.zip,
            required: true,
            onChange: (e) =>
            {
              setAddShopFormData(prev => ({
                ...prev,
                zip: e.target.value
              }))
            }
          },
        ] }
      />
    </>
  )
}

export default Sidebar