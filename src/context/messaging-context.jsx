import { createContext, useContext, useReducer } from 'react'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  messages: [],
  currentConversation: [],
  currentMessenger: null,
  unreadCount: 0
}

const MessagingContext = createContext({})

const messagingReducer = (state, action) => {
  if (action.type === "SET_CURRENT_CONVERSATION") {
    return {
      ...state,
      currentConversation: action.payload.messages
    }
  }
  if (action.type === "SET_MESSAGES") {
    return {
      ...state,
      messages: action.payload.messages,
      numUnreadMessages: action.payload.numUnreadMessages
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

  const setMessages = async () => {
    try {
      const response = await axiosDB("/messages")
      console.log(response)
      const { messages } = response.data
      const numUnreadMessages = messages.reduce((acc, message) => !message.read ? acc += 1 : acc, 0)
      console.log(messages)
      dispatch({ type: "SET_MESSAGES", payload: messages, numUnreadMessages })
    } catch (error) {
      throw new Error(error)
    }
  }



  return (
    <MessagingContext.Provider value={{
      ...messagingState,
      getCurrentConversation,
      setMessages
    }}>
      {children}
    </MessagingContext.Provider>
  )


}

const useMessagingProvider = () => useContext(MessagingContext)

export { MessagingProvider, useMessagingProvider }