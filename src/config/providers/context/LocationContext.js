'use client'

import { createContext, useState } from 'react'

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) =>
{

  return (
    <LocationContext.Provider value={ {} }>
      { children }
    </LocationContext.Provider>
  )
}