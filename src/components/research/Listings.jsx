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
import { Accordion, AccordionDetails, AccordionSummary, Fade, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { LoadingButton } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
              <LoadingButton loading={loading} type="submit">Submit</LoadingButton>
            </Stack>


          </form>
        </Box>

        {listings &&
        <Accordion
          defaultExpanded
          slotProps={{ transition: { timeout: 100 } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            MLS Listings
          </AccordionSummary>
          <AccordionDetails>
            {listings?.map((listing, index) =>
              <ListingCover key={index} {...listing}/>)}
          </AccordionDetails>
        </Accordion>
        }


      </Container>

    </Box>


  )
}

export default Listings