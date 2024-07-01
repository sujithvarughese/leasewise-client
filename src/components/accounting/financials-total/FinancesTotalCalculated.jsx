import  { convertToUSD, totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utilities/financeCalculations.js";
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Typography } from '@mui/material'

const FinancesTotalCalculated = ({ unitFinances, selectedTerm }) => {

    return (
        <TableRow sx={{ fontWeight: "600"}}>
            <TableCell></TableCell>
            <TableCell>
              <Typography>{convertToUSD(totalMortgage(unitFinances, selectedTerm))}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{convertToUSD(totalPropertyTax(unitFinances, selectedTerm))}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{convertToUSD(totalInsurance(unitFinances, selectedTerm))}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{convertToUSD(totalHoa(unitFinances, selectedTerm))}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{convertToUSD(totalRent(unitFinances, selectedTerm))}</Typography>
            </TableCell>
        </TableRow>
    );
};


export default FinancesTotalCalculated;