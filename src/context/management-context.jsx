import { createContext, useContext, useReducer } from 'react'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  units: [],
  messages: [],
  currentMessage: {
    messages: [],
    recipient: null,
  },
  expenses: [],
  incomes: [],
  mortgages: []
}

const ManagementContext = createContext({})

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
  if (action.type === "SET_MESSAGES") {
    return {
      ...state,
      messages: action.payload.messages
    }
  }
  if (action.type === "SET_CURRENT_MESSAGE") {
    return {
      ...state,
      currentMessage: {
        messages: action.payload.messages,
        recipient: action.payload.recipient
      }
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

  const setMessages = (messages) => {
    dispatch({ type: "SET_MESSAGES", payload: messages })
  }

  const setCurrentMessage = (messages, recipient) => {
    dispatch({ type: "SET_CURRENT_MESSAGE", payload: { messages, recipient } })
  }

  return (
    <ManagementContext.Provider value={{
      ...managementState,

      setState,
      setMessages,
      setCurrentMessage
    }}>
      {children}
    </ManagementContext.Provider>
  )
}


const useManagementProvider = () => useContext(ManagementContext)

export { ManagementProvider, useManagementProvider }