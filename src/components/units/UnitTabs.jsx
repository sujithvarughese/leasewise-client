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
import { convertToUSD } from '../../utilities/financeCalculations.js'

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

        <TabPanel value="1"  sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Paid</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unitIncomes?.map(income =>
                <TableRow key={income._id}>
                  <TableCell>{income?.datePaid?.substring(0, 10)}</TableCell>
                  <TableCell>{income?.category[0].toUpperCase() + income.category.substring(1)}</TableCell>
                  <TableCell>{convertToUSD(income?.amount)}</TableCell>
                  <TableCell>{convertToUSD(income?.balance)}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>{income?.paymentMethod}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Due</TableCell>
                <TableCell>Category</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>Pay To</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>Amount</TableCell>
                <TableCell>Balance</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {unitExpenses?.map(expense =>
                <TableRow  key={expense._id}>
                  <TableCell>{expense?.dateDue?.substring(0, 10)}</TableCell>
                  <TableCell>{expense?.category[0].toUpperCase() + expense.category.substring(1)}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>{expense?.companyName}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>{convertToUSD(expense?.amount)}</TableCell>
                  <TableCell>{convertToUSD(expense?.balance)}</TableCell>


                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value="3" sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>Bank</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>APR</TableCell>
                <TableCell>Term</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>Payments Made</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unitMortgages?.map(mortgage =>
                <TableRow  key={mortgage._id}>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>{mortgage?.bank}</TableCell>
                  <TableCell>{convertToUSD(mortgage?.purchasePrice)}</TableCell>
                  <TableCell>{convertToUSD(mortgage?.principal)}</TableCell>
                  <TableCell>{mortgage?.interest}%</TableCell>
                  <TableCell>{mortgage?.term} months</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }}}>{mortgage?.numPaymentsMade}</TableCell>

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