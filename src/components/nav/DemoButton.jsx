import Button from '@mui/material/Button'
import { Formik } from 'formik'
import { loginSchema } from '../../utilities/authSchemas.js'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSubmit from '../../hooks/useSubmit.js'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const DemoButton = () => {

  const { signInUser } = useAuthProvider()
  const { response, error, loading, submitForm } = useSubmit()
  const navigate = useNavigate()
  const handleSubmit = async (values, actions) => {
    try {
      await submitForm({
        method: "post",
        url: "/auth/login",
        requestConfig: values
      })
      navigate("/")
    } catch (err) {
      console.log("Error1")
      console.log(error)
    } finally {
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (response) signInUser(response.data)
  }, [response])


  return (
    <>
      <Formik
        initialValues={{ email: "", password: ""}}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {props => (
          <Button
            sx={{ display: { xs: 'none', md: 'flex' } }}
            color="secondary"
            variant="contained"
            size="small"
            onClick={()=>handleSubmit(credentials, props)}
          >
            Tour
          </Button>
        )}

      </Formik>

      <Formik
        initialValues={{ email: "", password: ""}}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {props => (
          <Button
            sx={{ width: '100%', display: { sm: '', md: 'none' } }}
            color="secondary"
            variant="outlined"
            onClick={()=>{handleSubmit(credentials, props)}}
          >
            Tour
          </Button>
        )}
      </Formik>
    </>
  )
}

export default DemoButton