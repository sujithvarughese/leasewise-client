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
import { useManagementProvider } from '../context/management-context.jsx'

const Messages = () => {
  // messages = { inbox, outbox }	// message = { sender: { lastName, firstName, _id }, recipient, subject, body, read, flag, date, previousMessage
  const data = useLoaderData()
  const { user } = useAuthProvider()


  const [messageHeadNodes, setMessageHeadNodes] = useState(data)
  const [showCreateMessageForm, setShowCreateMessageForm] = useState(false)
  const [addressBook, setAddressBook] = useState([])
  const [expandedConversation, setExpandedConversation] = useState(null)
  const [showCreateReply, setShowCreateReply] = useState(false)
  const [showExpanded, setShowExpanded] = useState(false)

  const getMessages = async () => {
    try {
      // retrieve all messages where sender or recipient matches using req.user info that is stored at login
      const response = await axiosDB("/messages")
      const { messages } = response.data
      setMessageHeadNodes(messages)
    } catch (error) {
      throw new Error(error)
    }
  }
  // fetch address book for admin
  const getUserList = async () => {
    try {
      const response = await axiosDB("/auth/getUserList")
      const { userList } = response.data
      setAddressBook(userList)
    } catch (error) {
      console.log(error);
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
      const updatedMessageHeadNodes = [...messageHeadNodes]
      // replace message in state with updated message with appropriate flag for both collapsed/expanded message
      const messageIndex = updatedMessageHeadNodes.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMessageHeadNodes[messageIndex] = { ...updatedMessageHeadNodes[messageIndex], flag: !updatedMessageHeadNodes[messageIndex].flag}
      setMessageHeadNodes(updatedMessageHeadNodes)
      setExpandedConversation(updatedMessageHeadNodes[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageRead = async (message) => {
    try {
      await axiosDB.patch("/messages/read", message)
      const updatedMailbox = [...messageHeadNodes]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: true}
      setMessageHeadNodes(updatedMailbox)
      setExpandedConversation(updatedMailbox[messageIndex])

    } catch (error) {
      throw new Error(error)
    }
  }

  const markMessageUnread = async (message) => {
    try {
      await axiosDB.patch("/messages/unread", message)
      const updatedMailbox = [...messageHeadNodes]
      // replace message in state with updated message with appropriate read status
      const messageIndex = updatedMailbox.findIndex(currentMessage => currentMessage._id === message._id)
      updatedMailbox[messageIndex] = { ...updatedMailbox[messageIndex], read: false}
      setMessageHeadNodes(updatedMailbox)
      setExpandedConversation(updatedMailbox[messageIndex])
    } catch (error) {
      throw new Error(error)
    }
  }



  useEffect(() => {
    // determine which address book to get based on role (we don't want to give tenant access to other user data)
    // addr book returned from backend as array of objects { text: "lastName, firstName", value: user._id }
    if (user.role === "management") {
      getUserList()
    } else {
      getAdminInfo()
    }
    window.scrollTo(0, 0)
  }, [user.isAdmin, user.id]);

  return (
    <>
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
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
            {/*
            <Stack flexDirection="row">
              {
                // Create new message icon is hidden in mobile when message is expanded
                // Back button is only displayed in mobile when message is expanded
                !showCreateMessageForm &&
                <IconButton
                  onClick={()=>setShowCreateMessageForm(prevState => !prevState)}
                  sx={{ fontSize: "32px"}}
                >
                  <BiMessageSquareEdit />
                </IconButton>
              }

            </Stack>
            */}
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


            <Grid container position="relative">
              <Grid item xs={12} md={4} sx={{ overflowY: "scroll", height: "100vh" }}>
                {
                  messageHeadNodes.length > 0 ?
                    messageHeadNodes.map(message =>
                      <MessageCollapsed
                        key={message._id}
                        messageHead={message}
                        setExpandedConversation={setExpandedConversation}
                        markMessageRead={markMessageRead}
                        toggleFlag={toggleFlag}
                        userID={user.id}
                        closeReply={()=>setShowCreateReply(false)}

                      />
                    )
                    :
                    <Typography textAlign="center">No Messages in this Mailbox</Typography>
                }
              </Grid>

              {
                expandedConversation && !showCreateMessageForm ?
                  <Grid item xs={12} md={7} sx={{ overflowY: "scroll", height: "100vh" }}>
                    <MessageExpanded
                      expandedConversation={expandedConversation}
                      messages={messageHeadNodes}
                      toggleFlag={toggleFlag}
                      userID={user.id}
                      markMessageUnread={markMessageUnread}
                      showCreateReply={showCreateReply}
                      setShowCreateReply={setShowCreateReply}
                      getMessages={getMessages}
                      setExpandedMessage={setExpandedConversation}
                      closeExpanded={() => setShowExpanded(false)}

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


      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
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

            <Stack flexDirection="row" justifyContent="space-between">
              {
                expandedConversation &&
                <Box display={{ xs: "flex", lg: "none" }}>
                  <IconButton onClick={() => setExpandedConversation(null)}><TfiControlBackward /></IconButton>
                </Box>
              }

              {
                // Create new message icon is hidden in mobile when message is expanded
                // Back button is only displayed in mobile when message is expanded
                !showCreateMessageForm &&
                <IconButton
                  onClick={()=>setShowCreateMessageForm(prevState => !prevState)}
                  sx={{ fontSize: "32px"}}
                >
                  <BiMessageSquareEdit />
                </IconButton>
              }

            </Stack>
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


            <Grid container position="relative">
              {
                expandedConversation ?
                  <>
                    {
                      expandedConversation && !showCreateMessageForm ?
                        <Grid item xs={12} md={7} sx={{ overflowY: "scroll", height: "100vh" }}>
                          <MessageExpanded
                            expandedConversation={expandedConversation}
                            messages={messageHeadNodes}
                            toggleFlag={toggleFlag}
                            userID={user.id}
                            markMessageUnread={markMessageUnread}
                            showCreateReply={showCreateReply}
                            setShowCreateReply={setShowCreateReply}
                            getMessages={getMessages}
                            setExpandedMessage={setExpandedConversation}
                            closeExpanded={() => setShowExpanded(false)}

                          />
                        </Grid>
                        :
                        <Grid item xs={12} md={8}>
                          <Typography variant="h3" textAlign="center" py={16}>
                            No Message Selected
                          </Typography>
                        </Grid>
                    }
                  </>
                  :
                  <Grid item xs={12} md={4} sx={{ overflowY: "scroll", height: "100vh" }}>
                    {
                      messageHeadNodes.length > 0 ?
                        messageHeadNodes.map(message =>
                          <MessageCollapsed
                            key={message._id}
                            messageHead={message}
                            setExpandedConversation={setExpandedConversation}
                            markMessageRead={markMessageRead}
                            toggleFlag={toggleFlag}
                            userID={user.id}
                            closeReply={()=>setShowCreateReply(false)}

                          />
                        )
                        :
                        <Typography textAlign="center">No Messages in this Mailbox</Typography>
                    }
                  </Grid>
              }





            </Grid>

          </Container>
        </Box>

      </Box>

    </>


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