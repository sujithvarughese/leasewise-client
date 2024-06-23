import SideBar from './SideBar.jsx'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PublicNavbar from './PublicNavbar.jsx'
import AppBar from './AppBar.jsx'
import Landing from '../../pages/Landing.jsx'

const Layout = () => {

  const { role } = useAuthProvider()

  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [role])

  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  )
}

export default Layout