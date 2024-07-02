import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import { Tab, Typography } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TableHead from '@mui/material/TableHead'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

const UnitTabs = ({ unitIncomes, unitExpenses, unitMortgages }) => {

  const [value, setValue] = useState("1")
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Paid</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unitIncomes?.map(income =>
                <TableRow key={income._id}>
                  <TableCell>{income?.datePaid?.substring(0, 10)}</TableCell>
                  <TableCell>{income?.category}</TableCell>
                  <TableCell>{income?.amount}</TableCell>
                  <TableCell>{income?.balance}</TableCell>
                  <TableCell>{income?.paymentMethod}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value="2">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Due</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Pay To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {unitExpenses?.map(expense =>
                <TableRow  key={expense._id}>
                  <TableCell>{expense?.dateDue?.substring(0, 10)}</TableCell>
                  <TableCell>{expense?.category}</TableCell>
                  <TableCell>{expense?.companyName}</TableCell>
                  <TableCell>{expense?.amount}</TableCell>
                  <TableCell>{expense?.balance}</TableCell>


                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value="3">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Payments Made</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unitMortgages?.map(mortgage =>
                <TableRow  key={mortgage._id}>
                  <TableCell>{mortgage?.bank}</TableCell>
                  <TableCell>{mortgage?.purchasePrice}</TableCell>
                  <TableCell>{mortgage?.principal}</TableCell>
                  <TableCell>{mortgage?.interest}</TableCell>
                  <TableCell>{mortgage?.term}</TableCell>
                  <TableCell>{mortgage?.numPaymentsMade}</TableCell>

                </TableRow>
              )}
            </TableBody>

          </Table>
        </TabPanel>
      </TabContext>
    </Box>

  )
}

export default UnitTabs