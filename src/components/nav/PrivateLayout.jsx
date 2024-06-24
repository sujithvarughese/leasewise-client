import { useAuthProvider } from '../../context/auth-context.jsx'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PrivateNavbar from './PrivateNavbar.jsx'

const PrivateLayout = () => {

  const { user } = useAuthProvider()

  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [user])

  return (
    <div>
      <PrivateNavbar />
    </div>
  )
}

export default PrivateLayout