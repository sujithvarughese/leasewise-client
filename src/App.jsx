
import Landing from "./pages/Landing.jsx";
import {Container} from "@mui/material";
import Navbar from "./components/nav/Navbar.jsx";
import { useEffect, useState } from 'react'
import {Routes, Route} from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import { AuthProvider, useAuthProvider } from './context/auth-context.jsx'
const App = () => {

  const { user } = useAuthProvider()

  useEffect(() => {

  }, [user])

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Container>
  )
}

export default App
