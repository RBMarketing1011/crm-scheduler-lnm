'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@components/template/Container'
import backgroundImage from '@images/background-features.jpg'
import screenshotExpenses from '@images/screenshots/expenses.png'
import screenshotPayroll from '@images/screenshots/payroll.png'
import screenshotReporting from '@images/screenshots/reporting.png'
import screenshotVatReturns from '@images/screenshots/vat-returns.png'

const features = [
  {
    title: 'Appointments',
    description:
      "Seamlessly schedule, reschedule, and track appointments to optimize workflow and ensure timely service for your auto repair location.",
    image: screenshotPayroll,
  },
  {
    title: 'Customized Profiles',
    description:
      "Create customized profiles so everyone on your team can know who they are working with.",
    image: screenshotVatReturns,
  },
  {
    title: 'Repair Orders',
    description:
      "Manage every aspect of the repair process, from assessment to invoicing, to ensure efficient and accurate repairs while keeping costs under control.",
    image: screenshotExpenses,
  },
  {
    title: 'Employees',
    description:
      'Empower your team with task assignment, productivity tracking, and schedule management to enhance efficiency and deliver exceptional service at every level of your auto repair location.',
    image: screenshotReporting,
  },
]

export function PrimaryFeatures ()
{
  let [ tabOrientation, setTabOrientation ] = useState('horizontal')

  useEffect(() =>
  {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange ({ matches })
    {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () =>
    {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-primary-300 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={ backgroundImage }
        alt=""
        width={ 2245 }
        height={ 1636 }
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to run your location.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like tax compliance.
          </p>
        </div>
        <TabGroup
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={ tabOrientation === 'vertical' }
        >
          { ({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <TabList className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  { features.map((feature, featureIndex) => (
                    <div
                      key={ feature.title }
                      className={ clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                      ) }
                    >
                      <h3>
                        <Tab
                          className={ clsx(
                            'font-display text-lg ui-not-focus-visible:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-primary-300 lg:text-white'
                              : 'text-primary-100 hover:text-white lg:text-white',
                          ) }
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          { feature.title }
                        </Tab>
                      </h3>
                      <p
                        className={ clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white',
                        ) }
                      >
                        { feature.description }
                      </p>
                    </div>
                  )) }
                </TabList>
              </div>
              <TabPanels className="lg:col-span-7">
                { features.map((feature) => (
                  <TabPanel key={ feature.title } unmount={ false }>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        { feature.description }
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={ feature.image }
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </TabPanel>
                )) }
              </TabPanels>
            </>
          ) }
        </TabGroup>
      </Container>
    </section>
  )
}
