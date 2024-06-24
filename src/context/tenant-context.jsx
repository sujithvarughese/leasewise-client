import { createContext, useContext, useReducer } from 'react'

const initialState = {

}

const tenantReducer = (state, action) => {

}
const TenantProvider = ({ children }) => {

  const [tenantState, dispatch] = useReducer(tenantReducer, initialState)

  return (
    <TenantContext.Provider value={{
      ...tenantState,
    }}>
      {children}
    </TenantContext.Provider>
  )
}

const TenantContext = createContext({})
const useTenantProvider = () => useContext(TenantContext)

export { TenantProvider, useTenantProvider }