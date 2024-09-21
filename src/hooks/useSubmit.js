import { useState } from 'react'
import { axiosDB } from '../utilities/axios.js'

const useSubmit = () => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitForm = async (configObject) => {
    setResponse(null)
    setError("")
    setLoading(true)
    const { method, url, requestConfig } = configObject
    try {
      const res = await axiosDB[method.toLowerCase()]( url, {
        ...requestConfig,
      })
      setResponse(res.data)
      return true
    } catch (err) {
      setError(err.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { response, error, loading, submitForm }
}

export default useSubmit