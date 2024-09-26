'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'

import TitleHeading from '@components/atom/Headings/TitleHeading'
import Button from '@components/atom/Button'
import { toast } from 'react-toastify'

const AccountSecurityPage = () =>
{
  const { data: session, update: refresh } = useSession()

  const [ showPw, setShowPw ] = useState(false)
  const [ changePw, setChangePw ] = useState({
    current: '',
    newPw: '',
    confirm: ''
  })



  const updatePw = async () =>
  {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,16}$/

    if (!changePw.current || !changePw.newPw || !changePw.confirm)
    {
      toast.error('Please fill in all fields')
    } else if (!regex.test(changePw.newPw))
    {
      toast.error('Password does not meet requirements')
    } else if (changePw.newPw !== changePw.confirm)
    {
      toast.error('Passwords do not match')
    } else
    {
      try
      {
        const employeeId = session?.user._id

        const result = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees/updatepassword`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: changePw, employeeId })
        })

        const res = await result.json()

        if (res.success)
        {
          toast.success(res.success)
        } else if (res.error)
        {
          toast.error(res.error)
        }
      } catch (error)
      {
        toast.error(error.message)
      }

      setChangePw({
        current: '',
        newPw: '',
        confirm: ''
      })

    }
  }

  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
      <div className="border-b border-gray-200 bg-white pb-2 mb-5">
        <TitleHeading title='Security' />
      </div>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Change/Update your current password
              </p>
            </div>
            <button
              type="button"
              className="font-semibold text-primary-300 hover:text-primary-500"
              onClick={ updatePw }
            >
              Update Password
            </button>
          </div>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">

            <div className="pt-6 sm:flex sm:justify-between sm:items-center">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Current Password
              </dt>
              <div>
                <label htmlFor="currentPassword" className="sr-only">
                  Password
                </label>
                <input
                  type={ `${ showPw ? 'text' : 'password' }` }
                  name="Current Password"
                  id="currentPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                  value={ changePw.current }
                  onChange={ (e) => setChangePw(prev => ({
                    ...prev,
                    current: e.target.value
                  })) }
                />
              </div>
            </div>
            <div className="pt-6 sm:flex sm:justify-between sm:items-center">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                New Password
              </dt>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Password
                </label>
                <input
                  type={ `${ showPw ? 'text' : 'password' }` }
                  name="Confirm Password"
                  id="confirmPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                  value={ changePw.newPw }
                  onChange={ (e) => setChangePw(prev => ({
                    ...prev,
                    newPw: e.target.value
                  })) }
                />
              </div>
            </div>
            <div className="pt-6 sm:flex sm:justify-between sm:items-center">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Confirm Password
              </dt>
              <div>
                <label htmlFor="newPassword" className="sr-only">
                  Password
                </label>
                <input
                  type={ `${ showPw ? 'text' : 'password' }` }
                  name="New Password"
                  id="newPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                  value={ changePw.confirm }
                  onChange={ (e) => setChangePw(prev => ({
                    ...prev,
                    confirm: e.target.value
                  })) }
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className='col-span-full flex flex-col gap-5'>
                <p className='text-xs'>Password guidelines:</p>
                <div className='flex flex-wrap gap-2'>
                  <p className="text-xs flex gap-1 items-center">
                    {
                      changePw.newPw.length > 7 && changePw.newPw.length < 17 ?
                        <FaCircleCheck className='text-green-500' />
                        :
                        <FaCircleXmark className='text-red-500' />
                    }
                    8-16 characters
                  </p>
                  <p className="text-xs flex gap-1 items-center">
                    {
                      changePw.newPw.search(/[A-Z]/) < 0 ?
                        <FaCircleXmark className='text-red-500' />
                        :
                        <FaCircleCheck className='text-green-500' />
                    }
                    1 uppercase letter
                  </p>
                  <p className="text-xs flex gap-1 items-center">
                    {
                      changePw.newPw.search(/[a-z]/) < 0 ?
                        <FaCircleXmark className='text-red-500' />
                        :
                        <FaCircleCheck className='text-green-500' />
                    }
                    1 lowercase letter
                  </p>
                  <p className="text-xs flex gap-1 items-center">
                    {
                      changePw.newPw.search(/[0-9]/) < 0 ?
                        <FaCircleXmark className='text-red-500' />
                        :
                        <FaCircleCheck className='text-green-500' />
                    }
                    1 number
                  </p>
                  <p className="text-xs flex gap-1 items-center">
                    {
                      changePw.newPw.search(/[[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0 ?
                        <FaCircleXmark className='text-red-500' />
                        :
                        <FaCircleCheck className='text-green-500' />
                    }
                    1 special character
                  </p>
                </div>
              </div>
              <div
                className="pt-6 sm:flex sm:justify-end font-bold text-primary-300 hover:cursor-pointer hover:text-primary-500"
                onClick={ () => setShowPw(!showPw) }
              >
                { showPw ? 'Hide Passwords' : 'Show Passwords' }
              </div>
            </div>

          </dl>
        </div>

        <div className='flex justify-between items-center'>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Delete account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 w-1/2">
              No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
            </p>
          </div>
          <Button text='Delete Account' />


        </div>
      </div>
    </main>
  )
}

export default AccountSecurityPage