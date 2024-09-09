'use client'

import { useId } from 'react'
import Image from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@components/template/Container'
import screenshotContacts from '@images/screenshots/contacts.png'
import screenshotInventory from '@images/screenshots/inventory.png'
import screenshotProfitLoss from '@images/screenshots/profit-loss.png'
import { ChatBubbleLeftRightIcon, PresentationChartLineIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'TekMetric Integration',
    summary: 'TekMetric Integration enables efficient data management and workflow optimization within our scheduling platform for auto repair shops.',
    description:
      'Integrate TekMetric seamlessly with our software for streamlined data management and enhanced workflow efficiency.',
    image: screenshotProfitLoss,
    icon: GlobeAltIcon,
  },
  {
    name: 'Team Messaging',
    summary:
      'Team Messaging streamlines staff communication, enhancing collaboration and coordination for auto repair shops.',
    description:
      'Facilitate smooth communication and collaboration among team members directly within our scheduling software.',
    image: screenshotInventory,
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Shop Reports',
    summary:
      'Shop Reports provide actionable insights, empowering informed decision-making and operational optimization for auto repair shops.',
    description:
      "Access comprehensive insights into your shop's performance and trends through integrated reporting features.",
    image: screenshotContacts,
    icon: PresentationChartLineIcon,
  },
]

function Feature ({ feature, isActive, className, ...props })
{
  return (
    <div
      className={ clsx(className, !isActive && 'opacity-50 hover:opacity-100') }
      { ...props }
    >
      <div
        className={ clsx(
          'w-9 rounded-lg p-1',
          isActive ? 'bg-primary-300 bg-gradient-to-r from-primary-300/10 to-primary-500 text-white' : 'text-white bg-gradient-to-r from-primary-100 to-primary-300/30',
        ) }
      >
        <feature.icon />
      </div>
      <h3
        className={ clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-primary-300' : 'text-slate-600',
        ) }
      >
        { feature.name }
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        { feature.summary }
      </p>
      <p className="mt-4 text-sm text-slate-600">{ feature.description }</p>
    </div>
  )
}

function FeaturesMobile ()
{
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      { features.map((feature) => (
        <div key={ feature.summary }>
          <Feature feature={ feature } className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={ feature.image }
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      )) }
    </div>
  )
}

function FeaturesDesktop ()
{
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      { ({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            { features.map((feature, featureIndex) => (
              <Feature
                key={ feature.summary }
                feature={ {
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      { feature.name }
                    </Tab>
                  ),
                } }
                isActive={ featureIndex === selectedIndex }
                className="relative"
              />
            )) }
          </TabList>
          <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              { features.map((feature, featureIndex) => (
                <TabPanel
                  static
                  key={ feature.summary }
                  className={ clsx(
                    'px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60',
                  ) }
                  style={ { transform: `translateX(-${ selectedIndex * 100 }%)` } }
                  aria-hidden={ featureIndex !== selectedIndex }
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={ feature.image }
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              )) }
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </TabPanels>
        </>
      ) }
    </TabGroup>
  )
}

export function SecondaryFeatures ()
{
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simplify everyday business tasks.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Because you’d probably be a little confused if we suggested you
            complicate your everyday business tasks instead.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
