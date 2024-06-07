'use client'

//dependencies
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

//components
import Button from '@components/Dashboard/Button'
import { TextField } from '@components/HomePage/Fields'
import { SlimLayout } from '@components/HomePage/SlimLayout'
import { Notifi, notifi } from '@components/Notifications/Notify'

//icons
import { FaGoogle, FaGithub } from 'react-icons/fa'

//images
import Logo from '@images/logos/lnm-logo-black.png'

export default function Login ()
{
  const [ user, setUser ] = useState({
    email: '',
    password: ''
  })

  const [ notifiState, setNotifiState ] = useState({
    type: '',
    text: '',
    show: false
  })

  const router = useRouter()

  const handleSubmit = async (e) =>
  {
    e.preventDefault()

    console.log(user)
    try
    {
      const res = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false
      })

      if (res?.error)
      {
        notifi.error(res.error, setNotifiState)
      } else if (res?.status === 200)
      {
        notifi.success('Sign in success', setNotifiState)
        router.push('/dashboard')
      }

    } catch (error)
    {
      console.log(error)
      notifi.error(error.message, setNotifiState)
    }
  }

  return (
    <SlimLayout>
      <Notifi data={ { state: notifiState, setState: setNotifiState } } />

      <div className='w-full flex flex-col sm:flex-row justify-start items-center gap-10 sm:gap-20'>
        <div className='w-full md:w-[350px]'>
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
          <form onSubmit={ (e) => handleSubmit(e) } className="mt-10 grid grid-cols-1 gap-y-8">
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={ user.email }
              onChange={ (e) =>
              {
                setUser(prev => ({
                  ...prev,
                  email: e.target.value
                }))
              } }
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={ user.password }
              onChange={ (e) =>
              {
                setUser(prev => ({
                  ...prev,
                  password: e.target.value
                }))
              } }
              autoComplete="current-password"
              required
            />
            <div className="col-span-full">
              <Button type="submit" text='Sign In' />
            </div>
          </form>
        </div>
        <div className='hidden sm:block border-r border-primary-300/30 h-[50vh] w-2'></div>
        <div className='flex flex-col items-center gap-10'>
          <h3>- OR -</h3>
          <div className='flex flex-col gap-3'>
            <Button icon={ <FaGoogle /> } text='Sign In With Google' onClick={ async () =>
            {
              await signIn('google')
              router.push('/dashboard')
            } } />
          </div>
        </div>
      </div>
    </SlimLayout>
  )
}
