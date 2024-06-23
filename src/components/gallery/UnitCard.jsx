
import { useState } from 'react'
import UnitModal from './UnitModal.jsx'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Image from 'mui-image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const UnitCard = ({
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
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Button onClick={() => setModalOpen(!modalOpen)}>
      <UnitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        _id={_id}
        houseNumber={houseNumber}
        street={street}
        apartmentNumber={apartmentNumber}
        city={city}
        state={state}
        zip={zip}
        image={image}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        tenant={tenant}
        user={user}
      />
      <Card position="relative">
        <Image
          src={image}
          alt={`${houseNumber} ${street}`}
          width={{ base: "100%", md: "240px" }}
          height={{ base: "100%", md: "240px" }}
        />

        <Box
          position="absolute"
          width="100%"
          height="100%"
          backgroundColor="black"
          opacity={isHovering ? 0 : 0.5}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        ></Box>

        <Box
          position="absolute"
          color="white"
          margin={2}
        >
          <Typography>{city}</Typography>
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

export default UnitCard