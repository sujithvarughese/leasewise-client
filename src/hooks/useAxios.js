import { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from '../utilities/constants.js'

const UseAxios = () => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitData = async (configObject) => {
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
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { response, error, loading, submitData }
}

export const axiosDB = axios.create({
  baseURL: config.url.API_URL,
  withCredentials: true
});
// response
axiosDB.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);
export default UseAxios