import Employee from '@models/employees'
import Account from '@models/accounts'
import connectDB from '@config/connectDB'
import genUserVerifyEmailToken from '@utils/tokenGenerators/genUserVerifyEmailToken'
import verifyEmailUser from '@utils/nodemailerEmails/verifyEmailUser'
import encrypt from '@utils/encrypt'
import UserEmailToken from '@models/UserEmailToken'

const createEmployeeOfShop = async (req) =>
{
  const {
    accountId,
    employee: {
      firstname,
      lastname,
      email,
      shops,
      employeeRole,
    }
  } = await req.json()

  try
  {
    // connect db
    await connectDB()
    // check if employee exists
    const employeeExists = await Employee.findOne({ email })
    // if does throw error 
    if (employeeExists)
    {
      throw new Error('Email already in use')
    }
    // if does not then create employee 
    const employee = await Employee.create({ firstname, lastname, email, shops, employeeRole, password: 'reset', accountId })
    // find the account 
    const account = await Account.findById(accountId)
    // add employee to account 
    account.employees.push(employee)
    await account.save()
    // generate token to verify email 
    const token = await genUserVerifyEmailToken(employee._id)
    // send verification email 
    verifyEmailUser(employee.firstname, employee.email, token)
    // return success 
    return Response.json({ success: 'Employee Added Successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 401 })
  }
}

const updateEmployee = async (req) =>
{
  const { password, id, token } = await req.json()

  try
  {
    // connect to db
    await connectDB()
    // find employee 
    const employee = await Employee.findById(id)
    // if does not exist throw error 
    if (!employee)
    {
      throw new Error('Employee Not Found.')
    }
    // find token
    const tokenExists = await UserEmailToken.findOne({ token })
    // if does not exist or is expired throw error
    if (!tokenExists || new Date(tokenExists.expiration) < Date.now())
    {
      // if token does exist but is expired delete 
      if (tokenExists)
      {
        // delete token 
        await UserEmailToken.findByIdAndDelete(tokenExists._id)
      }
      throw new Error('Token is invalid. Please request a new Token')
    }
    // else encrypt password 
    const hashPw = await encrypt(password)
    // update employee 
    await Employee.findByIdAndUpdate(id, {
      password: hashPw
    })
    // delete token 
    await UserEmailToken.findByIdAndDelete(tokenExists._id)
    // return succcess 
    return Response.json({ success: 'Password updated successfully' })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 403 })
  }
}

export { createEmployeeOfShop as POST, updateEmployee as PUT }