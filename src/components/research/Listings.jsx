import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import useSubmit from '../../hooks/useSubmit.js'
import Box from '@mui/material/Box'
import ListingCover from './ListingCover.jsx'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import { Label } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'

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
      const updatedHomes = response.homes.filter(home => !!home.address)
      setListings(updatedHomes)
    }
  }, [response])


  return (
    <Box>
      <Toolbar />
      <Container sx={{ textAlign: "center"}}>
        <Box paddingBottom={3}>
          <form onSubmit={handleSubmit}>
            <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={3}>
              <Typography variant="h5">Search MLS Listings: </Typography>
              <TextField
                type="text"
                name="zipCode"
                value={zipCode}
                label="Zip Code"
                variant="outlined"
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </Stack>


          </form>
        </Box>


        {listings?.map((listing, index) => <ListingCover key={index} {...listing}/>)}
      </Container>

    </Box>


  )
}

export default Listings