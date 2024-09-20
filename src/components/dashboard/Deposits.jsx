import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { convertToUSD } from '../../utilities/financeCalculations.js'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = ({ incomes, expenses }) => {

  const calculateTotalIncome = incomes?.reduce((acc, item) => acc + Number(item.amount), 0)
  const calculateTotalExpense = expenses?.reduce((acc, item) => acc + Number(item.amount), 0)
  const calculateProfit = calculateTotalIncome - calculateTotalExpense

  const [viewBalance, setViewBalance] = useState(false)

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Title>Recent Rent Income</Title>
      <Typography component="p" variant="h4">
        {convertToUSD(incomes[incomes.length - 1].amount)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {incomes[incomes.length - 1].datePaid.substring(0, 10)}
      </Typography>

      <Box>
        {viewBalance && <Typography ml={1}>{convertToUSD(calculateProfit)}</Typography>}
        <Button color="primary" onClick={() => setViewBalance(!viewBalance)}>
          { viewBalance ? "Hide" : "View"} balance
        </Button>
      </Box>
    </Paper>
  );
}

export default Deposits