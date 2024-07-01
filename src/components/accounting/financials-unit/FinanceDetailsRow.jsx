import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const FinanceDetailsRow = ({ label, display }) => {

    return (

        <TableRow>
            <TableCell>{label}</TableCell>
            <TableCell>{display}</TableCell>
        </TableRow>

    );
};

export default FinanceDetailsRow;