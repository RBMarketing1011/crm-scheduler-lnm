import '@styles/tailwind.css'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Sidebar from '@components/Dashboard/Sidebar'

const inter = Inter({
  subsets: [ 'latin' ],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: [ 'latin' ],
  display: 'swap',
  variable: '--font-lexend',
})

const Layout = ({ children }) =>
{
  return (
    <html
      lang="en"
      className={ clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      ) }
    >
      <body>
        <Sidebar />
        <main className="py-5 lg:pl-60">
          { children }
        </main>
      </body>
    </html>
  )
}

export default Layout