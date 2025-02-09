'use client'

import Link from 'next/link'
import
{
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from './Button'
import { Container } from './Container'
import Logo from '@images/logos/lnm-logo-black.png'
import { NavLink } from '@components/template/NavLink'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function MobileNavLink ({ href, children })
{
  return (
    <PopoverButton as={ Link } href={ href } className="block w-full p-2">
      { children }
    </PopoverButton>
  )
}

function MobileNavIcon ({ open })
{
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-primary-300"
      fill="none"
      strokeWidth={ 2 }
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={ clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        ) }
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={ clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        ) }
      />
    </svg>
  )
}

function MobileNavigation ()
{
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        { ({ open }) => <MobileNavIcon open={ open } /> }
      </PopoverButton>
      <Transition>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverOverlay className="fixed inset-0 bg-slate-300/50" />
        </TransitionChild>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight shadow-xl ring-1 ring-slate-900/5">

            <Link href='#features' className='hover:text-primary-300 hover:bg-primary-100'>
              <MobileNavLink href="#features">Features</MobileNavLink>
            </Link>

            <Link href='#features' className='hover:text-primary-300 hover:bg-primary-100'>
              <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            </Link>

            <Link href='#features' className='hover:text-primary-300 hover:bg-primary-100'>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            </Link>

            <hr className="m-2 border-slate-300/40" />

            <Link href='#features' className='hover:text-primary-300 hover:bg-primary-100'>
              <MobileNavLink href="/login">Sign in</MobileNavLink>
            </Link>

          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}

export function Header ()
{
  const { data: session } = useSession()

  return (
    <header className="w-full py-10 fixed top-0 left-0 bg-white z-[100]">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image
                className="h-4 sm:h-7 w-auto"
                src={ Logo }
                alt='LeadsNearMe® Logo'
                width={ 0 }
                height={ 0 }
                sizes='100vw'
                priority
              />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink
                href="#features"
                className='text-primary-300'
              >
                Features
              </NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">

            {
              session?.user &&
              <div className="hidden md:block">
                <NavLink href={ `/account/${ session?.user?.accountId }/dashboard` }>
                  Dashboard
                </NavLink>
              </div>
            }

            <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div>
            <Button href="/register">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
