import React, { useEffect } from 'react'
import useSubmit from '../../hooks/useSubmit.js'
import { ImageList, ImageListItem, Modal, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { convertToUSD } from '../../utilities/financeCalculations.js'
import Link from '@mui/material/Link'

const ListingDetails = ({
  propertyId,
  closeDetails,
  showDetails,
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
  }) => {

  const listDateString = new Date(listDate).toLocaleDateString()
  const lastSoldDateString = new Date(lastSoldDate).toLocaleDateString()

  console.log(photos)
  return (
    <Modal open={showDetails} onClose={closeDetails}>
      <Box sx={style}>
        <Typography>{address}</Typography>
        <Typography>{city}, {state} {zipCode}</Typography>
        <Typography>{bedrooms} bed, {bathrooms} bath</Typography>
        <Typography>{convertToUSD(listPrice)}</Typography>
        <Typography>Built in {yearBuilt}</Typography>
        <Typography>Listed on {listDateString}</Typography>
        <Typography>Last sold for {convertToUSD(lastSoldPrice)} on {lastSoldDateString}</Typography>
        <Link href={link} target="_blank" rel="noreferrer">More Information</Link>
        <ImageList cols={3}>
          {photos?.map((item, index) => (
            <ImageListItem key={index}>
              <img src={item} alt="photo"/>
            </ImageListItem>
          ))}
        </ImageList>
        <Typography>{description}</Typography>

        <>
          <Typography>Google Street View</Typography>
          <Box component="img" src={streetViewImage} alt="photo" />
        </>





      </Box>

    </Modal>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: "80vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: "scroll"
};
export default ListingDetails