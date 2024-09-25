import connectDB from '@db/connectDB'
import Location from '@db/models/locations'

const deleteIconFromLocationService = async (req) =>
{
  const { id, title } = await req.json()

  try
  {
    await connectDB()
    const location = await Location.findById(id)

    if (!location)
    {
      throw new Error('Location not found')
    }

    console.log(location)

    const index = location.services.findIndex(service => service.title === title)
    location.services[ index ].icon = { name: '', icon: '' }
    await location.save()

    return Response.json({ success: 'Icon updated successfully' }, { status: 200 })

  } catch (error)
  {
    console.log(error)
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { deleteIconFromLocationService as DELETE }