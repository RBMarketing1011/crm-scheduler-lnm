import bcrypt from 'bcrypt'
import connectDB from '@config/connectDB'
import Employee from '@models/employees'

const encrypt = async (string) =>
{
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(string, salt)

  return hash
}

export default encrypt