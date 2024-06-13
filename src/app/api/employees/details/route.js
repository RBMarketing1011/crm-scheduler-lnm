import connectDB from '@config/connectDB'
import Employee from '@models/employees'
import Account from '@models/accounts'

const updateDetails = async (req) =>
{
  const {
    accountId,
    employee: {
      id,
      firstname,
      lastname,
      email,
      shops,
      employeeRole
    }
  } = await req.json()

  try
  {
    await connectDB()
    const account = await Account.findById(accountId)

    if (account.employees.includes(id))
    {
      await Employee.findByIdAndUpdate(id, {
        firstname,
        lastname,
        email,
        shops,
        employeeRole
      })
    } else
    {
      throw new Error('Employee not found')
    }

    return Response.json({ success: 'Employee updated successfully' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { updateDetails as PUT }