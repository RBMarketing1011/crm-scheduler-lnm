import { AccountContextProvider } from '../AccountContext'
import { LocationContextProvider } from '../LocationContext'
import { EmployeeContextProvider } from '../EmployeeContext'
import { UserContextProvider } from '../UserContext'
import { MiscContextProvider } from '../MiscContext'

export const AppContextProvider = ({ children }) =>
{
  return (
    <AccountContextProvider>
      <LocationContextProvider>
        <EmployeeContextProvider>
          <UserContextProvider>
            <MiscContextProvider>
              { children }
            </MiscContextProvider>
          </UserContextProvider>
        </EmployeeContextProvider>
      </LocationContextProvider>
    </AccountContextProvider>
  )
}