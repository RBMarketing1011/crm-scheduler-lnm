import Container from '@components/atom/Container'
import TitleHeading from '@components/atom/Headings/TitleHeading'
import ShopsSidebar from '@components/organism/ShopsSidebar'
import connectDB from '@db/connectDB'
import Shop from '@db/models/shops'

// Add Your Metadata Here
export const metadata = {
  title: 'Leads Near Me® | Shop',
  description: 'Leads Near Me® Shop',
}

const Layout = async ({ children, params }) =>
{
  const { accountId, shopId } = params

  console.log(accountId, shopId)

  await connectDB()
  const shop = await Shop.findById(shopId)

  return (
    <Container>
      <TitleHeading title={ shop.name } />
      <div className="max-w-6xl lg:flex lg:gap-x-5">
        <ShopsSidebar accountId={ accountId } shopId={ shopId } />
        { children }
      </div>
    </Container>
  )
}

export default Layout