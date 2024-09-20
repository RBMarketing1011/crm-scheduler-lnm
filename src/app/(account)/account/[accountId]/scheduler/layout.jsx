import Container from '@components/atom/Container'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import SchedulerSidebar from '@components/organism/SchedulerSidebar'
import connectDB from '@db/connectDB'
import Location from '@db/models/locations'

// Add Your Metadata Here
export const metadata = {
  title: 'Leads Near Me® | Shop',
  description: 'Leads Near Me® Shop',
}

const Layout = async ({ children, params }) =>
{
  const { accountId } = params

  return (
    <Container>
      <TitleHeading title='Scheduler Installations' />
      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <SchedulerSidebar accountId={ accountId } />
        <main className='w-full lg:ml-56'>
          { children }
        </main>
      </div>
    </Container>
  )
}

export default Layout