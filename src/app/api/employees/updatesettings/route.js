import connectDB from '@db/connectDB'
import Employee from '@db/models/employees'

const updateEmployee = async (req) =>
{
  const {
    id,
    firstname,
    lastname,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip
  } = await req.json()

  try
  {
    await connectDB()
    const employee = await Employee.findById(id)

    if (!employee)
    {
      throw new Error('No employee found')
    } else
    {
      await Employee.findByIdAndUpdate(id, {
        firstname,
        lastname,
        email,
        phone,
        address: {
          address1,
          address2,
          city,
          state,
          zip
        }
      })

      return Response.json({ success: 'Update successful' }, { status: 200 })
    }
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { updateEmployee as PUT }