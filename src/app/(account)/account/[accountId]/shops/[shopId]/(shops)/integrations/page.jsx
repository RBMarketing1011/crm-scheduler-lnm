import ShopIntegrationsPage from '@components/pages/loggedIn/shops/ShopIntegrationsPage'

const ShopIntegrations = ({ params }) =>
{
  const { accountId, shopId } = params

  return (
    <ShopIntegrationsPage accountId={ accountId } shopId={ shopId } />
  )
}

export default ShopIntegrations