import Landing from "./pages/Landing.jsx";
import { Routes, Route, useNavigate, BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ManagementDashboard from './pages/ManagementDashboard.jsx'
import Layout from './Layout.jsx'
import Error from './pages/Error.jsx'
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/sign-in", element: < SignIn /> },
        { path: "/management", element: <ManagementDashboard /> },
        /*
        { path: "units", element: <Units />, loader: unitsLoader },
        { path: "home", element: <MyUnit />, loader: myUnitLoader },
        { path: "payments", element: <MyPayments /> },
        { path: "messages", element: <Messages />, loader: myMessagesLoader },
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
    <RouterProvider router={router} />

  )
}

export default App
