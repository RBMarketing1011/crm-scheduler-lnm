'use client'

import { createContext, useState } from 'react'

export const AccountContext = createContext()

export const AccountContextProvider = ({ children }) =>
{

  return (
    <AccountContext.Provider value={ {} }>
      { children }
    </AccountContext.Provider>
  )
}