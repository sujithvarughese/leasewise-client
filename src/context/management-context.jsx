import { createContext, useContext, useReducer } from 'react'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  units: null
}

const managementReducer = (state, action) => {
  if (action.type === "SET_UNITS") {
    return {
      ...state,
      units: action.payload.units
    }
  }
}
const ManagementProvider = ({ children }) => {

  const [managementState, dispatch] = useReducer(managementReducer, initialState)

  const fetchUnits = async () => {
    try {
      // all units
      const response = await axiosDB("/units")
      const { units } = response.data
      console.log(units)
      dispatch({ type: "SET_UNITS", payload: units })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <ManagementContext.Provider value={{
      ...managementState,
      fetchUnits,
    }}>
      {children}
    </ManagementContext.Provider>
  )
}

const ManagementContext = createContext({})
const useManagementProvider = () => useContext(ManagementContext)

export { ManagementProvider, useManagementProvider }