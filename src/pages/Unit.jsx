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
import Button from '@mui/material/Button'
import CreateExpenseForm from '../components/forms/CreateExpenseForm.jsx'
import CreateIncomeForm from '../components/forms/CreateIncomeForm.jsx'
import CreateMortgageForm from '../components/forms/CreateMortgageForm.jsx'
import { useState } from 'react'
import UnitTabs from '../components/units/UnitTabs.jsx'

const Unit = () => {

  const { state: id } = useLocation()
  console.log(id)

  const { units, expenses, incomes, mortgages } = useManagementProvider()

  const unitDetails = units?.find(unit => unit._id === id)
  const unitExpenses = expenses?.filter(expense => expense.unit === id)
  const unitIncomes = incomes?.filter(income => income.unit === id)
  const unitMortgage = mortgages?.filter(mortgage => mortgage.unit === id)

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false)
  const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)
  const [showCreateMortgageForm, setShowCreateMortgageForm] = useState(false)

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

      <UnitTabs unitIncomes={unitIncomes} unitExpenses={unitExpenses} unitMortgage={unitMortgage}/>

      <Button onClick={() => setShowCreateMortgageForm(!showCreateMortgageForm)}>Create Mortgage</Button>
      {showCreateMortgageForm && <CreateMortgageForm id={id} open={showCreateMortgageForm} onClose={() => setShowCreateMortgageForm(false)}/>}


      <Button onClick={() => setShowCreateExpenseForm(!showCreateExpenseForm)}>Create Expense</Button>
      {showCreateExpenseForm && <CreateExpenseForm id={id} open={showCreateExpenseForm} onClose={() => setShowCreateExpenseForm(false)}/>}

      <Button onClick={() => setShowCreateIncomeForm(!showCreateIncomeForm)}>Create Income</Button>
      {showCreateIncomeForm && <CreateIncomeForm id={id} open={showCreateIncomeForm} onClose={() => setShowCreateIncomeForm(false)}/>}

    </Container>
  )
}

export default Unit