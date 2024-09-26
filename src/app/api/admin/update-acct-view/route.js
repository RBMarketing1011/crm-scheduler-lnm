import connectDB from '@db/connectDB'
import Employee from '@db/models/employees'

const uppdateAcctView = async (req) =>
{
  const { userId, accountId } = await req.json()

  if (!userId || !accountId)
  {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try
  {
    await connectDB()

    const employee = await Employee.findById(userId)

    if (!employee)
    {
      return Response.json({ error: 'Employee not found' }, { status: 404 })
    }

    if (employee.employeeRole !== 'LNM')
    {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    employee.acctView = accountId

    await employee.save()

    return Response.json({ success: 'Account view updated' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { uppdateAcctView as PUT }