// import Sidebar from '@components/organism/Sidebar'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.min.css'
// import connectDB from '@db/connectDB'
// import Account from '@db/models/accounts'

// const Layout = async ({ children }) =>
// {
//   const getAllAccounts = async () =>
//   {
//     await connectDB()
//     const accounts = await Account.find({}).lean()

//     return accounts
//   }

//   const allAccounts = await getAllAccounts()

//   return (
//     <>
//       <ToastContainer />
//       <Sidebar accounts={ allAccounts } />
//       <main className="py-5 lg:pl-60">
//         { children }
//       </main>
//     </>
//   )
// }

// export default Layout




import Sidebar from '@components/organism/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import connectDB from '@db/connectDB'
import Account from '@db/models/accounts'

const Layout = async ({ children }) =>
{
  const getAllAccounts = async () =>
  {
    await connectDB()

    // Use .lean() to convert Mongoose objects to plain JavaScript objects
    const accounts = await Account.find({}).populate('owner').lean()

    // Optionally, remove or transform any fields you don't want to pass
    return accounts.map(account => ({
      _id: account._id.toString(),  // Convert ObjectId to string for serialization
      name: account.name,           // Include any other fields you need
      email: account.owner.email
    }))
  }

  const allAccounts = await getAllAccounts()

  return (
    <>
      <ToastContainer />
      <Sidebar accounts={ allAccounts } /> {/* Now safe to pass */ }
      <main className="py-5 lg:pl-60">
        { children }
      </main>
    </>
  )
}

export default Layout
