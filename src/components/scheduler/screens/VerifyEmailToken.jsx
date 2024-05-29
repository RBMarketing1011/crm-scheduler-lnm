'use client'

import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import { Notifi, notifi } from '@components/Notifications/Notify'

import { useState } from 'react'

const VerifyEmailToken = ({ customerId, nextScreen, prevScreen }) =>
{
  const [ token, setToken ] = useState('')

  const handleClick = async () =>
  {
    if (!token)
    {
      notifi('error', 'Please Enter Your Verification Code')
    } else
    {
      try
      {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_URL }${ process.env.NEXT_PUBLIC_API_URL }/customer/verify/${ customerId }`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })

        if (res.ok)
        {
          nextScreen()
        }
      } catch (error)
      {
        toast.error(error)
      }
    }
  }

  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <Notifi />
      <div className='w-full flex flex-col gap-10'>
        <div className='w-full'>
          <h1 className='text-xl font-bold text-primary-300'>Please enter your one time passcode below.</h1>
        </div>

        <div className='w-[60%] flex flex-col gap-5'>
          <input
            className='w-full rounded-md pl-2 h-[40px]'
            type="text"
            placeholder='Token'
            required
            value={ token }
            onChange={ (e) => setToken(e.target.value) }
          />
        </div>
      </div>

      <div className="w-full flex justify-end gap-3 mt-3">

        <SchedulerBackScreenBtn
          nextScreen={ prevScreen }
        />

        <SchedulerNextScreenBtn
          nextScreen={ handleClick }
        />

      </div>
    </main>
  )
}

export default VerifyEmailToken