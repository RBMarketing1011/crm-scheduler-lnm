'use client'

// Context 
import { useContext } from 'react'

import { UserContext } from '@config/providers/context/UserContext'
import { MiscContext } from '@config/providers/context/MiscContext'
import { EmployeeContext } from '@config/providers/context/EmployeeContext'

// Components
import CustomerAppts from '@components/organism/CustomerAppts'
import Container from '@components/atom/Container'
import DashboardStats from '@components/organism/DashboardStats'
import EmployeeSearch from '@components/molecule/Employees/EmployeeSearch'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import CardWithHeader from '@components/atom/Cards/CardWithHeader'
import CardWithHeaderBtn from '@components/atom/Cards/CardWithHeaderBtn'
import PopupForm from '@components/molecule/Popups/PopupForm'
import { Notifi } from '@lib/utils/Notifications/Notify'


const DashboardPage = () =>
{
  const {
    sessionState
  } = useContext(UserContext)

  const { addEmployeeFormState, addEmployeeState } = useContext(EmployeeContext)

  const {
    notifyState
  } = useContext(MiscContext)

  const [ session, update ] = sessionState
  const [ openEmployeeForm, setOpenEmployeeForm ] = addEmployeeFormState
  const [ addEmployee, setAddEmployee ] = addEmployeeState


  const [ notify, setNotify ] = notifyState

  // ================================= PopupForm

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
        </CardWithHeader>
        <CardWithHeaderBtn
          title='Employees'
          btnTitle='Add Employee'
          onClick={ () => setOpenEmployeeForm(true) }>
          <EmployeeSearch />
        </CardWithHeaderBtn>
      </div>



      {/* Modal for Add Employee Form */ }
      <PopupForm
        title='Add Employee'
        openPopupState={ { state: openEmployeeForm, setState: setOpenEmployeeForm } }
        httpRequest={ {
          url: `${ process.env.NEXT_PUBLIC_API_DOMAIN }/employees`,
          method: 'POST',
          body: JSON.stringify({ employee: addEmployee, accountId: session?.user?.accountId })
        } }

        textFields={ [
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'First Name',
            value: addEmployee.firstname,
            required: true,
            onChange: (e) =>
            {
              setAddEmployee(prev => ({
                ...prev,
                firstname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[48.5%]',
            type: 'text',
            label: 'Last Name',
            value: addEmployee.lastname,
            required: true,
            onChange: (e) =>
            {
              setAddEmployee(prev => ({
                ...prev,
                lastname: e.target.value
              }))
            }
          },
          {
            width: 'sm:w-[99.5%]',
            type: 'email',
            label: 'Email',
            value: addEmployee.email,
            required: true,
            onChange: (e) =>
            {
              setAddEmployee(prev => ({
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
            value: addEmployee.shops,
            onChange: (e) =>
            {
              setAddEmployee(prev => ({
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
            value: addEmployee.employeeRole,
            onChange: (e) =>
            {
              setAddEmployee(prev => ({
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

export default DashboardPage