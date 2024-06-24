import classes from "./styles/FinancesTotal.module.css";
import { useState } from "react";
import { axiosDB } from "../utilities/axios.js";
import { useLoaderData } from "react-router-dom";
import { FinancesTotalCalculated, FinancesTotalUnitValues, FinancesMobileTable } from "../"
import { totalProfit, convertToUSD } from "../utilities/financeCalculations.js";
import { useManagementProvider } from '../context/management-context.jsx'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const Accounting = () => {

  // finances = array of each unit's financial data
  const finances = useLoaderData()
  const { units } = useManagementProvider()

  // allow users to view summary per month or year
  const [selectedTerm, setSelectedTerm] = useState(1)

  // filter array we receive in loader to include address from {units} and only relevant data
  const [unitFinances, setUnitFinances] = useState(finances.map(finance => {
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

  return (
    <div className={classes.container}>

      <div className="title">
        Accounting Totals
      </div>

      <div className={classes.content}>
        <div className={classes.form}>
            <label htmlFor="term" id="term">Term</label>
            <Select
              type="text"
              name="term"
              onChange={(e)=>setSelectedTerm(e.target.value)}
            >
              <MenuItem value={1}>Monthly</MenuItem>
              <MenuItem value={12}>Yearly</MenuItem>
            </Select>
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

    </div>
  );
};

export const accountingLoader = async () => {
  try {
    const response = await axiosDB("/finance")
    const { finances } = response.data
    return finances
  } catch (error) {
    console.log(error);
  }
}

export default Accounting;