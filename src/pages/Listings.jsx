import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import useSubmit from '../hooks/useSubmit.js'
import Box from '@mui/material/Box'
import ListingCover from '../components/research/ListingCover.jsx'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

const Listings = () => {

  const [zipCode, setZipCode] = useState("")
  const [listings, setListings] = useState(null)

  const { response, error, loading, submitForm } = useSubmit()



  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm({ method: "POST", url: "/research/listings", requestConfig: { zipCode }})
  }

  useEffect(() => {
    if (response) {
      setListings(response.homes)
    }
  }, [response])


  return (
    <Box>
      <Toolbar />
      <Container>
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

        {listings?.map((listing, index) => <ListingCover key={index} {...listing}/>)}

      </Container>

    </Box>


  )
}

export default Listings