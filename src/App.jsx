import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuthProvider } from './context/auth-context.jsx'
import {
  Accounting, accountingLoader, dashboardLoader,
  DashboardManagement,
  DashboardTenant,
  Error,
  Landing,
  Messages, messagesLoader,
  PrivateLayout,
  PrivateNavbar,
  PublicLayout,
  PublicNavbar,
  Research,
  SignIn, signInLoader,
  SignUp, Unit, unitLoader,
  Units, unitsLoader
} from './'
import { ManagementProvider } from './context/management-context.jsx'
import AccountingUnit from './pages/AccountingUnit.jsx'
import { MessagingProvider } from './context/messaging-context.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme.js'
import { tenantDashboardLoader } from './pages/DashboardTenant.jsx'
import { TenantProvider } from './context/tenant-context.jsx'
import Box from '@mui/material/Box'
import Image from 'mui-image'

const App = () => {

  const { user, role } = useAuthProvider()

  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/sign-in", element: <SignIn /> },
      ]
    }
  ])


  if (!!user && role === "tenant") {
    const tenantRouter = createBrowserRouter([
      {
        path: "/",
        element: <PrivateLayout />,
        //loader: signInLoader,
        errorElement: <Error />,
        children: [
          { index: true, element: <DashboardTenant />, loader: tenantDashboardLoader },
          { path: "/messages", element: <Messages />, loader: messagesLoader },
        ]
      }
    ])

    return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={tenantRouter} />
      </ThemeProvider>
    )
  }

  if (!!user && role === "management") {
    const managementRouter = createBrowserRouter([
      {
        path: "/",
        element: <PrivateLayout />,
        //loader: signInLoader,
        errorElement: <Error />,
        children: [
          { index: true, element: <DashboardManagement />, loader: dashboardLoader },
          { path: "/units", element: <Units />, loader: unitsLoader },
          { path: "/unit/:id", element: <Unit />, loader: unitLoader },
          { path: "/messages", element: <Messages />, loader: messagesLoader },
          { path: "/research", element: <Research /> },
          { path: "/accounting", element: <Accounting />, loader: accountingLoader },
          { path: "/accounting/:id", element: <AccountingUnit />, loader: accountingLoader },
        ]
      }
    ])

    return (
      <ThemeProvider theme={theme}>
        <ManagementProvider>
          <RouterProvider router={managementRouter} />
        </ManagementProvider>
      </ThemeProvider>
    )
  }

  return (
    <Box>

      <RouterProvider router={publicRouter} />
    </Box>
  )



}

export default App
