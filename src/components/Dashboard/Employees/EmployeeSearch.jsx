'use client'

import { Fragment, useState } from 'react'
import { Combobox, ComboboxOptions, ComboboxInput, ComboboxOption, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Anthony Reynolds',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://wallpapers.com/images/featured/dbz-pictures-k5hhz7dgu1362s2v.webp',
  },
  {
    id: 3,
    name: 'Chris Floyd',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Anthony Reynolds',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://wallpapers.com/images/featured/dbz-pictures-k5hhz7dgu1362s2v.webp',
  },
  {
    id: 6,
    name: 'Chris Floyd',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Anthony Reynolds',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://wallpapers.com/images/featured/dbz-pictures-k5hhz7dgu1362s2v.webp',
  },
  {
    id: 9,
    name: 'Chris Floyd',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 11,
    name: 'Anthony Reynolds',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://wallpapers.com/images/featured/dbz-pictures-k5hhz7dgu1362s2v.webp',
  },
  {
    id: 12,
    name: 'Chris Floyd',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function Example ()
{
  const [ query, setQuery ] = useState('')
  const [ activeOption, setActiveOption ] = useState('')

  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) =>
      {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className="w-full transform divide-y divide-gray-100 overflow-hidden transition-all">
      <div>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            className="h-12 w-full border-0 bg-primary-100 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm rounded-md mb-2"
            placeholder="Search..."
            value={ query }
            onChange={ (event) => setQuery(event.target.value) }
            onBlur={ () => setQuery('') }
          />
        </div>

        { (query === '' || filteredPeople.length > 0) && (
          <div className="flex flex-col xl:flex-row divide-x divide-gray-100">
            <div
              className={ classNames(
                'w-full max-h-96 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                activeOption && 'sm:h-96'
              ) }
            >
              <div className="-mx-2 text-sm text-gray-700">
                { (query === '' ? people : filteredPeople).map((person) => (
                  <div
                    key={ person.id }
                    value={ person }
                    className='flex cursor-pointer select-none items-center rounded-md p-2 hover:bg-primary-100 hover:text-primary-300'
                    onClick={ () => setActiveOption(person) }
                  >
                    <Image
                      src={ person.imageUrl }
                      alt=""
                      className="h-6 w-6 flex-none rounded-full"
                      width={ 0 }
                      height={ 0 }
                      sizes='100vw'
                    />
                    <span className="ml-3 flex-auto truncate">{ person.name }</span>
                  </div>
                )) }
              </div>
            </div>

            {
              activeOption && (

                <div className="xl:h-96 w-full flex xl:flex-col divide-y divide-gray-100 gap-5">
                  <div className="xl:flex-none xl:p-6 text-center">
                    <Image
                      src={ activeOption.imageUrl }
                      alt=""
                      className="mx-auto h-16 w-16 rounded-full"
                      width={ 0 }
                      height={ 0 }
                      sizes='100vw'
                    />
                    <h2 className="mt-3 font-semibold text-gray-900">{ activeOption.name }</h2>
                    <p className="text-sm leading-6 text-gray-500">{ activeOption.role }</p>
                  </div>
                  <div className="flex flex-auto flex-col xl:justify-between xl:p-6">
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                      <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                      <dd>{ activeOption.phone }</dd>
                      <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                      <dd className="truncate">
                        <a href={ `mailto:${ activeOption.email }` } className="text-primary-300 underline">
                          { activeOption.email }
                        </a>
                      </dd>
                    </dl>
                    <button
                      type="button"
                      className="mt-6 w-full rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Send message
                    </button>
                  </div>
                </div>

              )
            }
          </div>
        ) }

        { query !== '' && filteredPeople.length === 0 && (
          <div className="px-6 py-14 text-center text-sm sm:px-14">
            <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">No people found</p>
            <p className="mt-2 text-gray-500">
              We couldn’t find anything with that term. Please try again.
            </p>
          </div>
        ) }
      </div>
    </div>
  )
}