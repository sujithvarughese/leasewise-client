import React, { useEffect } from 'react'
import useSubmit from '../hooks/useSubmit.js'
import { ImageList, ImageListItem, Modal, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'

const ListingDetails = () => {

  const { state: home } = useLocation()
  const {
    address,
    city,
    state,
    zipCode,
    bedrooms,
    bathrooms,
    listPrice,
    streetViewImage,
    description,
    yearBuilt,
    photos,
    listDate,
    lastSoldPrice,
    lastSoldDate,
    link
  } = home

  console.log(photos)
  return (
    <Box>

        <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
          {photos?.map((item, index) => (
            <ImageListItem key={index}>
              <img src={item} alt="photo"/>
            </ImageListItem>
          ))}
        </ImageList>

        <Typography>{address}</Typography>
        <Typography>{city}, {state} {zipCode}</Typography>
        <Typography>{description}</Typography>


    </Box>
  )
}

export default ListingDetails