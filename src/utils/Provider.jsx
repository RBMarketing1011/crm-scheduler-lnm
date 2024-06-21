'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react'

const Provider = ({ children }) =>
{
  return (
    <NextUIProvider>
      <SessionProvider>
        { children }
      </SessionProvider>
    </NextUIProvider>
  )
}

export default Provider