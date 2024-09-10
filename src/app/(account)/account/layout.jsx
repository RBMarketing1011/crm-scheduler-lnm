import Sidebar from '@components/organism/Sidebar'

const Layout = ({ children }) =>
{
  return (
    <>
      <Sidebar />
      <main className="py-5 lg:pl-60">
        { children }
      </main>
    </>
  )
}

export default Layout