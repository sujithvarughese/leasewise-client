import { axiosDB } from "../utilities/axios.js";
import { useLoaderData } from "react-router-dom";
import MessageExpanded from '../components/messages/MessageExpanded.jsx'
import MessageCollapsed from '../components/messages/MessageCollapsed.jsx'
import { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi"
import { TfiControlBackward } from "react-icons/tfi"
import Button from '@mui/material/Button'
import { useAuthProvider } from '../context/auth-context.jsx'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import NewMessageForm from '../components/messages/NewMessageForm.jsx'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'

const Messages = () => {
  // messages = { inbox, outbox }	// message = { sender: { lastName, firstName, _id }, recipient, subject, body, read, flag, date, previousMessage
  const data = useLoaderData()
  const { user } = useAuthProvider()

  const [messages, setMessages] = useState(data)
  const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
  const [addressBook, setAddressBook] = useState([])
  const [expandedMessage, setExpandedMessage] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [showCreateReply, setShowCreateReply] = useState(false)



  // fetch address book for admin
  const getUserList = async () => {
    try {
      const response = await axiosDB("/auth/getUserList")
      const { userList } = response.data
      console.log(userList)
      setAddressBook(userList)
    } catch (error) {
      console.log(error);
    }
  }
  const getMessages = async () => {
    try {
      // retrieve all messages where sender or recipient matches using req.user info that is stored at login
      const response = await axiosDB("/messages")
      const { messages } = response.data
      setMessages(messages)

    } catch (error) {
      throw new Error(error)
    }
  }
  // fetch admin info so user can send messages
  const getAdminInfo = async () => {
    try {
      const response = await axiosDB("/auth/getAdminInfo")
      const { adminInfo } = response.data
      setAddressBook(adminInfo)
    } catch (error) {
      console.log(error);
    }
  }

  const toggleFlag = async (message) => {
    try {
      await axiosDB.patch("/messages/flag", message)
      const updatedMailbox = [...messages]
      // replace message in state with updated message with appropriate flag for both collapsed/expanded message
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], flag: !updatedMailbox[messageIndex].flag}
      setMessages(updatedMailbox)
      setExpandedMessage(updatedMailbox[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageRead = async (message) => {
    try {
      await axiosDB.patch("/messages/read", message)
      const updatedMailbox = [...messages]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: true}
      setMessages(updatedMailbox)
      setExpandedMessage(updatedMailbox[messageIndex])

    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageUnread = async (message) => {
    try {
      await axiosDB.patch("/messages/unread", message)
      const updatedMailbox = [...messages]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: false}
      setMessages(updatedMailbox)
      setExpandedMessage(updatedMailbox[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    // determine which address book to get based on role (we don't want to give tenant access to other user data)
    // addr book returned from backend as array of objects { text: "lastName, firstName", value: user._id }
    if (user.isAdmin) {
      getUserList()
    } else {
      getAdminInfo()
    }
    // conversations will be messages in which the most recent message in the conversation is either to or from the user
    const conversations = messages.filter(message => message.headNode && (message.recipient._id === user.id || message.sender._id === user.id))
    setMessages(conversations)
    window.scrollTo(0, 0)
  }, [user.isAdmin, user.id]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


          <Stack flexDirection="row">
            {
              // Create new message icon is hidden in mobile when message is expanded
              // Back button is only displayed in mobile when message is expanded
              !mobileExpanded && !showCreateMessageForm &&
              <IconButton
                onClick={()=>setShowCreateMessageForm(prevState => !prevState)}
                sx={{ fontSize: "32px"}}
              >
                <BiMessageSquareEdit />
              </IconButton>
            }

          </Stack>

          <Grid container position="relative">
            <Grid item xs={12} md={4} sx={{ overflowY: "scroll", height: "100vh" }}>
              {
              messages.length > 0 ?
              messages.map(message =>
              <MessageCollapsed
                key={message._id}
                message={message}
                setExpandedMessage={setExpandedMessage}
                markMessageRead={markMessageRead}
                toggleFlag={toggleFlag}
                showExpanded={()=>{}}
                userID={user.id}
                closeReply={()=>setShowCreateReply(false)}
              />)
              :
              <Typography textAlign="center">No Messages in this Mailbox</Typography>
              }
            </Grid>

            {
            showCreateMessageForm &&
            <Grid item xs={12} md={8}>
              <NewMessageForm
                close={()=>setShowCreateMessageForm(false)}
                addressBook={addressBook}
                getMessages={getMessages}
              />
            </Grid>
            }
            {
            expandedMessage && !showCreateMessageForm ?
            <Grid item xs={12} md={7} sx={{ overflowY: "scroll", height: "100vh" }}>
              <MessageExpanded
                message={expandedMessage}
                messages={data}
                toggleFlag={toggleFlag}
                userID={user.id}
                markMessageUnread={markMessageUnread}
                showCreateReply={showCreateReply}
                setShowCreateReply={setShowCreateReply}
                getMessages={getMessages}
                setMobileExpanded={setMobileExpanded}
              />
            </Grid>
            :
            <Grid item xs={12} md={8}>
              <Typography variant="h3" textAlign="center" py={16}>
                No Message Selected
              </Typography>
            </Grid>
            }
          </Grid>

        </Container>
      </Box>

    </Box>

  );
};

export const messagesLoader = async () => {
  try {
    // retrieve all messages where sender or recipient matches using req.user info that is stored at login
    const response = await axiosDB("/messages")
    const { messages: data } = response.data
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default Messages;