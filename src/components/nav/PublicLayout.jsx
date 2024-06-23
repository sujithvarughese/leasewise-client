
import PublicNavbar from './PublicNavbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthProvider } from '../../context/auth-context.jsx'

const PublicLayout = () => {

  const { user } = useAuthProvider()
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [user])

  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

export default PublicLayout