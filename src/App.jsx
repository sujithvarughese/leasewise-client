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
  SignUp,
  Units, unitsLoader
} from './'
import { ManagementProvider } from './context/management-context.jsx'

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
        { path: "/messages", element: <Messages />, loader: messagesLoader },
        { path: "research", element: <Research /> },
        { path: "accounting", element: <Accounting />, loader: accountingLoader },
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
    <ManagementProvider>
      <RouterProvider router={managementRouter} />
    </ManagementProvider>

  )
}

export default App
