import LocationDetailsPage from '@components/pages/loggedIn/locations/LocationDetailsPage'

const LocationDetails = ({ params }) =>
{
  const { accountId, locationId } = params
  return (
    <LocationDetailsPage accountId={ accountId } locationId={ locationId } />
  )
}

export default LocationDetails