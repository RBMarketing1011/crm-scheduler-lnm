'use client'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

const InstructionsPage = () =>
{
  return (
    <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
      <div className="bg-white px-6 pb-32 lg:px-8 space-y-10">

        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-primary-300">
            Step 1
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add The Proper Information For Each Location
          </h1>
          <div className="mt-3 max-w-2xl">
            <p>
              In order to provide your customer with the best experience, you need to ensure you add the correct services offered at each of your locations.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Select The Location:
                  </strong>{ ' ' }
                  In the navigation directly to your left, select the location you want to get a scheduler for.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Add Services:
                  </strong>{ ' ' }
                  Ensure all the services offered at your location are correctly added. You can do this by selecting Add Service and entering the service name and description.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Add a Custom Question for Selected Services:
                  </strong>{ ' ' }
                  <span className='text-primary-300'>optional</span>
                  <ul className='list-disc space-y-2 ml-12'>
                    <li className='mt-3'>
                      For each service, you have the option to add 1 additional question that the customer must answer during the scheduling process.
                    </li>
                    <li>
                      After selecting a service, go to the Additional Questions section.
                    </li>
                    <li>
                      Create the question and provide up to 4 answer choices that the customer can select from.
                    </li>
                  </ul>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Save Changes:
                  </strong>{ ' ' }
                  Once you&apos;ve added all services and questions, make sure to save your settings.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-primary-300">
            Step 2
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Verify Opening Hours
          </h1>
          <div className="mt-3 max-w-2xl">
            <p>
              In order to ensure the appointments are being scheduled during business hours, please make sure the location hours are correct.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Select The Location:
                  </strong>{ ' ' }
                  In the navigation directly to your left, select the location you want to get a scheduler for.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Review and Verify Hours:
                  </strong>{ ' ' }
                  Ensure the correct opening hours for your location are set. These hours define when appointments can be scheduled.

                  <ul className='list-disc space-y-2 ml-12'>
                    <li className='mt-3'>
                      Check both weekday and weekend hours and adjust as necessary.
                    </li>
                  </ul>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Save Changes:
                  </strong>{ ' ' }
                  After verifying, save the updated hours to finalize the appointment availability.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-primary-300">
            Step 3
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Installing the Scheduler on Your Website
          </h1>
          <div className="mt-3 max-w-2xl">
            <p>
              Once your services and hours are verified, follow these steps to integrate the scheduler on your website.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Determine which scheduler you want to install:
                  </strong>{ ' ' }
                  You have the option to install either a global scheduler for all locations or an individual scheduler for a single location. Decide which scheduler fits your needs.

                  <ul className='list-disc space-y-2 ml-12'>
                    <li className='mt-3'>
                      If installing a global scheduler, navigate to Global Scheduler tab
                    </li>
                    <li>
                      If installing a single scheduler, navigate to specific location tab
                    </li>
                  </ul>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Copy the Script Tag:
                  </strong>{ ' ' }

                  <ul className='list-disc space-y-2 ml-12'>
                    <li className='mt-3'>
                      Once in the correct tab, you&apos;ll find a script tag under the Installation section. It will look something like this:
                    </li>
                    <div className="divide-y divide-slate-500 overflow-hidden rounded-md bg-slate-800 shadow">
                      <div className="px-4 py-1 sm:px-6 text-primary-300/70 flex justify-between items-center">
                        <span>script tag</span>
                        <span
                          className='flex gap-1 text-xs items-center hover:cursor-pointer'
                          onClick={ () =>
                          {
                            navigator.clipboard.writeText("<script src='https://your-url.com/scheduler.js' account='845932015475'></script>")
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
                            { ' ' }
                            <span className='text-purple-500'>src</span>
                            <span className='text-cyan-100'>=&apos;</span>
                            <span className="text-yellow-500">
                              https://your-url.com/scheduler.js
                            </span>
                            <span className='text-cyan-100'>&apos;</span>
                            { ' ' }
                            <span className='text-purple-500'>account</span>
                            <span className='text-cyan-100'>=&apos;</span>
                            <span className="text-yellow-500">
                              your-account-id
                            </span>
                            <span className='text-cyan-100'>&apos;&gt;</span>
                            <span className='text-cyan-100'>&lt;&#47;</span>
                            <span className='text-red-500/80'>script</span>
                            <span className='text-cyan-100'>&gt;</span>
                          </code>
                        </pre>
                      </div>
                    </div>
                  </ul>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Add Scheduler Button to Your Website:
                  </strong>{ ' ' }

                  <ul className='list-disc space-y-2 ml-12'>
                    <li className='mt-3'>
                      To trigger the scheduler pop-up, you need to add the class <span className='text-primary-300 font-bold'>.schedule-appt-btn</span> to any button or link you want to use for scheduling.
                    </li>
                  </ul>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary-300" />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Test the Scheduler:
                  </strong>{ ' ' }
                  Once everything is installed, test your website to ensure the scheduler pops up when you click the buttons or elements with the <span className='text-primary-300 font-bold'>.schedule-appt-btn</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}

export default InstructionsPage