import Button from '@mui/material/Button'
import { Formik } from 'formik'
import { loginSchema } from '../../utilities/authSchemas.js'
import useAxios from '../../hooks/useAxios.js'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useEffect } from 'react'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const DemoButton = ({ closeDrawer }) => {
  const { signInUser } = useAuthProvider()
  const { response, error, loading, submitData } = useAxios()
  const handleSubmit = async (values, actions) => {
    closeDrawer()
    try {
      await submitData({
        method: "post",
        url: "/auth/login",
        requestConfig: values
      })
    } catch (err) {
      console.log(error.message)
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
            onClick={()=>handleSubmit(credentials, props)}
          >
            Tour
          </Button>
        )}
      </Formik>
    </>
  )
}

export default DemoButton