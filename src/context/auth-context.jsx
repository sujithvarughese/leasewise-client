import {createContext, useContext, useReducer} from "react";
import useAxios from '../hooks/useAxios.js'

const initialState = {
  account: "",
  user: null
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



  return (
    <AuthContext.Provider value={{
      ...authState,
      signInUser,
      signUpUser,
      signOutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthContext = createContext({})
const useAuthProvider = () => useContext(AuthContext)

export { AuthProvider, useAuthProvider }