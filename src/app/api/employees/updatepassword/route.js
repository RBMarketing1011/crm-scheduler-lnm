import connectDB from '@config/connectDB'
import Employee from '@models/employees'
import encrypt from '@utils/encrypt'
import bcrypt from 'bcrypt'

const updatePassword = async (req) =>
{
  const { employeeId, password: { current, newPw } } = await req.json()

  console.log(employeeId, current, newPw)

  try
  {
    await connectDB()

    const employee = await Employee.findById(employeeId)

    if (!employee)
    {
      throw new Error('No employee found')
    }

    const correctCurrentPw = await bcrypt.compare(current, employee.password)

    if (!correctCurrentPw)
    {
      throw new Error('Your current password did not match our data')
    } else if (correctCurrentPw)
    {
      const hashPw = await encrypt(newPw)
      await Employee.findByIdAndUpdate(employeeId, {
        password: hashPw
      })

      return Response.json({ success: 'Your password has been updated' })
    }

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }

  return Response.json({ error: 'Testing' })

}

export { updatePassword as PUT }