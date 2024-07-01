import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import { Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabIncomes from './TabIncomes.jsx'
import TabExpenses from './TabExpenses.jsx'

const UnitTabs = ({ unitIncomes, unitExpenses, unitMortgage }) => {

  const [value, setValue] = useState("income")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="incomes-expenses-mortgage-tabs">
          <Tab label="Incomes" value="incomes" />
          <Tab label="Expenses" value="expenses" />
          <Tab label="Mortgage" value="mortgage" />
        </TabList>
      </Box>
      <TabIncomes unitIncomes={unitIncomes} />
      <TabExpenses unitExpenses={unitExpenses} />
      <TabExpenses unitMortgage={unitMortgage} />
    </TabContext>
  )
}

export default UnitTabs