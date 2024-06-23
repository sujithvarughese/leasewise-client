import SideBar from './SideBar.jsx'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PublicNavbar from './PublicNavbar.jsx'
import PrivateNavbar from './PrivateNavbar.jsx'
import Landing from '../../pages/Landing.jsx'

const PrivateLayout = () => {

  const { user } = useAuthProvider()

  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [user])

  return (
    <div>
      <PrivateNavbar />
      <Outlet />
    </div>
  )
}

export default PrivateLayout