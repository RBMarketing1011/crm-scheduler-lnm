'use client'

import { createContext, useState } from 'react'

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) =>
{
  const [ openEmployeeForm, setOpenEmployeeForm ] = useState(false)
  const [ addEmployee, setAddEmployee ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    shops: '',
    employeeRole: '',
  })

  return (
    <EmployeeContext.Provider value={ {
      addEmployeeFormState: [ openEmployeeForm, setOpenEmployeeForm ],
      addEmployeeState: [ addEmployee, setAddEmployee ]
    } }>

      { children }

    </EmployeeContext.Provider>
  )
}