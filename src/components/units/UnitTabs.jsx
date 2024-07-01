import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import { Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabIncomes from './TabIncomes.jsx'
import TabExpenses from './TabExpenses.jsx'
import TabMortgages from './TabMortgages.jsx'

const UnitTabs = ({ id, unitIncomes, unitExpenses, unitMortgages }) => {

  const [value, setValue] = useState("incomes")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="incomes-expenses-mortgage-tabs">
          <Tab label="Incomes" value="incomes" />
          <Tab label="Expenses" value="expenses" />
          <Tab label="Mortgages" value="mortgages" />
        </TabList>
      </Box>
      <TabIncomes unitIncomes={unitIncomes} />
      <TabExpenses unitExpenses={unitExpenses} />
      <TabMortgages unitMortgages={unitMortgages} />
    </TabContext>
  )
}

export default UnitTabs