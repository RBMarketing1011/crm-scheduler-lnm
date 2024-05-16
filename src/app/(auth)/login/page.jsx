import Link from 'next/link'

import Button from '@components/Dashboard/Button'
import { TextField } from '@components/HomePage/Fields'
import Logo from '@images/logos/lnm-logo-black.png'
import { SlimLayout } from '@components/HomePage/SlimLayout'
import Image from 'next/image'

export const metadata = {
  title: 'Sign In',
}

export default function Login ()
{
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Image
            src={ Logo }
            className="h-10 w-auto"
            alt='LeadsNearMe® Logo'
            width={ 0 }
            height={ 0 }
            sizes='100vw'
          />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{ ' ' }
        <Link
          href="/register"
          className="font-medium text-primary-300 hover:underline"
        >
          Sign up
        </Link>{ ' ' }
        for a free trial.
      </p>
      <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

      </form>
    </SlimLayout>
  )
}
