import { useAuthProvider } from '../../context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate, useLoaderData } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PrivateNavbar from './PrivateNavbar.jsx'
import Box from '@mui/material/Box'
import { axiosDB } from '../../utilities/axios.js'
import { useManagementProvider } from '../../context/management-context.jsx'
import Loading from '../Loading.jsx'

const PrivateLayout = () => {

  const { messagesLoader } = useLoaderData()
  const navigation = useNavigation()
  //const { messages, setState } = useManagementProvider()



  const unreadCount = messagesLoader.reduce((acc, message) => {
    if (!message.read) {
      return acc + 1
    }
    return acc
  }, 0)

/*
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [user])
*/

  return (
    <Box display="flex">
      <PrivateNavbar numUnreadMessages={unreadCount}/>
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
        <Outlet />
      </Box>
    </Box>
  )
}

export const signInLoader = async () => {
  try {
    const response = await axiosDB("/messages")
    const { messages } = response.data
    return { messagesLoader: messages }
  } catch (error) {
    throw new Error(error)
  }
}

export default PrivateLayout