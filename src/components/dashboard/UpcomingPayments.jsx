import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

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

export default function UpcomingPayments() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}