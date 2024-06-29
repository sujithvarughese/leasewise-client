import { createContext, useContext, useReducer } from 'react'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  units: [],
  messages: [],
  expenses: [],
  incomes: [],
  mortgages: []
}

const managementReducer = (state, action) => {
  if (action.type === "SET_UNITS") {
    return {
      ...state,
      units: action.payload.units
    }
  }
  if (action.type === "SET_STATE") {
    return {
      ...state,
      ...action.payload
    }
  }
}
const ManagementProvider = ({ children }) => {

  const [managementState, dispatch] = useReducer(managementReducer, initialState)
/*
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
  }*/

  const setUnits = (units) => {
    dispatch({ type: "SET_UNITS", payload: units })
  }

  const setState = data => {
    dispatch({ type: "SET_STATE", payload: data})
  }

  return (
    <ManagementContext.Provider value={{
      ...managementState,

      setState
    }}>
      {children}
    </ManagementContext.Provider>
  )
}

const ManagementContext = createContext({})
const useManagementProvider = () => useContext(ManagementContext)

export { ManagementProvider, useManagementProvider }