import { axiosDB } from '../utilities/axios.js'
import { useLoaderData } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import Image from 'mui-image'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import Container from '@mui/material/Container'

const DashboardTenant = () => {
  const { myUnit: unitDetails } = useLoaderData()

  return (
    <Container>
      <Toolbar />
      <Image src={unitDetails?.image} alt="image" />

      <Stack justifyContent="center" alignItems="center" margin={3}>
        <Stack justifyContent="space-around">
          <Box>
            <Typography variant="h5">{unitDetails?.houseNumber} {unitDetails?.street} {unitDetails?.apartmentNumber}</Typography>
            <Typography variant="h6">{unitDetails?.city}, {unitDetails?.state} {unitDetails?.zip}</Typography>
          </Box>
          <Box>
            <Typography>{unitDetails?.bedrooms} bd / {unitDetails?.bathrooms}ba</Typography>
          </Box>
        </Stack>
        <br/>
        <Stack justifyContent="space-around">
          <Box>
            <Typography variant="body2">{unitDetails?.tenant?.lastName}, {unitDetails?.tenant?.firstName}</Typography>
            <Typography variant="body2">{unitDetails?.tenant?.email}</Typography>
          </Box>
          <Typography variant="body2">Rent: ${unitDetails?.tenant?.rent}</Typography>
        </Stack>
      </Stack>

    </Container>
  )
}

export const tenantDashboardLoader = async () => {
  try {
    let response = await axiosDB("/units/myUnit")
    const { myUnit } = response.data
    return { myUnit }
  } catch(error) {
    throw new Error(error)
  }
}

export default DashboardTenant