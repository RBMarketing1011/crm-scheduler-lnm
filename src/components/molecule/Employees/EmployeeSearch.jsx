'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { IoIosPeople } from "react-icons/io"
import Avatar from '@images/avatars/avatar.png'
import InitialsIcon from './InitialsIcon'
import NoData from '@components/atom/NoData'

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}

export default function EmployeeSearch ()
{
  // ================================ Get Employees
  const { data: session } = useSession()
  // ================================ End Get Employees
  // ================================ Filter
  const [ query, setQuery ] = useState('')
  const [ activeOption, setActiveOption ] = useState('')

  const filteredEmployees =
    query === ''
      ? []
      : session?.employees.filter((person) =>
      {
        return person.firstname.toLowerCase().includes(query.toLowerCase())
      })
  // ================================ End Filter 

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

        { (query === '' || filteredEmployees.length > 0) && (
          <div className="flex flex-col xl:flex-row divide-x divide-gray-100">
            <div
              className={ classNames(
                'w-full max-h-96 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                activeOption && 'sm:h-96'
              ) }
            >
              <div className="-mx-2 text-sm text-gray-700">
                {
                  session?.employees &&
                    session?.employees.length ?
                    (query === '' ? session?.employees : filteredEmployees).map((person) => (
                      <div
                        key={ person._id }
                        // value={ person }
                        className='flex cursor-pointer select-none items-center rounded-md p-2 hover:bg-primary-100 hover:text-primary-300'
                        onClick={ () => setActiveOption(person) }
                      >
                        <InitialsIcon
                          firstInitial={ person.firstname.slice(0, 1) }
                          lastInitial={ person.lastname.slice(0, 1) }
                          borderColor='border-primary-300'
                        />
                        <span className="ml-3 flex-auto truncate">{ person.firstname } { person.lastname }</span>
                      </div>
                    ))

                    :

                    <NoData
                      data={ {
                        title: 'No Employees',
                        text: 'Get started by adding some employees to your account.',
                        icon: IoIosPeople
                      } }
                    />
                }
              </div>
            </div>

            {
              activeOption && (

                <div className="xl:h-96 w-full flex xl:flex-col divide-y divide-gray-100 gap-5">
                  <div className="xl:flex-none xl:p-6 text-center">
                    {
                      activeOption.image ?
                        <Image
                          src={ activeOption.image }
                          alt=""
                          className="mx-auto h-16 w-16 rounded-full"
                          width={ 0 }
                          height={ 0 }
                          sizes='100vw'
                        />

                        :

                        <Image
                          src={ Avatar }
                          alt="Employee Profile Image"
                          className="mx-auto h-16 w-16 rounded-full"
                          width={ 0 }
                          height={ 0 }
                          sizes='100vw'
                        />
                    }
                    <h2 className="mt-3 font-semibold text-gray-900">{ activeOption.firstname } { activeOption.lastname }</h2>
                    <p className="text-sm leading-6 text-gray-500">{ activeOption.employeeRole }</p>
                  </div>
                  <div className="flex flex-auto flex-col xl:justify-between xl:p-6">
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                      <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                      <dd>{ activeOption.phone ? activeOption.phone : 'N/A' }</dd>
                      <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                      <dd className="truncate">
                        <a href={ `mailto:${ activeOption.email }` } className="text-primary-300 underline">
                          { activeOption.email }
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              )
            }
          </div>
        ) }

        { query !== '' && filteredEmployees.length === 0 && (
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