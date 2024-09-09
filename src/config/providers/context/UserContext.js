'use client'

import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) =>
{

  return (
    <UserContext.Provider>
      { children }
    </UserContext.Provider>
  )
}