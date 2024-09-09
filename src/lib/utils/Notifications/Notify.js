import { Fragment, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export const notifi = {
  success: (text, setFunc) =>
  {
    setFunc({
      type: 'success',
      text,
      show: true
    })

    setTimeout(() =>
    {
      setFunc({
        type: '',
        text: '',
        show: false
      })
    }, 3000)
  },
  error: (text, setFunc) =>
  {
    setFunc({
      type: 'error',
      text,
      show: true
    })

    setTimeout(() =>
    {
      setFunc({
        type: '',
        text: '',
        show: false
      })
    }, 3000)
  },
  warning: (text, setFunc) =>
  {
    setFunc({
      type: 'warning',
      text,
      show: true
    })

    setTimeout(() =>
    {
      setFunc({
        type: '',
        text: '',
        show: false
      })
    }, 3000)
  }
}

export const Notifi = ({ data }) =>
{
  const close = () =>
  {
    data.setState({
      type: '',
      text: '',
      show: false
    })
  }



  const capital = (string) =>
  {
    const fl = string.charAt(0)
    const cap = fl.toUpperCase()
    const str = string.slice(1)
    return cap + str
  }

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */ }
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[1000000]"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */ }
          <Transition
            show={ data.state.show }
            as={ Fragment }
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">

                    {
                      data.state.type === 'success' ?

                        <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />

                        :

                        data.state.type === 'error' ?

                          <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />

                          :

                          data.state.type === 'warning' &&

                          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                    }

                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{ capital(data.state.type) }</p>
                    <p className="mt-1 text-sm text-gray-500">{ data.state.text }</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                      onClick={ close }
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}