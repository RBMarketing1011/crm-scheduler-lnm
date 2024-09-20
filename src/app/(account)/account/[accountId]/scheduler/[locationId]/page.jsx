import SchedulerLocationPage from '@components/pages/loggedIn/scheduler/SchedulerLocationPage'

const SchedulerLocation = ({ params }) =>
{
  const { accountId, locationId } = params
  return (
    <SchedulerLocationPage accountId={ accountId } locationId={ locationId } />
  )
}

export default SchedulerLocation