
import PublicNavbar from './PublicNavbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthProvider } from '../../context/auth-context.jsx'

const PublicLayout = () => {


  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

export default PublicLayout