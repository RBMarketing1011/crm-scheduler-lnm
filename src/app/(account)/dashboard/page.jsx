'use client'

import CustomerAppts from '@components/page/CustomerAppts'
import Container from '@components/atom/Container'
import DashboardStats from '@components/page/DashboardStats'
import EmployeeSearch from '@components/molecule/Employees/EmployeeSearch'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import CardWithHeader from '@components/atom/Cards/CardWithHeader'
import CardWithHeaderBtn from '@components/atom/Cards/CardWithHeaderBtn'
import PopupForm from '@components/molecule/Popups/PopupForm'
import { Notifi } from '@lib/utils/Notifications/Notify'

import { useSession } from 'next-auth/react'
import { useState } from 'react'


const Dashboard = () =>
{
  const { data: session } = useSession()

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
    shops: '',
    employeeRole: '',
  })

  let shopsOptions = []
  shopsOptions.push('All')
  session?.shops?.map(el => (shopsOptions.push(el.name)))
  // ================================= End Popup Form
  return (
    <Container>
      <Notifi data={ { state: notify, setState: setNotify } } />
      <TitleHeading title='Dashboard' />
      <DashboardStats />
      <div className='flex flex-col lg:flex-row gap-5'>
        <CardWithHeader title='Upcoming Appointments'>
          <CustomerAppts data={ session?.appts } />
        </CardWithHeader >
        <CardWithHeaderBtn title='Employees' btnTitle='Add Employee' onClick={ () => setOpenPopupForm(true) }>
          <EmployeeSearch />
        </CardWithHeaderBtn>
      </div>



      {/* Modal for Add Employee Form */ }
      <PopupForm
        title='Add Employee'
        openPopupState={ { state: openPopupForm, setState: setOpenPopupForm } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
          method: 'POST',
          body: JSON.stringify({ employee: formData, accountId: session?.user?.accountId })
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
            label: 'Shops',
            options: shopsOptions,
            required: true,
            value: formData.shops,
            onChange: (e) =>
            {
              setFormData(prev => ({
                ...prev,
                shops: e.target.value
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
    </Container >
  )
}

export default Dashboard