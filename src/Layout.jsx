import SideBar from './components/nav/SideBar.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/nav/Navbar.jsx'
import AppBar from './components/nav/AppBar.jsx'
import Landing from './pages/Landing.jsx'

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
      {role === "management" || role === "tenant" && user ?
        <AppBar /> :
        <>
          <Navbar />
          <Landing />
        </>

      }
    </div>
  )
}

export default Layout