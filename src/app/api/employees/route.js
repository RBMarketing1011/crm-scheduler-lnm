import Employee from '@db/models/employees'
import Account from '@db/models/accounts'
import connectDB from '@db/connectDB'
import genUserVerifyEmailToken from '@lib/helpers/tokenGenerators/genUserVerifyEmailToken'
import verifyEmailUser from '@lib/utils/nodemailer/verifyEmailUser'
import encrypt from '@lib/helpers/bcrypt/encrypt'
import UserEmailToken from '@db/models/UserEmailToken'

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

const deleteEmployee = async (req) =>
{
  const { id, accountId } = await req.json()
  console.log(id, accountId)
  try
  {
    await connectDB()
    const account = await Account.findById(accountId)
    const index = account.employees.indexOf(id)

    if (index > -1)
    {
      account.employees.splice(index, 1)
    }

    await Employee.findByIdAndDelete(id)

    return Response.json({ success: 'Employee deleted successfully' })

  } catch (error)
  {
    console.log(error)
    return Response.json({ error: 'Employee delete unsuccessful' })
  }
}

const updateNotifications = async (req) =>
{
  const { notifications, employeeId } = await req.json()
  console.log(employeeId)

  try
  {
    await connectDB()

    const employee = await Employee.findById(employeeId)

    if (!employee)
    {
      throw new Error('Employee not found')
    }

    await Employee.findByIdAndUpdate(employeeId, {
      notifications
    })

    return Response.json(
      { success: 'Notification settings updated successfully' },
      { status: 200 }
    )

  } catch (error)
  {
    return Response.json(
      { error: error.message },
      { status: 403 }
    )
  }
}

export { createEmployeeOfShop as POST, updateEmployee as PUT, updateNotifications as PATCH, deleteEmployee as DELETE }