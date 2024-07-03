import { createContext, useContext, useReducer } from 'react'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  messageHeads: [],
  currentConversation: [],
  currentMessenger: null
}

const MessagingContext = createContext({})

const messagingReducer = (state, action) => {
  if (action.type === "SET_CURRENT_CONVERSATION") {
    return {
      ...state,
      currentConversation: action.payload.messages
    }
  }
}

const MessagingProvider = ({ children }) => {

  const [messagingState, dispatch] = useReducer(messagingReducer, initialState)

  const getCurrentConversation = async (messageID) => {
    try {
      const response = await axiosDB(`/messages/previous/${messageID}`)
      console.log(response)
      const { previousMessages: messages } = response.data
      console.log(messages)
      dispatch({ type: "SET_CURRENT_CONVERSATION", payload: messages })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <MessagingContext.Provider value={{
      ...messagingState,
      getCurrentConversation
    }}>
      {children}
    </MessagingContext.Provider>
  )


}

const useMessagingProvider = () => useContext(MessagingContext)

export { MessagingProvider, useMessagingProvider }