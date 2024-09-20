import Link from 'next/link'
import Image from 'next/image'
import Button from '@components/atom/Button'
import Logo from '@images/logos/lnm-logo-black.png'
import { SlimLayout } from '@components/template/SlimLayout'

export default function NotFound ()
{
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Image
            className="h-10 w-auto"
            src={ Logo }
            alt='LeadsNearMe® Logo'
            priority
            height={ 0 }
            width={ 0 }
            sizes='100vw'
          />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-gray-700 mb-4">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href='/'
      >
        <Button
          text='Go back home'
        />
      </Link>
    </SlimLayout>
  )
}
