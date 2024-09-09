import Sidebar from '@components/organism/Sidebar'
import Provider from '@config/providers/SessionProvider'

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