import { AccountContextProvider } from '../AccountContext'
import { LocationContextProvider } from '../LocationContext'
import { UserContextProvider } from '../UserContext'

export const AppContextProvider = ({ children }) =>
{
  return (
    <AccountContextProvider>
      <LocationContextProvider>
        <UserContextProvider>
          { children }
        </UserContextProvider>
      </LocationContextProvider>
    </AccountContextProvider>
  )
}