import Employee from '@db/models/employees'
import Account from '@db/models/accounts'
import connectDB from '@db/connectDB'
import encrypt from '@lib/helpers/bcrypt/encrypt'
import genUserVerifyEmailToken from '@lib/helpers/tokenGenerators/genUserVerifyEmailToken'
import verifyEmailUser from '@lib/utils/nodemailer/verifyEmailUser'

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
      return Response.json({ error: 'All fields are required' }, { status: 500 })
    }
    // check if user exists 
    const userExists = await Employee.findOne({ email })
    // if user exists tell them that
    if (userExists)
    {
      return Response.json({ error: 'Account already exists' }, { status: 500 })
    }
    // if no user exists encrpt password 
    const hashPw = await encrypt(password)

    // create new user with credentials and encrypted password
    const newUser = await Employee.create({
      firstname,
      lastname,
      email,
      password: hashPw,
      employeeRole: 'Owner'
    })

    // create Account for user (at /register only)
    const account = await Account.create({
      owner: newUser._id
    })

    await Employee.findByIdAndUpdate(newUser._id, {
      accountId: account._id
    })

    // generate token to verify email 
    const token = await genUserVerifyEmailToken(newUser._id)

    // send verification email 
    verifyEmailUser(newUser.firstname, newUser.email, token)

    // Send success and redirect 
    return Response.json({ success: 'Account Created Successfully' }, { status: 200 })
  } catch (error)
  {
    console.log(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { createUserFromCredentials as POST }