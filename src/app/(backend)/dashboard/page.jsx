import CustomerAppts from '@components/Dashboard/Appointments/CustomerAppts'
import Container from '@components/Dashboard/Container'
import DashboardStats from '@components/Dashboard/DashboardStats'
import EmployeeSearch from '@components/Dashboard/Employees/EmployeeSearch'
import TitleHeading from '@components/Dashboard/Headings/TitleHeading'
import Card from '@components/Dashboard/Cards/Card'
import CardWithHeader from '@components/Dashboard/Cards/CardWithHeader'


const Dashboard = () =>
{
  return (

    <Container>
      <TitleHeading title='Dashboard' />
      <DashboardStats />
      <div className='flex flex-col lg:flex-row gap-5'>
        <CardWithHeader title='Upcoming Appointments' height='500px' >
          <CustomerAppts />
        </CardWithHeader >
        <CardWithHeader title='Employees' height='500px'>
          <EmployeeSearch />
        </CardWithHeader>
      </div>
    </Container >
  )
}

export default Dashboard