
import { useState } from 'react'
import UnitModal from './UnitModal.jsx'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Image from 'mui-image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UnitCoverGalleryMode = ({
  _id,
  houseNumber,
  street,
  city,
  apartmentNumber,
  state,
  zip,
  image,
  bedrooms,
  bathrooms,
  tenant,
  user
}) => {

  const [isHovering, setIsHovering] = useState(false)

  const navigate = useNavigate()
  const navigateToUnit = () => {
    navigate(`/unit/${_id}`, { state: _id })
  }

  return (
    <Button onClick={navigateToUnit}>
      <Card sx={{ position: "relative" }}>

        <CardMedia
          component="img"
          image={image}
          alt={`${houseNumber} ${street}`}
          sx={{
            height: "240px",
            width: "240px",
          }}

        />
        <Box
          position="absolute"
          top={0}
          width="100%"
          height="100%"
          backgroundColor="black"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            opacity: `${isHovering ? 0 : 0.4}`
          }}
        ></Box>

        <Box
          position="absolute"
          color="white"
          margin={2}
          top={0}
        >
          <Typography >{city}</Typography>
        </Box>
        <Box
          position="absolute"
          bottom={0}
          textAlign="left"
          color="white"
          margin={2}
        >
          <Typography>{houseNumber} {street} {apartmentNumber}</Typography>
          <Typography>{tenant?.lastName}, {tenant?.firstName}</Typography>
        </Box>

      </Card>


    </Button>

  )
}

export default UnitCoverGalleryMode