import {createContext, useContext, useReducer} from "react";
import useAxios from '../hooks/useAxios.js'

const initialState = {
  user: null
}
const authReducer = (state, action) => {
  if (action.type === "SIGN_IN_USER") {
    console.log("Logged in!")
    return {
      ...state,
      user: action.payload.user
    }
  }
  if (action.type === "SIGN_UP_USER") {
    return {
      ...state,
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

  const { response, error, loading, submitData } = useAxios()
  const signInUser = (user) => {
    dispatch({ type: "SIGN_IN_USER", payload: user })
  }
  const signUpUser = () => {
    dispatch({ type: "SIGN_UP_USER" })
  }
  const signOutUser = () => {
    dispatch({ type: "SIGN_OUT_USER" })
  }



  return (
    <AuthContext.Provider value={{
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