import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { convertToUSD } from '../../utilities/financeCalculations.js'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '15 Jul, 2024',
    'Insurance Premium',
    'Countrywide Insurance',
    'Checking ⠀•••• 3719',
    3120.44,
  ),
  createData(
    1,
    '30 Jul, 2024',
    "Homeowner's Association Fee",
    'London, UK',
    'Checking ⠀•••• 3719',
    866.99,
  ),
  createData(
    2,
    '1 Aug, 2024',
    'Lawn Care',
    'Wack Your Lawn Co.',
    'MC ⠀•••• 1253',
    100.81
  ),
  createData(
    3,
    '16 Sep, 2024',
    'Kicthen Renovation',
    'We do Kitchens and Co.',
    'AMEX ⠀•••• 2000',
    8540.39,
  ),
  createData(
    4,
    '30 Nov, 2024',
    'Tax',
    'Miami-Dade County',
    'Checking ⠀•••• 3719',
    14120.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const UpcomingPayments = ({ expenses }) => {


  const upcomingExpenses = expenses.filter(expense => expense.balance > 0)


  return (
    <React.Fragment>
      <Title>Upcoming Payments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Pay To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Payment Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.dateDue.substring(0, 10)}</TableCell>
              <TableCell>{expense.category[0].toUpperCase() + expense.category.substring(1)}</TableCell>
              <TableCell>{expense.companyName}</TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
              <TableCell align="right">{convertToUSD(expense.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default UpcomingPayments