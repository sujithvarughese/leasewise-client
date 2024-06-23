import SideBar from './components/nav/SideBar.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/nav/Navbar.jsx'

const Layout = () => {

  const { user, role } = useAuthProvider()
  const navigate = useNavigate()
  useEffect(() => {
    if (role === "management") {
      navigate("/management")
    } else {
      navigate("/")
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout