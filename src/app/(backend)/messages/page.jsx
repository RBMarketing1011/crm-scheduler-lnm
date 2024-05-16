'use client'

import Container from '@components/Dashboard/Container'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import { Fragment, useState } from 'react'

import
{
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import
{
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/react/20/solid'
import { Listbox, ListboxOptions, ListboxOption, ListboxButton, Label, Transition } from '@headlessui/react'
import Image from 'next/image'

const navigation = [
  { name: 'Auto Ops', icon: HomeIcon, count: '5' },
  { name: 'Shop genie', href: '#', icon: UsersIcon },
  { name: 'Steer', icon: FolderIcon, count: '12' },
  { name: 'Web Dev', icon: CalendarIcon, count: '20+' },
  { name: 'Us Team', icon: DocumentDuplicateIcon },
  { name: 'Entire Team', icon: ChartPieIcon },
]
const secondaryNavigation = [
  { name: 'Ryan Burton' },
  { name: 'Kyle tate' },
  { name: 'Rachel Bordeaux' },
  { name: 'Adam Springer' },
  { name: 'Jason Nimer' },
]

const activity = [
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Anthony Reynolds',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Anthony Reynolds',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames (...classes)
{
  return classes.filter(Boolean).join(' ')
}


const Page = () =>
{
  const [ page, setPage ] = useState('Auto Ops')
  const [ selected, setSelected ] = useState(moods[ 5 ])

  return (
    <Container>
      <TitleHeading title='Messages' />
      <div className='flex justify-start items-start gap-5 border-t border-gray-300 pt-3'>
        <nav className="min-w-48 flex flex-1 flex-col" aria-label="Sidebar">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="text-xs font-semibold leading-6 text-primary-300">Groups</div>
              <ul role="list" className="-mx-2 space-y-1">
                {
                  navigation.map(item => (

                    <li key={ item.name }>
                      <button className={ ` 
                        ${ page === item.name ?
                          'bg-primary-100 text-primary-300'
                          : 'text-gray-700' } 
                        w-full hover:text-primary-300 hover:bg-primary-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                      `}
                        onClick={ () => setPage(item.name) }
                      >
                        <span
                          className={ `
                          ${ page === item.name ?
                              'text-primary-300 border-primary-300'
                              : 'text-gray-400 border-gray-200' }
                          group-hover:border-primary-300 group-hover:text-primary-300 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white
                        `}
                        >
                          { item.name.slice(0, 1) }
                        </span>
                        { item.name }
                        {
                          item.count &&
                          <span
                            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary-300 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white"
                            aria-hidden="true"
                          >
                            { item.count }
                          </span>

                        }
                      </button>
                    </li>

                  ))
                }
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-primary-300">Direct Messages</div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {
                  secondaryNavigation.map(item => (

                    <li key={ item.name }>
                      <button className={ ` 
                    ${ page === item.name ?
                          'bg-primary-100 text-primary-300'
                          : 'text-gray-700' } 
                      w-full hover:text-primary-300 hover:bg-primary-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold pl-3
                      `}
                        onClick={ () => setPage(item.name) }
                      >
                        { item.name }
                        {
                          item.count &&
                          <span
                            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary-300 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white"
                            aria-hidden="true"
                          >
                            { item.count }
                          </span>

                        }
                      </button>
                    </li>

                  ))
                }
              </ul>
            </li>
          </ul>
        </nav>

        <div className='w-full min-h-[85vh] px-20 flex flex-col justify-between gap-5'>
          <ul role="list" className="max-h-[70vh] overflow-y-auto p-3 flex flex-col-reverse gap-5">
            { activity.map((activityItem, activityItemIdx) => (

              activityItem.person.name.includes('Anthony') ?
                <li key={ activityItem.id } className="relative flex gap-x-4">
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-primary-300 shadow-[0_0_8px_#ef5124]">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">{ activityItem.person.name }</span> commented
                      </div>
                      <time dateTime={ activityItem.dateTime } className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                        { activityItem.date }
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">{ activityItem.comment }</p>
                  </div>
                  <Image
                    src={ activityItem.person.imageUrl }
                    alt="Alt"
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                    width={ 0 }
                    height={ 0 }
                    sizes='100vw'
                  />
                </li>

                :

                <li key={ activityItem.id } className="relative flex gap-x-4">
                  <Image
                    src={ activityItem.person.imageUrl }
                    alt="Alt"
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                    width={ 0 }
                    height={ 0 }
                    sizes='100vw'
                  />
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 shadow-[0_0_8px_lightgrey]">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">{ activityItem.person.name }</span> commented
                      </div>
                      <time dateTime={ activityItem.dateTime } className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                        { activityItem.date }
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">{ activityItem.comment }</p>
                  </div>
                </li>

            )) }
          </ul>

          {/* New comment form */ }
          <div className="flex gap-x-3 max-h-[15vh]">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Alt"
              className="h-6 w-6 flex-none rounded-full bg-gray-50"
              width={ 0 }
              height={ 0 }
              sizes='100vw'
            />
            <form action="#" className="relative flex-auto">
              <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary-300">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={ 2 }
                  name="comment"
                  id="comment"
                  className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add your comment..."
                  defaultValue={ '' }
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Attach a file</span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <Listbox value={ selected } onChange={ setSelected }>
                      { ({ open }) => (
                        <>
                          <Label className="sr-only">Your mood</Label>
                          <div className="relative">
                            <ListboxButton className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                              <span className="flex items-center justify-center">
                                { selected.value === null ? (
                                  <span>
                                    <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Add your mood</span>
                                  </span>
                                ) : (
                                  <span>
                                    <span
                                      className={ classNames(
                                        selected.bgColor,
                                        'flex h-8 w-8 items-center justify-center rounded-full'
                                      ) }
                                    >
                                      <selected.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                    </span>
                                    <span className="sr-only">{ selected.name }</span>
                                  </span>
                                ) }
                              </span>
                            </ListboxButton>

                            <Transition
                              show={ open }
                              as={ Fragment }
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <ListboxOptions className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                { moods.map((mood) => (
                                  <ListboxOption
                                    key={ mood.value }
                                    className={ ({ active }) =>
                                      classNames(
                                        active ? 'bg-gray-100' : 'bg-white',
                                        'relative cursor-default select-none px-3 py-2'
                                      )
                                    }
                                    value={ mood }
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={ classNames(
                                          mood.bgColor,
                                          'flex h-8 w-8 items-center justify-center rounded-full'
                                        ) }
                                      >
                                        <mood.icon
                                          className={ classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0') }
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <span className="ml-3 block truncate font-medium">{ mood.name }</span>
                                    </div>
                                  </ListboxOption>
                                )) }
                              </ListboxOptions>
                            </Transition>
                          </div>
                        </>
                      ) }
                    </Listbox>
                  </div>
                </div>
                <button
                  type="submit"
                >
                  <PaperAirplaneIcon className='bg-primary-300 text-white rounded-full h-8 w-8 p-1.5 -rotate-90 hover:bg-primary-500' />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Page