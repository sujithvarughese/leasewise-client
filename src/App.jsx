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
import ListingDetails from './pages/ListingDetails.jsx'
import Listings from './pages/Listings.jsx'

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

  const managementRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      loader: signInLoader,
      errorElement: <Error />,
      children: [
        { index: true, element: <DashboardManagement />, loader: dashboardLoader },
        { path: "/units", element: <Units />, loader: unitsLoader },
        { path: "/unit/:id", element: <Unit />, loader: unitLoader },
        { path: "/messages", element: <Messages />, loader: messagesLoader },
        { path: "/research", element: <Research /> },
        { path: "/accounting", element: <Accounting />, loader: accountingLoader },
        { path: "/accounting/:id", element: <AccountingUnit />, loader: accountingLoader },
        { path: "/listings", element: <Listings /> },
        { path: "/listings/:id", element: <ListingDetails /> },
          /*errorElement: <Error />,
          children: [
            { index: true, element: <FinancesTotal />, loader: financialSummaryLoader },
            { path: ":id", element: <FinancesUnit />, loader: unitFinancialsLoader },
          ]
        }
        /*
        { path: "home", element: <MyUnit />, loader: myUnitLoader },
        { path: "payments", element: <MyPayments /> },

        { path: "admin", element: <AdminAccess />, loader: adminAccessLoader},
        */
      ]
    }
  ])

  if (!user) {
    return <RouterProvider router={publicRouter} />
  }

  return (
    <ThemeProvider theme={theme}>
      <ManagementProvider>
          <RouterProvider router={managementRouter} />
      </ManagementProvider>
    </ThemeProvider>


  )
}

export default App
