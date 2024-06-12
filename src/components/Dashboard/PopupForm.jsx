'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TextField, SelectField } from '@components/HomePage/Fields'
import { notifi } from '@components/Notifications/Notify'

export default function PopupForm ({ title, openPopupState, textFields, httpRequest, notifiSetState })
{
  // ==================== Submit as POST request
  const submitPostReq = async () =>
  {
    // make sure all required variables are present
    let isError = false
    let errorFields = []
    textFields.forEach(el =>
    {
      if (el.required === true && !el.value)
      {
        errorFields.push(el.label)
        isError = true
      }
    })
    // throw error notification if not present
    isError && notifi.error(`${ errorFields } are all required fields.`, notifiSetState)

    if (!isError)
    {
      try
      {
        const result = await fetch(`${ httpRequest.url }`, {
          method: httpRequest.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: httpRequest.body
        })

        const res = await result.json()

        if (res.success)
        {
          notifi.success(res.success, notifiSetState)
          // close form
          openPopupState.setState(false)
          textFields.map(el =>
          {
            let e = { target: { value: '' } }
            el.onChange(e)
          })
        } else if (res.error)
        {
          notifi.error(res.error, notifiSetState)
        }

      } catch (error)
      {
        console.log(error)
        notifi.error(error.message, notifiSetState)
      }
    }
  }

  return (
    <Transition show={ openPopupState.state } className='z-[10000]'>
      <Dialog className="relative z-10" onClose={ openPopupState.setState }>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                    onClick={ () => openPopupState.setState(false) }
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">

                  {/* Main Content */ }
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-3">
                      { title }
                    </DialogTitle>

                    <div className='w-full flex flex-wrap gap-3'>
                      {
                        textFields.map((field, fieldIdx) => (
                          field.type === 'select' ?

                            <SelectField
                              key={ fieldIdx }
                              className={ `w-full ${ field.width }` }
                              label={ field.label }
                              name={ field.label }
                              type={ field.type }
                              value={ field.value }
                              options={ field.options }
                              onChange={ (e) => field.onChange(e) }
                              required={ field.required }
                            />

                            :

                            <TextField
                              key={ fieldIdx }
                              className={ `w-full ${ field.width }` }
                              label={ field.label }
                              name={ field.label }
                              type={ field.type }
                              value={ field.value }
                              onChange={ (e) => field.onChange(e) }
                              required={ field.required }
                            />
                        ))
                      }
                    </div>

                    {/* End Main Content */ }

                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto"
                    onClick={ submitPostReq }
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={ () =>
                    {
                      openPopupState.setState(false)
                      textFields.map(el =>
                      {
                        let e = { target: { value: '' } }
                        el.onChange(e)
                      })
                    } }
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}