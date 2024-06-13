import bcrypt from 'bcrypt'
import connectDB from '@config/connectDB'
import Employee from '@models/employees'

const encrypt = async (string) =>
{
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(string, salt)

  return hash
}

const decryptPw = async (string, userId) =>
{
  try
  {
    await connectDB()
    const employee = await Employee.findById(userId)
    const match = bcrypt.compare(string, employee.password)
    if (match)
    {
      return true
    } else
    {
      return false
    }
  } catch (error)
  {
    throw new Error(error.message)
  }
}

export default { encrypt, decryptPw }