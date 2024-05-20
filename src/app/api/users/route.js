import User from '@models/users'
import Account from '@models/accounts'
import connectDB from '@config/connectDB'
import encrypt from '@utils/encrypt'

const createUserFromCredentials = async (req) =>
{
  const { firstname, lastname, email, password } = await req.json()

  await connectDB()

  try
  {
    // Check if we have all credentials
    if (!firstname || !lastname || !email || !password)
    {
      // if we dont - throw error 
      throw new Error('All fields are required')
    }
    // check if user exists 
    const userExists = await User.findOne({ email })
    // if user exists tell them that
    if (userExists)
    {
      throw new Error('Account already exists')
    }
    // if no user exists encrpt password 
    const hashPw = await encrypt(password)

    // create new user with credentials and encrypted password
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashPw,
    })

    // create Account for user (at /register only)
    const account = await Account.create({
      owner: newUser._id
    })

    await User.findByIdAndUpdate(newUser._id, {
      accountId: account._id
    })

    // Send success and redirect 
    return Response.json({ success: 'Account Created Successfully' }, { status: 200 })
  } catch (error)
  {
    console.log(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { createUserFromCredentials as POST }