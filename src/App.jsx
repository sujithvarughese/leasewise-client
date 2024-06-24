import Landing from "./pages/Landing.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ManagementDashboard from './pages/ManagementDashboard.jsx'
import PrivateLayout from './components/nav/PrivateLayout.jsx'
import Error from './pages/Error.jsx'
import Units, { unitsLoader } from './pages/Units.jsx'
import { useAuthProvider } from './context/auth-context.jsx'
import PublicLayout from './components/nav/PublicLayout.jsx'
import Messages, { myMessagesLoader }  from './pages/Messages.jsx'
import Research from './pages/Research.jsx'
const App = () => {

  const { user } = useAuthProvider()


  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/sign-in", element: < SignIn /> },
      ]
    }
  ])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <ManagementDashboard /> },
        { path: "/management", element: <ManagementDashboard /> },
        { path: "/units", element: <Units />, loader: unitsLoader },
        { path: "/messages", element: <Messages />, loader: myMessagesLoader },
        { path: "research", element: <Research /> },

        /*
        { path: "home", element: <MyUnit />, loader: myUnitLoader },
        { path: "payments", element: <MyPayments /> },

        { path: "admin", element: <AdminAccess />, loader: adminAccessLoader},
        { path: "accounting", element: <Accounting />,
          errorElement: <Error />,
          children: [
            { index: true, element: <FinancesTotal />, loader: financialSummaryLoader },
            { path: ":id", element: <FinancesUnit />, loader: unitFinancialsLoader },
          ]
        }*/
      ]
    }
  ])


  return (
    <RouterProvider router={user ? router : publicRouter} />

  )
}

export default App
