'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { Label, Switch, Field } from '@headlessui/react'

import Button from '@components/atom/Button'
import { toast } from 'react-toastify'

const notifications = [
  {
    title: 'Appointments',
    children: [
      "Appointment reminders",
      "Appointment booked",
      "Appointment rescheduled",
      "Appointment canceled",
    ]
  },
  {
    title: 'Miscellaneous',
    children: [
      "Special offers and promotions",
      "New feature announcements",
      "Profile information changed",
      "System maintenance alerts"
    ]
  },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

const AccountNotificationsPage = () =>
{
  const { data: session, update: refresh } = useSession()

  useEffect(() =>
  {
    session && setSliders(session?.user?.notifications)

  }, [ session ])

  const [ sliders, setSliders ] = useState()

  const isSelected = (string) =>
  (
    sliders?.includes(string) ? true : false
  )

  const addRemoveItem = (string) =>
  {
    if (sliders.includes(string))
    {
      setSliders(sliders.filter(slide => slide !== string))
    } else if (!sliders.includes(string))
    {
      setSliders(prev => ([
        ...prev,
        string
      ]))
    }
  }

  const saveNotifications = async () =>
  {
    const result = await fetch(`${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notifications: sliders, employeeId: session?.user._id })
    })

    const res = await result.json()

    if (res.success)
    {
      toast.success(res.success)
    } else if (res.error)
    {
      toast.error(res.error)
    }
  }


  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-4">
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-10 lg:mx-0 lg:max-w-none">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold leading-7 text-primary-300">
              Notifications & Reminders
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Choose what type of notifications to recieve.
            </p>
          </div>
          <Button text='Save Changes' onClick={ saveNotifications } />
        </div>

        {
          notifications.map((el, idx) => (

            <div key={ idx } className='text-sm leading-6'>
              <p className="mt-1 text-sm leading-6 font-semibold text-primary-300">
                { el.title }
              </p>

              {
                el.children.map((child, childIdx) => (

                  <dl key={ childIdx } className="pl-10 mt-2 space-y-6 text-sm leading-6 border-t border-gray-200" >
                    <Field as="div" className="flex pt-2">
                      <Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                        { child }
                      </Label>
                      <dd className="flex flex-auto items-center justify-end">
                        <Switch
                          checked={ () =>
                          {
                            isSelected(child)
                          } }
                          onChange={ () =>
                          {
                            addRemoveItem(child)
                          } }
                          className={ classNames(
                            isSelected(child) ? 'bg-primary-300' : 'bg-gray-200',
                            'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
                          ) }
                        >
                          <span
                            aria-hidden="true"
                            className={ classNames(
                              isSelected(child) ? 'translate-x-3.5' : 'translate-x-0',
                              'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                            ) }
                          />
                        </Switch>
                      </dd>
                    </Field>
                  </dl>

                ))
              }

            </div>
          ))
        }

      </div>
    </main>
  )
}

export default AccountNotificationsPage