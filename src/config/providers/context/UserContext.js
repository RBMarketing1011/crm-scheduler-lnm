'use client'

import { createContext, useState } from 'react'
import { useSession } from 'next-auth/react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) =>
{
  // useSession() state
  const { data: session, update } = useSession()

  // Context

  return (
    <UserContext.Provider value={ {
      sessionState: [ session, update ]
    } }>
      { children }
    </UserContext.Provider>
  )
}