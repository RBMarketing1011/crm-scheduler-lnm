import Sidebar from '@components/organism/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Layout = ({ children }) =>
{
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <main className="py-5 lg:pl-60">
        { children }
      </main>
    </>
  )
}

export default Layout