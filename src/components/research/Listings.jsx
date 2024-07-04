import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import useSubmit from '../../hooks/useSubmit.js'

const Listings = () => {

  const [zipCode, setZipCode] = useState("")

  const { response, error, loading, submitForm } = useSubmit()

  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm({ method: "POST", url: "/research/listings", requestConfig: { zipCode }})
  }

  useEffect(() => {
    if (response) {
      console.log(response)
    }
  }, [response])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="zipCode"
        value={zipCode}
        label="Zip Code"
        variant="outlined"
        onChange={(e) => setZipCode(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default Listings