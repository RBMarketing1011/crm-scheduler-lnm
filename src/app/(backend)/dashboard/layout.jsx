import Sidebar from '@components/Dashboard/Sidebar'
import Provider from '@utils/Provider'

const Layout = ({ children }) =>
{
  return (
    <Provider>
      <Sidebar />
      <main className="py-5 lg:pl-60">
        { children }
      </main>
    </Provider>
  )
}

export default Layout