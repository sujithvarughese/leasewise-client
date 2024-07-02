import Container from '@mui/material/Container'
import Image from 'mui-image'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { ButtonGroup, Tab, Tabs, Typography } from '@mui/material'
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

  const { units, expenses, incomes, mortgages } = useManagementProvider()


  const unitDetails = units?.find(unit => unit._id === id)
  const unitExpenses = expenses?.filter(expense => expense.unit === id)
  const unitIncomes = incomes?.filter(income => income.unit === id)
  const unitMortgages = mortgages?.filter(mortgage => mortgage.unit === id)

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false)
  const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)
  const [showCreateMortgageForm, setShowCreateMortgageForm] = useState(false)


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



      <UnitTabs unitIncomes={unitIncomes} unitExpenses={unitExpenses} unitMortgages={unitMortgages}/>


      <ButtonGroup sx={{ display: "flex", justifyContent: "space-around", m: 3}}>
        <Button variant="contained" onClick={() => setShowCreateMortgageForm(!showCreateMortgageForm)}>Create Mortgage</Button>
        {showCreateMortgageForm && <CreateMortgageForm id={id} open={showCreateMortgageForm} onClose={() => setShowCreateMortgageForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateExpenseForm(!showCreateExpenseForm)}>Create Expense</Button>
        {showCreateExpenseForm && <CreateExpenseForm id={id} open={showCreateExpenseForm} onClose={() => setShowCreateExpenseForm(false)}/>}
        <Button variant="contained" onClick={() => setShowCreateIncomeForm(!showCreateIncomeForm)}>Create Income</Button>
        {showCreateIncomeForm && <CreateIncomeForm id={id} open={showCreateIncomeForm} onClose={() => setShowCreateIncomeForm(false)}/>}
      </ButtonGroup>


    </Container>
  )
}

export const unitLoader = async () => {
  try {
    let response = await axiosDB("/expenses")
    const { expenses } = response.data
    response = await axiosDB("/incomes")
    const { incomes } = response.data
    response = await axiosDB("/mortgages")
    const { mortgages } = response.data
    return { expenses, incomes, mortgages }
  } catch (error) {
    throw new Error(error)
  }
}

export default Unit