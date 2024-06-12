'use client'

//dependencies
import { useSearchParams } from 'next/navigation'
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
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

//images
import Logo from '@images/logos/lnm-logo-black.png'

const SetPassword = ({ params }) =>
{
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })

  const [ password, setPassword ] = useState({
    p1: '',
    p2: ''
  })
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
          <h2 className="mt-20 text-lg font-semibold text-gray-900">
            Create Your New Password
          </h2>
          <form onSubmit={ (e) => handleSubmit(e) } className="mt-10 grid grid-cols-1 gap-y-8">
            <TextField
              label="Enter New Password"
              name="password1"
              type="password"
              value={ password.p1 }
              onChange={ (e) =>
              {
                setPassword(prev => ({
                  ...prev,
                  p1: e.target.value
                }))
              } }
              required
            />
            <TextField
              label="Confirm Password"
              name="password1"
              type="password"
              value={ password.p2 }
              onChange={ (e) =>
              {
                setPassword(prev => ({
                  ...prev,
                  p2: e.target.value
                }))
              } }
              required
            />
            <div className='col-span-full flex flex-col gap-5'>
              <p className='text-xs'>Password guidelines:</p>
              <div className='flex flex-wrap gap-2'>
                <p className="text-xs flex gap-1 items-center">
                  {
                    password.p1.length > 7 && password.p1.length < 17 ?
                      <FaCircleCheck className='text-green-500' />
                      :
                      <FaCircleXmark className='text-red-500' />
                  }
                  8-16 characters
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    password.p1.search(/[A-Z]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 uppercase letter
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    password.p1.search(/[a-z]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 lowercase letter
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    password.p1.search(/[0-9]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 number
                </p>
                <p className="text-xs flex gap-1 items-center">
                  {
                    password.p1.search(/[[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0 ?
                      <FaCircleXmark className='text-red-500' />
                      :
                      <FaCircleCheck className='text-green-500' />
                  }
                  1 special character
                </p>
              </div>
            </div>
            <div className="col-span-full">
              <Button type="submit" text='Create Password' />
            </div>
          </form>
        </div>
      </div>
    </SlimLayout >
  )
}

export default SetPassword