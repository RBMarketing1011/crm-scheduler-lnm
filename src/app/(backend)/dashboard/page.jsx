'use client'

import CustomerAppts from '@components/Dashboard/Appointments/CustomerAppts'
import Container from '@components/Dashboard/Container'
import DashboardStats from '@components/Dashboard/DashboardStats'
import EmployeeSearch from '@components/Dashboard/Employees/EmployeeSearch'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import CardWithHeader from '@components/Dashboard/Cards/CardWithHeader'
import CardWithHeaderBtn from '@components/Dashboard/Cards/CardWithHeaderBtn'
import PopupForm from '@components/Dashboard/PopupForm'
import { Notifi } from '@components/Notifications/Notify'

import { useSession } from 'next-auth/react'
import { useState } from 'react'


const Dashboard = () =>
{
  const { data: session } = useSession()
  // console.log(session?.user)

  // ================================= PopupForm
  const [ openPopupForm, setOpenPopupForm ] = useState(false)
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })
  const [ formData, setFormData ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    employeeRole: '',
  })
  // ================================= End Popup Form
  return (
    <Container>
      <Notifi data={ { state: notify, setState: setNotify } } />
      <TitleHeading title='Dashboard' />
      <DashboardStats />
      <div className='flex flex-col lg:flex-row gap-5'>
        <CardWithHeader title='Upcoming Appointments' height='500px' >
          <CustomerAppts />
        </CardWithHeader >
        <CardWithHeaderBtn title='Employees' onClick={ () => setOpenPopupForm(true) }>
          <EmployeeSearch />
        </CardWithHeaderBtn>
      </div>

      {/* Modal for Add Shop Form */ }
      <PopupForm
        title='Add Employee'
        openPopupState={ { state: openPopupForm, setState: setOpenPopupForm } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
          method: 'POST',
          body: JSON.stringify({ employee: formData, accountId: session?.userInfo?.accountId })
        } }
        notifiSetState={ setNotify }
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
              'Employee',
              'Lead',
              'Manager',
              'Admin'
            ],
            required: true,
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
    </Container >
  )
}

export default Dashboard