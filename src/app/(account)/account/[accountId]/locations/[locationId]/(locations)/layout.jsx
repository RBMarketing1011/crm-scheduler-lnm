import Container from '@components/atom/Container'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import ShopsSidebar from '@components/organism/ShopsSidebar'
import connectDB from '@db/connectDB'
import Location from '@db/models/locations'

// Add Your Metadata Here
export const metadata = {
  title: 'Leads Near Me® | Shop',
  description: 'Leads Near Me® Shop',
}

const Layout = async ({ children, params }) =>
{
  const { accountId, locationId } = params

  await connectDB()
  const location = await Location.findById(locationId)

  return (
    <Container>
      <TitleHeading title={ location.name } />
      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <ShopsSidebar accountId={ accountId } locationId={ locationId } />
        { children }
      </div>
    </Container>
  )
}

export default Layout