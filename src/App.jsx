
import Landing from "./pages/Landing.jsx";
import {Container} from "@mui/material";
import Navbar from "./components/nav/Navbar.jsx";
import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import {AuthProvider} from "./context/auth-context.jsx";
const App = () => {





  return (
    <AuthProvider>
      <Container>
        <Navbar />
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Container>

    </AuthProvider>



  )
}

export default App
