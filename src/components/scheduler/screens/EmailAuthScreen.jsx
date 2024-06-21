'use client'

import { useState } from 'react'

import SchedulerNextScreenBtn from '../btns/SchedulerNextScreenBtn'
import SchedulerBackScreenBtn from '../btns/SchedulerBackScreenBtn'
import { Notifi, notifi } from '@components/Notifications/Notify'

const EmailAuthScreen = ({ shop, customerChange, nextScreen, prevScreen }) =>
{
  const [ firstname, setFirstname ] = useState('Anthony')
  const [ lastname, setLastname ] = useState('Reynolds')
  const [ email, setEmail ] = useState('anthony@leadsnearme.com')
  const [ consent, setConsent ] = useState(true)

  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })

  const handleClick = async () =>
  {
    if (!firstname || !lastname || !email)
    {
      notifi.error('Please Fill Out All Fields', setNotify)
    } else if (!consent)
    {
      notifi.error('Please give us consent', setNotify)
    } else
    {
      try
      {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/scheduler/customerInfo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstname, lastname, email: email.toLowerCase(), shop })
        })

        const data = await res.json()

        if (res.ok)
        {
          customerChange(data._id)
          nextScreen()
        } else
        {
          notifi.error(res.error, setNotify)
        }
      } catch (error)
      {
        notifi.error(error, setNotify)
      }
    }
  }

  return (
    <main className='w-full h-[100%] flex flex-col justify-between'>
      <Notifi data={ { state: notify, setState: setNotify } } />
      <div className='w-full flex flex-col gap-10'>
        <div className='w-full'>
          <h1 className='text-xl font-bold text-primary-300'>To schedule your appointment at { shop.name }, please enter your details below!</h1>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <input
            className='w-full rounded-md pl-2 h-[40px]'
            type="text"
            placeholder='Firstname'
            required
            value={ firstname }
            onChange={ (e) => setFirstname(e.target.value) }
          />

          <input
            className='w-full rounded-md pl-2 h-[40px]'
            type="text"
            placeholder='Lastname'
            required
            value={ lastname }
            onChange={ (e) => setLastname(e.target.value) }
          />

          <input
            className='w-full rounded-md pl-2 h-[40px]'
            type="email"
            placeholder='Email'
            required
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className='w-full flex justify-start items-center gap-5'>
          <input id='consent' type="checkbox" defaultChecked={ true } onClick={ () => setConsent(!consent) } />
          <label htmlFor="consent">I agree to receive email messages about my appointment with { shop.name }. You can unsubscribe at any time.</label>
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

export default EmailAuthScreen