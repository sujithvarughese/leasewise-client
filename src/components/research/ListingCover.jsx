import React, { useEffect, useState } from 'react'
import { CardActionArea, CardMedia, LinearProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ListingDetails from './ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'

const ListingCover = ({
  propertyId,
  address,
  city,
  state,
  zipCode,
  streetViewImage,
  primaryImage,
  bedrooms,
  bathrooms,
  listPrice
}) => {

  const [showDetails, setShowDetails] = useState(false)
  const [listingDetails, setListingDetails] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()


  const handleClick = () => {
    submitForm({ method: "GET", url: `/research/listings/${propertyId}`, requestConfig: null })
  }

  useEffect(() => {
    if (response) {
      setListingDetails(response.home)
      setShowDetails(true)
    }
  }, [response])

  return (
    <>
      <Paper elevation={16} variant="outlined" component="button" onClick={handleClick} sx={{  width: 240 }}>
        <CardActionArea>
          <CardMedia component="img" image={primaryImage} height={140}></CardMedia>

          <CardContent>
            <Box>
              <Typography height={60} gutterBottom variant="h5">{address}</Typography>
              <Typography variant="body1" >{city}, {state} {zipCode}</Typography>
            </Box>
            <Typography variant="body2">{bedrooms} bedrooms {bathrooms} bathrooms</Typography>
            <Typography variant="subtitle2">List Price: ${listPrice}</Typography>
            {loading && <LinearProgress />}
          </CardContent>
        </CardActionArea>

      </Paper>

      {showDetails &&
        <ListingDetails
          closeDetails={() => setShowDetails(false)}
          showDetails={showDetails}
          address={address}
          city={city}
          state={state}
          zipCode={zipCode}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          listPrice={listPrice}
          streetViewImage={streetViewImage}
          {...listingDetails}
        />}
    </>


  )
}

export default ListingCover