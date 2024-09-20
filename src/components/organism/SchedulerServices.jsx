'use client'

import { useContext, useState } from 'react'
import { UserContext } from '@config/providers/context/UserContext'
import { toast } from 'react-toastify'
import { PlusIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon, XMarkIcon, WrenchScrewdriverIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import EmptyState from '@components/atom/EmptyState'

const SchedulerServices = ({ accountId, locationId }) =>
{
  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  const [ open, setOpen ] = useState(false)
  const [ openDelete, setOpenDelete ] = useState(false)
  const [ openUpdateService, setOpenUpdateService ] = useState(false)

  const [ service, setService ] = useState({
    id: locationId,
    title: '',
    desc: '',
    addQuestion: false,
    question: '',
    answer: '',
    answers: []
  })

  const [ deleteServiceTitle, setDeleteServiceTitle ] = useState('')

  const location = session?.locations?.find(location => location._id === locationId)

  const submitAddServiceForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch('/api/locations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service })
      })

      const res = await req.json()

      if (res.error)
      {
        throw new Error(res.error)
      } else
      {
        toast.success(res.success)
        update()
      }
    } catch (error)
    {
      toast.error(error.message)
    }

    setOpen(false)
    setService({
      id: locationId,
      title: '',
      desc: '',
      addQuestion: false,
      question: '',
      answer: '',
      answers: []
    })
  }

  const submitUpdateServiceForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch('/api/locations/service', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service })
      })

      const res = await req.json()

      if (res.error)
      {
        throw new Error(res.error)
      } else
      {
        toast.success(res.success)
        update()
      }

    } catch (error)
    {

    }
    setOpenUpdateService(false)
    setService({
      id: locationId,
      title: '',
      desc: '',
      addQuestion: false,
      question: '',
      answer: '',
      answers: []
    })
  }

  const deleteService = async () =>
  {
    try
    {
      const req = await fetch('/api/locations/service', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: locationId, title: deleteServiceTitle })
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

    setOpenDelete(false)
    update()
  }

  return (
    <main className='mt-4'>

      <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Your Services
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary-300 p-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 gap-2"
            onClick={ () => setOpen(true) }
          >
            <PlusIcon className='w-5 h-auto' />
            Add A Service
          </button>
        </div>
      </div>

      {
        location?.services?.length > 0 ?

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Question
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Answers
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">

                    {
                      location.services.map((serv, idx) => (

                        <tr key={ idx } className="even:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                            { serv.title }
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            { serv.desc }
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            { serv.question.text }
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {
                              serv.question.answers.map((answer, index) => (
                                <p key={ index } className='whitespace-nowrap text-sm text-gray-500'>
                                  { answer }
                                </p>
                              ))
                            }
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <button
                              className="text-primary-300 hover:text-primary-500"
                              onClick={ () =>
                              {
                                setService(prev => ({
                                  ...prev,
                                  title: serv.title,
                                  desc: serv.desc,
                                  addQuestion: serv.question.text ? true : false,
                                  question: serv.question.text,
                                  answers: serv.question.answers,
                                }))
                                setOpenUpdateService(true)
                              } }
                            >
                              Edit<span className="sr-only">, { serv.title }</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <button
                              className="text-red-600 hover:text-red-700"
                              onClick={ () =>
                              {
                                setOpenDelete(true)
                                setDeleteServiceTitle(serv.title)
                              } }
                            >
                              Delete<span className="sr-only">, { serv.title }</span>
                            </button>
                          </td>
                        </tr>

                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          :

          <EmptyState
            icon={ <WrenchScrewdriverIcon className='w-16 stroke-1 h-auto text-primary-300' /> }
            title='No Services'
            desc='You have not added any services yet.'
            btn={ {
              text: 'Add A Service',
              onClick: () => setOpen(true)
            } }
          />

      }


      {/* Dialog For Adding Service */ }
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
                    Add A Service
                  </DialogTitle>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-6 gap-y-2">
                    {/* Content */ }
                    <div className='col-span-full'>
                      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Your Service Title"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          value={ service.title }
                          onChange={ (e) => setService(prev => ({
                            ...prev,
                            title: e.target.value
                          })) }
                        />
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="desc"
                          name="desc"
                          type="text"
                          placeholder="Your Service Description"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          rows={ 2 }
                          value={ service.desc }
                          onChange={ (e) => setService(prev => ({
                            ...prev,
                            desc: e.target.value
                          })) }
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <fieldset>
                        <legend className="sr-only">Notifications</legend>
                        <div className="space-y-5">
                          <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                aria-describedby="comments-description"
                                className="h-4 w-4 rounded border-gray-300 text-primary-300 focus:ring-primary-300"
                                defaultChecked={ service.addQuestion }
                                onChange={ () => setService(prev => ({
                                  ...prev,
                                  addQuestion: !prev.addQuestion
                                })) }
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label htmlFor="comments" className="font-medium text-gray-900">
                                Add A Question
                              </label>{ ' ' }
                              <span id="comments-description" className="text-gray-500">
                                <span className="sr-only">Add A Question </span>so you know more about the issue.
                              </span>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    {
                      service.addQuestion &&
                      <>
                        <div className='col-span-full'>
                          <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                            What More Do You Want To Know?
                          </label>
                          <div className="mt-2">
                            <input
                              id="question"
                              name="question"
                              type="text"
                              placeholder="Your Question"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                              value={ service.question }
                              onChange={ (e) => setService(prev => ({
                                ...prev,
                                question: e.target.value
                              })) }
                            />
                          </div>
                        </div>

                        {
                          service?.answers?.length > 0 &&
                          service.answers.map((answer, index) => (

                            <div key={ index } className="col-span-full flex justify-between items-center px-10">
                              <p className='text-xs italic'>{ answer }</p>
                              <TrashIcon
                                className='w-4 h-4 hover:cursor-pointer text-red-600'
                                onClick={ () => setService(prev => ({
                                  ...prev,
                                  answers: prev.answers.filter((_, i) => i !== index)
                                })) }
                              />
                            </div>

                          ))
                        }

                        <div className="col-span-full">
                          <div className="flex flex-col sm:flex-row items-end">
                            <div className="w-full sm:max-w-sm">
                              <label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">
                                Add Up To 4 Selections For Customer To Choose From.
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="answer"
                                  name="answer"
                                  type="text"
                                  placeholder={ service.answers.length < 4 ? 'A Selection' : 'You can only add up to 4 selections' }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                                  rows={ 2 }
                                  value={ service.answer }
                                  onChange={ (e) => setService(prev => ({
                                    ...prev,
                                    answer: e.target.value
                                  })) }
                                  disabled={ service.answers.length < 4 ? false : true }
                                />
                              </div>
                            </div>
                            <button
                              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:ml-3 sm:mt-0 sm:w-auto whitespace-nowrap"
                              onClick={ () =>
                              {
                                service.answers.length < 4 &&
                                  setService(prev => ({
                                    ...prev,
                                    answer: '',
                                    answers: [ ...prev.answers, prev.answer ],
                                  }))
                              } }
                            >
                              Add Selection
                            </button>
                          </div>
                        </div>
                      </>
                    }

                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto"
                  onClick={ submitAddServiceForm }
                >
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={ () =>
                  {
                    setOpen(false)
                    setService({
                      id: locationId,
                      title: '',
                      desc: '',
                      addQuestion: false,
                      question: '',
                      answer: '',
                      answers: []
                    })
                  } }
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      {/* Dialog For Updating Service */ }
      <Dialog open={ openUpdateService } onClose={ setOpenUpdateService } className="relative z-[1000]">
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
                  onClick={ () => setOpenUpdateService(false) }
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="w-full sm:flex sm:items-start">
                <div className="w-full mt-3 text-left sm:ml-4 sm:mt-0">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 border-gray-200 border-b pb-2">
                    Add A Service
                  </DialogTitle>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-6 gap-y-2">
                    {/* Content */ }
                    <div className='col-span-full'>
                      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Your Service Title"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          value={ service.title }
                          onChange={ (e) => setService(prev => ({
                            ...prev,
                            title: e.target.value
                          })) }
                        />
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="desc"
                          name="desc"
                          type="text"
                          placeholder="Your Service Description"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                          rows={ 2 }
                          value={ service.desc }
                          onChange={ (e) => setService(prev => ({
                            ...prev,
                            desc: e.target.value
                          })) }
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <fieldset>
                        <legend className="sr-only">Notifications</legend>
                        <div className="space-y-5">
                          <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                aria-describedby="comments-description"
                                className="h-4 w-4 rounded border-gray-300 text-primary-300 focus:ring-primary-300"
                                defaultChecked={ service.addQuestion }
                                onChange={ () => setService(prev => ({
                                  ...prev,
                                  addQuestion: !prev.addQuestion
                                })) }
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label htmlFor="comments" className="font-medium text-gray-900">
                                Add A Question
                              </label>{ ' ' }
                              <span id="comments-description" className="text-gray-500">
                                <span className="sr-only">Add A Question </span>so you know more about the issue.
                              </span>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    {
                      service.addQuestion &&
                      <>
                        <div className='col-span-full'>
                          <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                            What More Do You Want To Know?
                          </label>
                          <div className="mt-2">
                            <input
                              id="question"
                              name="question"
                              type="text"
                              placeholder="Your Question"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                              value={ service.question }
                              onChange={ (e) => setService(prev => ({
                                ...prev,
                                question: e.target.value
                              })) }
                            />
                          </div>
                        </div>

                        {
                          service?.answers?.length > 0 &&
                          service.answers.map((answer, index) => (

                            <div key={ index } className="col-span-full flex justify-between items-center px-10">
                              <p className='text-xs italic'>{ answer }</p>
                              <TrashIcon
                                className='w-4 h-4 hover:cursor-pointer text-red-600'
                                onClick={ () => setService(prev => ({
                                  ...prev,
                                  answers: prev.answers.filter((_, i) => i !== index)
                                })) }
                              />
                            </div>

                          ))
                        }

                        <div className="col-span-full">
                          <div className="flex items-end">
                            <div className="w-full sm:max-w-sm">
                              <label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">
                                Add Up To 4 Selections For Customer To Choose From.
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="answer"
                                  name="answer"
                                  type="text"
                                  placeholder={ service.answers.length < 4 ? 'A Selection' : 'You can only add up to 4 selections' }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
                                  rows={ 2 }
                                  value={ service.answer }
                                  onChange={ (e) => setService(prev => ({
                                    ...prev,
                                    answer: e.target.value
                                  })) }
                                  disabled={ service.answers.length < 4 ? false : true }
                                />
                              </div>
                            </div>
                            <button
                              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:ml-3 sm:mt-0 sm:w-auto"
                              onClick={ () =>
                              {
                                service.answers.length < 4 &&
                                  setService(prev => ({
                                    ...prev,
                                    answer: '',
                                    answers: [ ...prev.answers, prev.answer ],
                                  }))
                              } }
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </>
                    }

                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto"
                  onClick={ submitUpdateServiceForm }
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={ () =>
                  {
                    setOpenUpdateService(false)
                    setService({
                      id: locationId,
                      title: '',
                      desc: '',
                      addQuestion: false,
                      question: '',
                      answer: '',
                      answers: []
                    })
                  } }
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      {/* Dialog you delete service */ }
      <Dialog open={ openDelete } onClose={ setOpenDelete } className="relative z-[1000]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={ () => setOpenDelete(false) }
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Delete Service
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this service? All of the data will be permanently removed from this location forever. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={ () =>
                  {
                    deleteService()
                  } }
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={ () => setOpenDelete(false) }
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </main>
  )
}

export default SchedulerServices