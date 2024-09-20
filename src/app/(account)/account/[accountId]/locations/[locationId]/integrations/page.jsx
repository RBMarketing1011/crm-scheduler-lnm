import LocationIntegrationsPage from '@components/pages/loggedIn/locations/LocationIntegrationsPage'

const LocationIntegrations = ({ params }) =>
{
  const { accountId, locationId } = params

  return (
    <LocationIntegrationsPage accountId={ accountId } locationId={ locationId } />
  )
}

export default LocationIntegrations