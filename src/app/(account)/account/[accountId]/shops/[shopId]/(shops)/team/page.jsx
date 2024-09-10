import ShopTeamPage from '@components/pages/loggedIn/shops/ShopTeamPage'

const ShopTeam = ({ params }) =>
{
  const { shopId } = params

  return (
    <ShopTeamPage shopId={ shopId } />
  )
}

export default ShopTeam