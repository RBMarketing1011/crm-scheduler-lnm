import Employee from '@models/employees'
import Account from '@models/accounts'
import connectDB from '@config/connectDB'
import genUserVerifyEmailToken from '@utils/tokenGenerators/genUserVerifyEmailToken'
import verifyEmailUser from '@utils/nodemailerEmails/verifyEmailUser'

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
    const employee = await Employee.create({ firstname, lastname, email, shops, employeeRole, password: 'reset' })
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

export { createEmployeeOfShop as POST }