'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import Container from '@components/atom/Container'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import Button from '@components/atom/Button'
import PopupForm from '@components/molecule/Popups/PopupForm'
import DeleteItemPopup from '@components/molecule/Popups/DeleteItemPopup'

import { IoIosPeople } from "react-icons/io"

const AccountMembersPage = () =>
{
  const { data: session, update: refresh } = useSession()
  // ================================= PopupForm
  // For adding employee
  const [ openPopupForm, setOpenPopupForm ] = useState(false)
  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    shops: '',
    employeeRole: '',
  })
  // For Editing Employee
  const [ openEditEmployeePopupForm, setEditEmployeeOpenPopupForm ] = useState(false)
  const [ editEmployeeData, setEditEmployeeData ] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    shops: '',
    employeeRole: '',
  })
  // ================================= PopupForm
  // ================================= Delete Employee 
  const [ showDeleteEmployee, setShowDeleteEmployee ] = useState(false)
  const [ deleteEmployeeData, setDeleteEmployeeData ] = useState({
    id: '',
    accountId: '',
    url: `/api/employees`,
  })
  // ================================= End Delete Employee 
  // ================================= Options for adding shops employee has access to
  let shopsOptions = []
  shopsOptions.push('All')
  session?.locations?.map(el => (shopsOptions.push(el.name)))
  // ================================= End Options for adding shops employee has 


  return (
    <Container>
      <main className="px-4 py-5 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
        <div className="border-b border-gray-200 bg-white pb-2 mb-5">
          <TitleHeading title='Team Members' />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                A list of all LNM Admin employees including their name, role, email and active status. You can add, edit, or delete employees from this list.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-primary-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                onClick={ () => setOpenPopupForm(true) }
              >
                Add employee
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {
                  session?.adminUsers &&
                    session?.adminUsers.length ?

                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-300 sm:pl-0">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                            Role
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-primary-300">
                            Active
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Delete</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {
                          session?.adminUsers.map((person) => (

                            <tr key={ person.email }>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                { person.firstname } { person.lastname }
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                { person.email }
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                { person.employeeRole }
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                { person.emailVerified ? 'True' : 'Acceptance Pending' }
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <button
                                  className="text-slate-500 hover:text-slate-900"
                                  onClick={ () =>
                                  {
                                    setEditEmployeeData({
                                      id: person._id,
                                      firstname: person.firstname,
                                      lastname: person.lastname,
                                      email: person.email,
                                      shops: person.shops,
                                      employeeRole: person.employeeRole,
                                    })

                                    setEditEmployeeOpenPopupForm(true)
                                  } }
                                >
                                  Edit
                                  <span className="sr-only">
                                    Edit { person.firstname } { person.lastname }
                                  </span>
                                </button>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <button
                                  className="text-red-500 hover:text-primary-500"
                                  onClick={ () =>
                                  {
                                    setDeleteEmployeeData(prev => ({
                                      ...prev,
                                      id: person._id,
                                      accountId: session?.account._id
                                    }))

                                    setShowDeleteEmployee(true)
                                  } }
                                >
                                  Delete
                                  <span className="sr-only">
                                    Delete
                                    { person.firstname } { person.lastname }
                                  </span>
                                </button>
                              </td>
                            </tr>

                          ))
                        }
                      </tbody>
                    </table>

                    :

                    <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                      <IoIosPeople className='text-6xl text-primary-300' />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Employees</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Get started by adding some employees to your account.
                      </p>
                      <Button
                        text='Add Employee'
                        onClick={ () => setOpenPopupForm(true) }
                      />
                    </div>
                }

              </div>
            </div>
          </div>
        </div>


        {/* Modal for Add Employee Form */ }
        <PopupForm
          title='Add Employee'
          openPopupState={ { state: openPopupForm, setState: setOpenPopupForm } }
          httpRequest={ {
            url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
            method: 'POST',
            body: JSON.stringify({ employee: formData, accountId: session?.activeUser?.accountId })
          } }

          textFields={ [
            {
              width: 'sm:w-[48.5%]',
              type: 'text',
              label: 'First Name',
              value: formData.firstname,
              required: true,
              onChange: (e) =>
              {
                setFormData(prev => ({
                  ...prev,
                  firstname: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[48.5%]',
              type: 'text',
              label: 'Last Name',
              value: formData.lastname,
              required: true,
              onChange: (e) =>
              {
                setFormData(prev => ({
                  ...prev,
                  lastname: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[99.5%]',
              type: 'email',
              label: 'Email',
              value: formData.email,
              required: true,
              onChange: (e) =>
              {
                setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[99.5%]',
              type: 'select',
              label: 'Employee Role',
              options: [
                'LNM'
              ],
              required: true,
              value: formData.employeeRole,
              onChange: (e) =>
              {
                setFormData(prev => ({
                  ...prev,
                  employeeRole: e.target.value
                }))
              }
            }
          ] }
        />



        {/* Modal for Edit Employee Form */ }
        <PopupForm
          title='Edit Employee'
          openPopupState={ { state: openEditEmployeePopupForm, setState: setEditEmployeeOpenPopupForm } }
          httpRequest={ {
            url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees/details`,
            method: 'PUT',
            body: JSON.stringify({ employee: editEmployeeData, accountId: session?.activeUser?.accountId })
          } }

          textFields={ [
            {
              width: 'sm:w-[48.5%]',
              type: 'text',
              label: 'First Name',
              value: editEmployeeData.firstname,
              required: true,
              onChange: (e) =>
              {
                setEditEmployeeData(prev => ({
                  ...prev,
                  firstname: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[48.5%]',
              type: 'text',
              label: 'Last Name',
              value: editEmployeeData.lastname,
              required: true,
              onChange: (e) =>
              {
                setEditEmployeeData(prev => ({
                  ...prev,
                  lastname: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[99.5%]',
              type: 'email',
              label: 'Email',
              value: editEmployeeData.email,
              required: true,
              onChange: (e) =>
              {
                setEditEmployeeData(prev => ({
                  ...prev,
                  email: e.target.value
                }))
              }
            },
            {
              width: 'sm:w-[99.5%]',
              type: 'select',
              label: 'Employee Role',
              options: [
                'LNM'
              ],
              required: true,
              value: editEmployeeData.employeeRole,
              onChange: (e) =>
              {
                setEditEmployeeData(prev => ({
                  ...prev,
                  employeeRole: e.target.value
                }))
              }
            }
          ] }
        />


        {/* Delete Employee Popup Confirmation */ }
        <DeleteItemPopup
          state={ showDeleteEmployee }
          setState={ setShowDeleteEmployee }
          item='Employee'
          data={ deleteEmployeeData }
        />


      </main>
    </Container>
  )
}

export default AccountMembersPage