import {createContext, useContext, useReducer} from "react";
import { duration } from '@mui/material'

const initialState = {
  account: "",
  user: null,
  unauthorizedAlertShown: false,
}
const authReducer = (state, action) => {
  if (action.type === "SIGN_IN_USER") {
    return {
      ...state,
      account: action.payload.account,
      role: action.payload.role,
      user: action.payload.user
    }
  }
  if (action.type === "SIGN_UP_USER") {
    return {
      ...state,
      account: action.payload.account,
      role: action.payload.role,
      user: action.payload.user
    }
  }
  if (action.type === "SIGN_OUT_USER") {
    return {
      ...initialState,
    }
  }
  if (action.type === "SHOW_UNAUTHORIZED_ALERT") {
    return {
      ...state,
      unauthorizedAlertShown: true,
    }
  }
  if (action.type === "CLOSE_UNAUTHORIZED_ALERT") {
    return {
      ...state,
      unauthorizedAlertShown: false,
    }
  }
}
const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, initialState)

  const signInUser = (data) => {
    dispatch({ type: "SIGN_IN_USER", payload: data })
  }
  const signUpUser = () => {
    dispatch({ type: "SIGN_UP_USER" })
  }
  const signOutUser = () => {
    dispatch({ type: "SIGN_OUT_USER" })
  }

  const showUnauthorizedAlert = (duration = 5000) => {
    setTimeout(() => {
      dispatch({ type: "CLOSE_UNAUTHORIZED_ALERT"})
    }, duration)
    dispatch({ type: "SHOW_UNAUTHORIZED_ALERT" })
  }

  const closeUnauthorizedAlert = () => {
    dispatch({ type: "CLOSE_UNAUTHORIZED_ALERT"})
  }


  return (
    <AuthContext.Provider value={{
      ...authState,
      signInUser,
      signUpUser,
      signOutUser,
      showUnauthorizedAlert,
      closeUnauthorizedAlert
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthContext = createContext({})
const useAuthProvider = () => useContext(AuthContext)

export { AuthProvider, useAuthProvider }