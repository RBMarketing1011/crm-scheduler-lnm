import LocationTeamPage from '@components/pages/loggedIn/locations/LocationTeamPage'

const LocationTeam = ({ params }) =>
{
  const { locationId } = params

  return (
    <LocationTeamPage locationId={ locationId } />
  )
}

export default LocationTeam