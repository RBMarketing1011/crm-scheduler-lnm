'use client'

import { useContext, useState } from 'react'
import { UserContext } from '@config/providers/context/UserContext'
import { usePathname } from 'next/navigation'
import Loading from '@components/atom/Loading'
import
{
  GlobeAmericasIcon, CodeBracketIcon, XMarkIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

import SchedulerHours from '../../../organism/SchedulerHours'
import SchedulerServices from '@components/organism/SchedulerServices'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { toast } from 'react-toastify'

const SchedulerLocationPage = ({ accountId, locationId }) =>
{
  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState
  const [ tab, setTab ] = useState('Hours & Address')
  const [ open, setOpen ] = useState(false)

  const [ code, setCode ] = useState({
    isGlobal: false,
    email: ''
  })

  const pathname = usePathname()

  const navs = [
    'Hours & Address',
    'Services'
  ]

  const sendInstructs = async () =>
  {
    try
    {
      const req = await fetch('/api/scheduler/send-instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: code.email,
          locationname: session.locations.find(loc => loc._id === locationId).name,
          user: session.user.firstname + ' ' + session.user.lastname,
          accountId,
          locationId,
          isGlobal: code.isGlobal
        })
      })

      const res = await req.json()

      if (res.error)
      {
        throw new Error(res.error)
      } else
      {
        toast.success(res.success)
      }
    } catch (error)
    {
      toast.error(error.message)
    }

    setCode({
      script: '',
      email: ''
    })
    setOpen(false)
    update()
  }

  const allLocationsHaveServices = () =>
  {
    return session?.locations.every(loc => loc.services.length > 0)
  }

  const locationHasServices = () =>
  {
    return session?.locations.find(loc => loc._id === locationId).services.length > 0
  }

  return (
    <main className="w-full px-4 sm:px-6 lg:px-0">

      {
        session?.locations ?
          session.locations.map(location => (
            location._id === locationId &&

            <div key={ location._id }>
              <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    { location.nickname }
                  </h3>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row md:absolute md:right-0 md:top-3 md:mt-0">
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ring-1 ring-inset ring-gray-300"
                      onClick={ () =>
                      {
                        setCode(prev => ({
                          ...prev,
                          isGlobal: false
                        }))
                        setOpen(true)
                      } }
                    >
                      <CodeBracketIcon className="h-5 w-5 mr-2" />
                      Get Location Script
                    </button>
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                      onClick={ () =>
                      {
                        setCode(prev => ({
                          ...prev,
                          isGlobal: true
                        }))
                        setOpen(true)
                      } }
                    >
                      <GlobeAmericasIcon className="h-5 w-5 mr-2" />
                      Get Global Script
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="current-tab"
                      name="current-tab"
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-300"
                      onChange={ (e) => setTab(e.target.value) }
                    >
                      {
                        navs.map((nav, idx) => (

                          <option key={ idx } value={ nav }>{ nav }</option>

                        ))
                      }
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">

                      {
                        navs.map((nav, idx) => (

                          <p
                            key={ idx }
                            className={ `${ tab === nav
                              ? 'border-primary-300 text-primary-300'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                              } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium hover:cursor-pointer`
                            }
                            onClick={ () => setTab(nav) }
                          >

                            { nav }

                          </p>

                        )) }
                    </nav>
                  </div>
                </div>
              </div>

              {
                tab === 'Hours & Address' ?

                  <SchedulerHours accountId={ accountId } locationId={ locationId } />

                  :

                  <SchedulerServices accountId={ accountId } locationId={ locationId } />
              }

            </div>
          ))

          :

          <Loading
            title='Loading Details'
            desc='Please wait while we load the details'
          />
      }


      {/* Dialog For Scripts */ }
      <Dialog open={ open } onClose={ setOpen } className="relative z-[1000]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full w-screen sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="absolute right-0 top-0 pr-4 pt-4 block">
                <button
                  type="button"
                  onClick={ () => setOpen(false) }
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="w-full sm:flex sm:items-start">
                <div className="w-full mt-3 text-left sm:ml-4 sm:mt-0">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 border-gray-200 border-b pb-2">
                    Install Your Scheduler
                  </DialogTitle>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-6 divide-y-[1.5px] divide-neutral-200">
                    {/* Content */ }

                    {
                      code.isGlobal && !allLocationsHaveServices() ?

                        <>
                          <div className="col-span-full pb-3">
                            <p className='text-sm font-regular'>
                              You do not services set up for <strong>ALL YOUR LOCATIONS</strong>.
                            </p>
                            <p className='text-sm font-regular mt-3'>
                              Please set up services for <strong>ALL YOUR LOCATIONS</strong> to get the global script.
                            </p>
                          </div>
                          <div className="col-span-full flex justify-end pt-3">
                            <button
                              type="button"
                              onClick={ () =>
                              {
                                setOpen(false)
                              } }
                              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Close
                            </button>
                          </div>
                        </>

                        :

                        !code.isGlobal && !locationHasServices() ?

                          <>
                            <div className="col-span-full pb-3">
                              <p className='text-sm font-regular'>
                                You do not services set up for <strong>THIS LOCATION</strong>.
                              </p>
                              <p className='text-sm font-regular mt-3'>
                                Please set up services for <strong>THIS LOCATION</strong> to get the location script.
                              </p>
                            </div>
                            <div className="col-span-full flex justify-end pt-3">
                              <button
                                type="button"
                                onClick={ () =>
                                {
                                  setOpen(false)
                                } }
                                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              >
                                Close
                              </button>
                            </div>
                          </>

                          :
                          <>
                            <div className="col-span-full py-3">
                              <p className='text-sm font-regular'>
                                Copy the script below and paste it into your website&apos;s HTML code.
                              </p>
                              <p className='text-sm font-regular'>
                                Inside the{ ' ' }
                                <code className='text-red-500/80'>&lt;head&gt;</code>
                                ~ Paste Code Here ~
                                <code className='text-red-500/80'>&lt;&#47;head&gt;</code> tag.
                              </p>
                            </div>

                            <div className="col-span-full py-3">
                              <div className="divide-y divide-slate-500 overflow-x-auto rounded-md bg-slate-800 shadow">
                                <div className="px-4 py-1 sm:px-6 text-neutral-300 flex justify-between items-center">
                                  <span className='text-xs'>script tag</span>
                                  <span
                                    className='flex gap-1 text-xs items-center hover:cursor-pointer'
                                    onClick={ () =>
                                    {
                                      code.isGlobal ?

                                        navigator.clipboard.writeText(`<script src='https://your-url.com/scheduler.js' account='${ accountId }'></script>`)

                                        :

                                        navigator.clipboard.writeText(`<script src='https://your-url.com/scheduler.js' account='${ accountId }' location='${ locationId }'></script>`)
                                    } }
                                  >
                                    <DocumentDuplicateIcon className='w-5 h-5' />
                                    copy code
                                  </span>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                  <pre className='text-xs'>
                                    <code>
                                      <span className='text-cyan-100'>&lt;</span>
                                      <span className='text-red-500/80'>script</span>
                                    </code>
                                    <br />
                                    <code className='ml-5'>
                                      <span className='text-purple-500'>src</span>
                                      <span className='text-cyan-100'>=&apos;</span>
                                      <span className="text-yellow-500">
                                        https://your-url.com/scheduler.js
                                      </span>
                                      <span className='text-cyan-100'>&apos;</span>
                                    </code>
                                    <br />
                                    <code className='ml-5'>
                                      <span className='text-purple-500'>account</span>
                                      <span className='text-cyan-100'>=&apos;</span>
                                      <span className="text-yellow-500">
                                        { accountId }
                                      </span>
                                      <span className='text-cyan-100'>&apos;</span>
                                    </code>

                                    {
                                      !code.isGlobal &&
                                      <>
                                        <br />
                                        <code className='ml-5'>
                                          <span className='text-purple-500'>location</span>
                                          <span className='text-cyan-100'>=&apos;</span>
                                          <span className="text-yellow-500">
                                            { locationId }
                                          </span>
                                          <span className='text-cyan-100'>&apos;</span>
                                        </code>
                                      </>
                                    }

                                    <br />
                                    <code>
                                      <span className='text-cyan-100'>&gt;&lt;&#47;</span>
                                      <span className='text-red-500/80'>script</span>
                                      <span className='text-cyan-100'>&gt;</span>
                                    </code>
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-full py-3">
                              <p className='text-sm font-regular'>
                                Remember, to trigger the scheduler pop-up, you need to add the class <code className='text-primary-300'>.schedule-appt-btn</code> to any button or link you want to use for scheduling.
                              </p>
                            </div>

                            <div className="col-span-full py-3">
                              <p className='text-sm font-regular mt-6 mb-2'>
                                Or you can send the instructions to your developer by entering their email below.
                              </p>
                              <div className="flex flex-col sm:flex-row items-end">
                                <div className="w-full sm:max-w-sm">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email to send instructions to
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                                      value={ code.email }
                                      onChange={ (e) => setCode(prev => ({
                                        ...prev,
                                        email: e.target.value
                                      })) }
                                    />
                                  </div>
                                </div>
                                <button
                                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:ml-3 sm:mt-0 sm:w-auto whitespace-nowrap"
                                  onClick={ () => sendInstructs() }
                                >
                                  Send Instructions
                                </button>
                              </div>
                            </div>
                          </>
                    }

                  </div>
                </div>
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>

    </main>
  )
}

export default SchedulerLocationPage