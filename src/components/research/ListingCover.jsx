import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ListingDetails from '../../pages/ListingDetails.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import { useNavigate } from 'react-router-dom'

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

  const [listingDetails, setListingDetails] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()

  const navigate = useNavigate()

  const handleClick = () => {
    submitForm({ method: "GET", url: `/research/listings/${propertyId}`, requestConfig: null })
  }

  useEffect(() => {
    if (response) {
      setListingDetails(response.home)
    }
  }, [response])

  useEffect(() => {
    if (listingDetails) {
      navigate(`/listings/${propertyId}`,
        { state: { address, city, state, zipCode, bedrooms, bathrooms, listPrice, streetViewImage, ...listingDetails }})
    }
  }, [listingDetails])

  return (

      <Box component="button" onClick={handleClick}>
        <Box component="img" src={primaryImage}></Box>

        <Box>
          <Typography>{address}</Typography>
          <Typography>{city}, {state} {zipCode}</Typography>
        </Box>
        <Typography>{bedrooms} bedrooms {bathrooms} bathrooms</Typography>
        <Typography>${listPrice}</Typography>

      </Box>





  )
}

export default ListingCover