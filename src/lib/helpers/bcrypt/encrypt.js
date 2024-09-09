import bcrypt from 'bcrypt'

const encrypt = async (string) =>
{
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(string, salt)

  return hash
}

export default encrypt