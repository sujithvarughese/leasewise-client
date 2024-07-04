import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ListingDetails from './ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'

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
      <Box component="button" onClick={handleClick}>
        <Box component="img" src={primaryImage}></Box>

        <Box>
          <Typography>{address}</Typography>
          <Typography>{city}, {state} {zipCode}</Typography>
        </Box>
        <Typography>{bedrooms} bedrooms {bathrooms} bathrooms</Typography>
        <Typography>${listPrice}</Typography>

      </Box>

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