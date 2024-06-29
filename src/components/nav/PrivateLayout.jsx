import { useAuthProvider } from '../../context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate, useLoaderData } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PrivateNavbar from './PrivateNavbar.jsx'
import Box from '@mui/material/Box'
import { axiosDB } from '../../utilities/axios.js'
import { useManagementProvider } from '../../context/management-context.jsx'
import Loading from '../Loading.jsx'

const PrivateLayout = () => {

  const { units, messages } = useLoaderData()
  const navigation = useNavigation()
  const { setState } = useManagementProvider()

  const unreadCount = messages.reduce((acc, message) => {
    if (!message.read) {
      return acc + 1
    }
    return acc
  }, 0)

  useEffect(() => {
    setState({ units: units})
  }, [])


/*
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [user])
*/
  if (navigation.state === "loading") {
    return <Loading />
  }
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
    // all units
    let response = await axiosDB("/units")
    const { units } = response.data
    response = await axiosDB("/messages")
    const { messages } = response.data
    return { units, messages }
  } catch (error) {
    throw new Error(error)
  }
}

export default PrivateLayout