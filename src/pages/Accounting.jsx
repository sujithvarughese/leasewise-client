import classes from "./styles/FinancesTotal.module.css";
import { useState } from "react";
import { axiosDB } from "../utilities/axios.js";
import { useLoaderData } from "react-router-dom";
import { FinancesTotalCalculated, FinancesTotalUnitValues, FinancesMobileTable } from "../"
import { totalProfit, convertToUSD } from "../utilities/financeCalculations.js";
import { useManagementProvider } from '../context/management-context.jsx'
import { Select, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const Accounting = () => {
/*
  // finances = array of each unit's financial data
  const { finances, units } = useLoaderData()
  console.log(units)
  // allow users to view summary per month or year
  const [selectedTerm, setSelectedTerm] = useState(1)

  // filter array we receive in loader to include address from {units} and only relevant data
  const [unitFinances, setUnitFinances] = useState(finances?.map(finance => {
    const unit = units.find(unitInArray => unitInArray._id === finance.unit)
    return {
      unitID: finance.unit,
      financeID: finance._id,
      mortgage: finance.mortgage,
      propertyTax: finance.annualPropertyTax/12,
      insurance: finance.insurance.annualPremium/12,
      hoa: finance.hoa.annualFee/12,
      rent: finance.rent,
      houseNumber: unit.houseNumber,
      street: unit.street,
      apartmentNumber: unit.apartmentNumber,
      city: unit.city,
      state: unit.state,
      zip: unit.zip,
      tenant: unit.tenant,
      user: unit.user
    }
  }))

  // user can remove unit using state to see potential changes in finances
  const removeUnit = (unitID) => {
    const updatedList = unitFinances.filter(unitFinance => unitFinance.financeID !== unitID)
    setUnitFinances(updatedList)
  }
*/
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h1">Under Construction</Typography>
        </Container>
      </Box>
    </Box>

  );
};

export const accountingLoader = async () => {
  try {
    const responseFinances = await axiosDB("/finance")
    const responseUnits = await axiosDB("/units")
    const { finances } = responseFinances.data
    const { units } = responseUnits.data
    console.log(finances)
    return { finances, units }
  } catch (error) {
    console.log(error);
  }
}

export default Accounting;

/*
        <div className="title">
        Accounting Totals
      </div>

      <div className={classes.content}>
        <div className={classes.form}>
            <label htmlFor="term" id="term">Term</label>
            <StyledSelect
              type="text"
              name="term"
              onChange={(e)=>setSelectedTerm(e.target.value)}
            >
              <MenuItem value={1}>Monthly</MenuItem>
              <MenuItem value={12}>Yearly</MenuItem>
            </StyledSelect>
        </div>
        <div className={classes.mobile}>
          <FinancesMobileTable unitFinances={unitFinances} selectedTerm={selectedTerm} removeUnit={removeUnit}/>
        </div>

        <table className={classes.largeScreen}>
          <thead>
          <tr>
            <th>Address</th>
            <th>Mortgage</th>
            <th>Tax</th>
            <th>Insurance</th>
            <th>HOA</th>
            <th>Rent</th>
          </tr>
          </thead>

          <tbody>
          {
            unitFinances.map(unitFinance =>
              <FinancesTotalUnitValues
                key={unitFinance.financeID}
                unitFinance={unitFinance}
                selectedTerm={selectedTerm}
                removeUnit={removeUnit}
              />)
          }
          <FinancesTotalCalculated unitFinances={unitFinances} selectedTerm={selectedTerm}/>

          </tbody>
        </table>

        <div className={classes.totalProfit}>
          Total Profit: {convertToUSD(totalProfit(unitFinances, selectedTerm))}
        </div>
      </div>
*/