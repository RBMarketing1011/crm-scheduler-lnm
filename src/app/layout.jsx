import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - LeadsNearMe® CRM',
    default: 'LeadsNearMe® CRM',
  },
  description:
    'Most auto repair appointment scheduling software strives for accuracy but can be cumbersome to navigate. We take a different approach, prioritizing user-friendliness while maintaining precision, ensuring a seamless scheduling experience for your shop without the headache.',
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

export default function RootLayout ({ children })
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
      <body className="flex h-full flex-col">
        { children }
      </body>
    </html>
  )
}
