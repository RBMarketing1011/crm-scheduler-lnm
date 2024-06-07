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
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

//images
import Logo from '@images/logos/lnm-logo-black.png'

export default function Register ()
{
  const [ user, setUser ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })

  const router = useRouter()

  const handleSubmit = async (e) =>
  {
    e.preventDefault()

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,16}$/

    if (!regex.test(user.password))
    {
      notifi.error("Password doesn't follow guidelines.", setNotify)
    } else
    {
      try
      {

        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/users`, {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        const data = await res.json()

        if (data.success)
        {
          setUser({
            name: '',
            email: '',
            password: ''
          })

          notifi.success(data.success, setNotify)

          signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false
          })

          router.push('/dashboard')

        } else if (data.error)
        {
          notifi.error(data.error, setNotify)
        }

      } catch (error)
      {
        notifi.error(error, setNotify)
      }
    }


  }

  return (
    <SlimLayout>

      <Notifi data={ { state: notify, setState: setNotify } } />

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
          <h2 className="mt-10 sm:mt-20 text-lg font-semibold text-gray-900">
            Get started for free
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Already registered?{ ' ' }
            <Link
              href="/login"
              className="font-medium text-primary-300 hover:underline"
            >
              Sign in
            </Link>{ ' ' }
            to your account.
          </p>
          <form
            onSubmit={ (e) => handleSubmit(e) }
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:gap-y-8 sm:grid-cols-2"
          >
            <TextField
              label="First name"
              name="first_name"
              type="text"
              value={ user.firstname }
              onChange={ (e) =>
              {
                setUser(prev => ({
                  ...prev,
                  firstname: e.target.value
                }))
              } }
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              name="last_name"
              type="text"
              value={ user.lastname }
              onChange={ (e) =>
              {
                setUser(prev => ({
                  ...prev,
                  lastname: e.target.value
                }))
              } }
              autoComplete="family-name"
              required
            />
            <TextField
              className="col-span-full"
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
              className="col-span-full"
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
              autoComplete="new-password"
              required
            />
            <div className='col-span-full flex flex-col gap-5'>
              <p className='text-xs'>Password guidelines:</p>
              <div className='flex flex-wrap gap-2'>
                <p className="text-xs flex gap-1 items-center">
                  {
                    user.password.length > 7 && user.password.length < 17 ?
                      <FaCircleCheck className='text-green-500' />
                      :
                      <FaCircleXmark className='text-red-500' />
                  }
                  8-16 characters
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    user.password.search(/[A-Z]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 uppercase letter
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    user.password.search(/[a-z]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 lowercase letter
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    user.password.search(/[0-9]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 number
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    user.password.search(/[[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 special character
                </p>
              </div>
            </div>
            <div className="col-span-full">
              <Button type="submit" text='Sign Up' />
            </div>
          </form>
        </div>
        <div className='hidden sm:block border-r border-primary-300/30 h-[50vh] w-2'></div>
        <div className='flex flex-col items-center gap-10'>
          <h3>- OR -</h3>
          <div className='flex flex-col gap-3'>
            <Button icon={ <FaGoogle /> } text='Register With Google' onClick={ () =>
            {
              signIn('google')
              // router.push('/dashboard')
            } } />
          </div>
        </div>
      </div>
    </SlimLayout>
  )
}
