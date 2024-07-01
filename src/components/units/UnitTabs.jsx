import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import { Tab, Typography } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'

const UnitTabs = ({ unitIncomes, unitExpenses, unitMortgages }) => {

  const [value, setValue] = useState("incomes")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Incomes" value="1" />
            <Tab label="Expenses" value="2" />
            <Tab label="Mortgages" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            {unitIncomes?.map(income =>
              <Box  key={income._id}>
                <Typography>Category: {income?.category}</Typography>
                <Typography>Amount: {income?.amount}</Typography>
                <Typography>Balance: {income?.balance}</Typography>
                <Typography>Date Paid: {income?.datePaid}</Typography>
                <Typography>Paid Via: {income?.paidVia}</Typography>
              </Box>
            )}
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box>
            {unitExpenses?.map(expense =>
              <Box  key={expense._id}>
                <Typography>Type: {expense?.type}</Typography>
                <Typography>Category: {expense?.category}</Typography>
                <Typography>Amount: {expense?.amount}</Typography>
                <Typography>Balance: {expense?.balance}</Typography>
                <Typography>Date Due: {expense?.dateDue}</Typography>
                <Typography>Date Paid: {expense?.datePaid}</Typography>
                <Typography>Company: {expense?.companyName}</Typography>
                <Typography>Company Address: {expense?.companyAddress}</Typography>
                <Typography>Company Phone: {expense?.companyPhone}</Typography>

              </Box>
            )}
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box>
            {unitMortgages?.map(mortgage =>
              <Box  key={mortgage._id}>
                <Typography>Bank: {mortgage?.bank}</Typography>
                <Typography>Purchase Price: {mortgage?.purchasePrice}</Typography>
                <Typography>Principal: {mortgage?.principal}</Typography>
                <Typography>Interest: {mortgage?.interest}</Typography>
                <Typography>Term: {mortgage?.term}</Typography>
                <Typography>Payments Made: {mortgage?.numPaymentsMade}</Typography>

              </Box>
            )}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>

  )
}

export default UnitTabs