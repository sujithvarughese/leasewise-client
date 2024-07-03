
import { Snackbar } from '@mui/material'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useState } from 'react'

const UnauthorizedAlert = () => {

  const { unauthorizedAlertShown } = useAuthProvider()

  return <Snackbar open={unauthorizedAlertShown} message="Unauthorized"/>

}

export default UnauthorizedAlert