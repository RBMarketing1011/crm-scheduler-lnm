import ShopDetailsPage from '@components/pages/loggedIn/shops/ShopDetailsPage'

const ShopDetails = ({ params }) =>
{
  const { accountId, shopId } = params
  return (
    <ShopDetailsPage accountId={ accountId } shopId={ shopId } />
  )
}

export default ShopDetails