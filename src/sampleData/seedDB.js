import
{
  // Used by multiple schemas 
  firstNames,
  lastNames,
  emails,
  passwords,
  phoneNumbers,
  phoneNumberTypes,
  streetAddresses,
  cities,
  states,
  zipCodes,
  createdAt,
  years,
  makes,
  models,
  submodels,
  engines,
  colors,
  licensePlates,
  vins,
  driveTypes,
  transmissions,
  bodyTypes,
  notes,
  shopNames,
  nicknames,
  websites,
  statuses,
  statusColors,
  vehicleLocations,
  milesIn,
  milesOut,
  keyTagIds,
  completedDates,
  saleAmounts,
  discountAmounts,
  totalFees,
  taxes,
  amountPaid,
  totalSale,
  repairNames,
  customerConcerns,
  startTimes,
  endTimes,
  description,
  boolean,
  leadSources,
  rideOptions,
  employeeCode,
  employeeRoleName,
  certificationNumber
} from './seedData.js'

import Account from '../models/accounts.js'
import Appointment from '../models/appointments.js'
import Customer from '../models/customers.js'
import Repair from '../models/repairs.js'
import Shop from '../models/shops.js'
import User from '../models/users.js'
import Vehicle from '../models/vehicles.js'
import Employee from '../models/employees.js'

import mongoose from 'mongoose'

// Establish the connection
const connectDB = async () =>
{
  try
  {
    await mongoose.connect('mongodb+srv://rbmarketingandanalytics:nb2fiegoo1QapsUf@cluster0.vy62qkk.mongodb.net/CRM?retryWrites=true&w=majority')

    console.log('Connected to MongoDB database')

  } catch (error)
  {
    console.error('MongoDB connection error:', error.message)
    process.exit(1) // Exit process with failure
  }
}

// Close the connection
const closeDB = async () =>
{
  try
  {
    await mongoose.connection.close()
    console.log('Disconnected from MongoDB database')
  } catch (error)
  {
    console.error('Error closing MongoDB connection:', error.message)
    process.exit(1) // Exit process with failure
  }
}

// Function to select a random element from an array
const getRandomElement = (array) =>
{
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[ randomIndex ]
}

const getRandomArrayFromElements = async (array, num) =>
{
  const result = []
  for (let i = 0; i < num; i++)
  {
    const randomIndex = Math.floor(Math.random() * array.length)
    result.push(array[ randomIndex ])
  }
  return result
}

const getObjId = (obj) =>
{
  return obj._id
}

// Insert data with randomized choices
const randomShop = () =>
{
  const shop = {
    name: getRandomElement(shopNames),
    nickname: getRandomElement(nicknames),
    phone: getRandomElement(phoneNumbers),
    email: getRandomElement(emails),
    website: getRandomElement(websites),
    address: {
      address1: getRandomElement(streetAddresses),
      address2: null,
      city: getRandomElement(cities),
      state: getRandomElement(states),
      zip: getRandomElement(zipCodes),
      fullAddress: getRandomElement(streetAddresses) + ' ' + getRandomElement(cities) + ' ' + getRandomElement(states) + ' ' + getRandomElement(zipCodes),
    }
  }

  return shop
}

const users = () =>
{
  const randomUsers = {
    firstname: getRandomElement(firstNames),
    lastname: getRandomElement(lastNames),
    email: getRandomElement(emails),
    password: getRandomElement(passwords),
    phone: [
      {
        number: getRandomElement(phoneNumbers),
        type: getRandomElement(phoneNumberTypes),
        primary: getRandomElement(boolean)
      }
    ],
    address: {
      address1: getRandomElement(streetAddresses),
      address2: null,
      city: getRandomElement(cities),
      state: getRandomElement(states),
      zip: getRandomElement(zipCodes),
      fullAddress: getRandomElement(streetAddresses) + ' ' + getRandomElement(cities) + ' ' + getRandomElement(states) + ' ' + getRandomElement(zipCodes),
    },
    okForMarketing: getRandomElement(boolean),
    deletedDate: null,
  }

  return randomUsers
}

const account = async () =>
{
  const randomAccount = {
    owner: getObjId(getRandomElement(await User.find())),
    shops: getRandomArrayFromElements(await Shop.find(), 3),
    users: getRandomArrayFromElements(await User.find(), 8),
  }

  return randomAccount
}

const vehicle = () =>
{
  const randomVehicle = {
    "year": getRandomElement(years),
    "make": getRandomElement(makes),
    "model": getRandomElement(models),
    "subModel": getRandomElement(submodels),
    "engine": getRandomElement(engines),
    "color": getRandomElement(colors),
    "licensePlate": getRandomElement(licensePlates),
    "state": getRandomElement(states),
    "vin": getRandomElement(vins),
    "driveType": getRandomElement(driveTypes),
    "transmission": getRandomElement(transmissions),
    "bodyType": getRandomElement(bodyTypes),
    "notes": getRandomArrayFromElements(notes, 10),
    "deletedDate": null,
  }

  return randomVehicle
}

const customer = async () =>
{
  const randomCustomer = {
    "firstName": getRandomElement(firstNames),
    "lastName": getRandomElement(lastNames),
    "email": getRandomElement(emails),
    "phone": getRandomArrayFromElements(phoneNumbers, 2),
    "vehicles": getRandomArrayFromElements(await Vehicle.find({}), 3),
    "customerType": getRandomElement([ 'Person', 'Business' ]),
    "contactFirstName": getRandomElement(firstNames),
    "contactLastName": getRandomElement(lastNames),
    address: {
      address1: getRandomElement(streetAddresses),
      address2: null,
      city: getRandomElement(cities),
      state: getRandomElement(states),
      zip: getRandomElement(zipCodes),
      fullAddress: getRandomElement(streetAddresses) + ' ' + getRandomElement(cities) + ' ' + getRandomElement(states) + ' ' + getRandomElement(zipCodes),
    },
    "shopId": getRandomElement(await Shop.find({})),
    "okForMarketing": getRandomElement(boolean),
    "deletedDate": null,
  }

  return randomCustomer
}

const appt = async () =>
{
  const randomAppointment = {
    "shopId": getRandomElement(await Shop.find({})),
    "customerId": getRandomElement(await Customer.find({})),
    "startTime": getRandomElement(startTimes),
    "endTime": getRandomElement(endTimes),
    "description": getRandomElement(description),
    "arrived": getRandomElement(boolean),
    "deletedDate": null,
    "leadSource": getRandomElement(leadSources),
    "rideOption": getRandomElement(rideOptions),
    "dropoffTime": getRandomElement(dropoffTime),
    "pickupTime": getRandomElement(pickupTime),
  }

  return randomAppointment
}

const employee = () =>
{
  const randomEmployees = {
    "email": getRandomElement(emails),
    "firstName": getRandomElement(firstNames),
    "lastName": getRandomElement(lastNames),
    address: {
      address1: getRandomElement(streetAddresses),
      address2: null,
      city: getRandomElement(cities),
      state: getRandomElement(states),
      zip: getRandomElement(zipCodes),
      fullAddress: getRandomElement(streetAddresses) + ' ' + getRandomElement(cities) + ' ' + getRandomElement(states) + ' ' + getRandomElement(zipCodes),
    },
    "employeeRole": {
      "code": getRandomElement(employeeCode),
      "name": getRandomElement(employeeRoleName)
    },
    "certificationNumber": getRandomElement(certificationNumber)
  }

  return randomEmployees
}

const repair = async () =>
{
  const randomRepair = {
    "shopId": getRandomElement(await Shop.find({})),
    "status": getRandomElement(statuses),
    "statusColor": getRandomElement(statusColors),
    "startTime": getRandomElement(startTimes),
    "customerId": getRandomElement(await Customer.find({})),
    "technicianId": getRandomElement(await Employee.find({})),
    "serviceAdvisorId": getRandomElement(await Employee.find({})),
    "vehicleId": getRandomElement(await Vehicle.find({})),
    "vehicleLocation": getRandomElement(vehicleLocations),
    "milesIn": getRandomElement(milesIn),
    "milesOut": getRandomElement(milesOut),
    "keytag": getRandomElement(keyTagIds),
    "completedDate": getRandomElement(completedDates),
    "sales": getRandomElement(saleAmounts),
    "discountTotal": getRandomElement(discountAmounts),
    "feeTotal": getRandomElement(totalFees),
    "taxes": getRandomElement(taxes),
    "amountPaid": getRandomElement(amountPaid),
    "totalSale": getRandomElement(totalSale),
    "name": getRandomElement(repairNames),
    "authorized": getRandomElement(boolean),
    "authorizedDate": getRandomElement(createdAt),
    "notes": getRandomArrayFromElements(notes, 10),
    "customerConcerns": getRandomArrayFromElements(customerConcerns, 5),
    "cancelled": getRandomElement(boolean),
    "deletedDate": null,
  }

  return randomRepair
}

const insertRandomDocuments = async (model, schema, num) =>
{
  try
  {
    // Generate and insert random documents
    const documents = []
    for (let i = 0; i < num; i++)
    {
      documents.push(schema())
    }
    await model.insertMany(documents)
    console.log(`Inserted ${ num } random documents into ${ model.modelName } collection.`)
  } catch (error)
  {
    console.error('Error inserting random documents:', error)
  }
}

// Function to seed the database
const seedDatabase = async () =>
{
  // Connect to MongoDB
  await connectDB()

  try
  {
    // Shop
    // Users
    // Account
    // Vehicle
    // Customer
    // Appt
    // Employees
    // Repair

    await Shop.deleteMany()
    await User.deleteMany()
    await Account.deleteMany()
    await Vehicle.deleteMany()
    await Customer.deleteMany()
    await Appointment.deleteMany()
    await Employee.deleteMany()
    await Repair.deleteMany()

    console.log('All Documents Deleted')

    await insertRandomDocuments(Shop, randomShop, 100)
    await insertRandomDocuments(User, users, 75)
    // await insertRandomDocuments(Account, account(), 5)
    // await insertRandomDocuments(Vehicle, vehicle(), 35)
    // await insertRandomDocuments(Customer, await customer(), 27)
    // await insertRandomDocuments(Appointment, await appt(), 42)
    // await insertRandomDocuments(Employee, employee(), 87)
    // await insertRandomDocuments(Repair, await repair(), 19)
  } catch (error)
  {
    console.error('Error seeding database:', error)
  } finally
  {
    // Close the database connection after seeding
    // Make sure to close the connection properly to avoid memory leaks
    // Example:
    await mongoose.connection.close()
  }
}

seedDatabase()