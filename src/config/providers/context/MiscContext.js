'use client'

import { createContext, useState } from 'react'

export const MiscContext = createContext()

export const MiscContextProvider = ({ children }) =>
{
  const [ notify, setNotify ] = useState({
    type: '',
    text: '',
    show: false
  })

  return (
    <MiscContext.Provider value={ {
      notifyState: [ notify, setNotify ]
    } }>
      { children }
    </MiscContext.Provider>
  )
}