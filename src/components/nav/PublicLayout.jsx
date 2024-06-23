
import PublicNavbar from './PublicNavbar.jsx'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

export default PublicLayout