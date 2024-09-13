import '@styles/tailwind.css'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { AppContextProvider } from '@config/providers/context/index/AppContext'
import Provider from '@config/providers/SessionProvider'

export const metadata = {
  title: {
    template: '%s - LeadsNearMe® CRM',
    default: 'LeadsNearMe® CRM',
  },
  description:
    'Most auto repair appointment scheduling software strives for accuracy but can be cumbersome to navigate. We take a different approach, prioritizing user-friendliness while maintaining precision, ensuring a seamless scheduling experience for your location without the headache.',
}

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
        'h-full scroll-smooth bg-white antialiased --font-inter --font-lexend',
        inter.variable,
        lexend.variable,
      ) }
    >
      <body className="flex h-full flex-col">
        <Provider>
          <AppContextProvider>
            { children }
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  )
}

export default Layout