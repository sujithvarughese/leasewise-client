import Container from '@mui/material/Container'
import Image from 'mui-image'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Tab, Tabs, Typography } from '@mui/material'
import FinancialDataTabPanel from '../components/gallery/FinancialDataTabPanel.jsx'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom'
import { axiosDB } from '../utilities/axios.js'
import { useManagementProvider } from '../context/management-context.jsx'

const Unit = () => {

  const { state: id } = useLocation()
  console.log(id)

  const { units, expenses, incomes } = useManagementProvider()

  const unitDetails = units?.find(unit => unit._id === id)
  const unitExpenses = expenses?.filter(expense => expense.unit === id)
  const unitIncomes = incomes?.filter(income => income.unit === id)

  console.log(unitDetails)

  return (
    <Container>
      <Toolbar />
      <Image src={unitDetails?.image} alt="image" />

      <Stack justifyContent="space-around">
        <Box>
          <Typography>{unitDetails?.houseNumber} {unitDetails?.street} {unitDetails?.apartmentNumber}</Typography>
          <Typography fontSize="md">{unitDetails?.city}, {unitDetails?.state} {unitDetails?.zip}</Typography>
        </Box>
        <Box>
          <Typography>{unitDetails?.bedrooms} bd / {unitDetails?.bathrooms}ba</Typography>
        </Box>
      </Stack>

      <Stack justifyContent="space-around">
        <Box>
          <Typography fontSize="sm">{unitDetails?.tenant?.lastName}, {unitDetails?.tenant?.firstName}</Typography>
          <Typography fontSize="sm">{unitDetails?.tenant?.email}</Typography>
        </Box>
        <Typography fontSize="sm">Rent: ${unitDetails?.tenant?.rent}</Typography>
      </Stack>

      <Tabs>
        <Tab label="Finances" />
        <Tab label="Messages" />
        <Tab label="Rents" />


      </Tabs>
    </Container>
  )
}

export default Unit