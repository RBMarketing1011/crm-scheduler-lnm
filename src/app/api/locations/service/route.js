import connectDB from '@db/connectDB'
import Location from '@db/models/locations'

const deleteService = async (req) =>
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

    location.services = location.services.filter(service => service.title !== title)
    await location.save()

    return Response.json({ success: 'Service deleted successfully' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

const updateService = async (req) =>
{
  const { service } = await req.json()

  const { id, title, desc, question, answers } = service

  const data = {
    title,
    desc,
    question: {
      text: question,
      answers
    }
  }

  try
  {
    await connectDB()
    const location = await Location.findById(id)

    if (!location)
    {
      throw new Error('Location not found')
    }

    const index = location.services.findIndex(service => service.title === title)
    location.services[ index ] = data
    await location.save()

    return Response.json({ success: 'Service updated successfully' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { deleteService as DELETE, updateService as PUT }