'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import Avatar from '@images/avatars/avatar.png'
import Image from 'next/image'
import Link from 'next/link'

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const LinkPopover = ({ button, x, y }) =>
{
  const [ openMenu, setOpenMenu ] = useState(false)
  const container = useRef(null)

  useEffect(() =>
  {
    const handleOutSideClick = (event) =>
    {
      if (!container.current?.contains(event.target))
      {
        setOpenMenu(false)
      }
    }

    window.addEventListener("mousedown", handleOutSideClick)

    return () =>
    {
      window.removeEventListener("mousedown", handleOutSideClick)
    }
  }, [ container ])

  return (
    <div>
      <div className="w-full flex items-center gap-x-4 px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-primary-100 hover:text-primary-300 hover:cursor-pointer" onClick={ () => setOpenMenu(!openMenu) }>
        { button }
      </div>

      <Transition
        show={ openMenu }
        as={ Fragment }
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={ `absolute ${ x } ${ y } z-10 mt-2 w-56 rounded-md bg-white shadow-lg` } ref={ container }>
          <div className="py-1">
            <Link
              href="/settings"
              className='text-gray-700 hover:bg-primary-100 hover:text-primary-300 block w-full px-4 py-2 text-left text-sm'
              onClick={ () => setOpenMenu(false) }
            >
              Profile settings
            </Link>
            <Link
              href="/support"
              className='text-gray-700 hover:bg-primary-100 hover:text-primary-300 block w-full px-4 py-2 text-left text-sm'
              onClick={ () => setOpenMenu(false) }
            >
              Support
            </Link>
            <Link
              href="/license"
              className='text-gray-700 hover:bg-primary-100 hover:text-primary-300 block w-full px-4 py-2 text-left text-sm'
              onClick={ () => setOpenMenu(false) }
            >
              License
            </Link>
            <form method="POST" action="#">
              <button
                type="submit"
                className='text-gray-700 hover:bg-primary-100 hover:text-primary-300 block w-full px-4 py-2 text-left text-sm'
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default LinkPopover