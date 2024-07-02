import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment, convertToUSD } from "../../../utilities/financeCalculations.js";
import {NavLink} from "react-router-dom";
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

const FinancesTotalUnitValues = ({ unitFinance, selectedTerm, removeUnit }) => {

    const { unitID, financeID, houseNumber, street, apartmentNumber, city, state, zip, tenant, user } = unitFinance
    const { principal, interest, term } = unitFinance.mortgage
    return (

        <TableRow>
            <TableCell>
                <Box>
                  {/*<IconButton onClick={()=>removeUnit(unitFinance.financeID)}>
                        <IoRemoveCircle />
                    </IconButton>*/}

                    <NavLink
                        to={{ pathname: `../unit/${unitID}`}}
                        state={unitID}
                        style={{ fontWeight: "600"}}
                    >
                        {houseNumber} {street} {apartmentNumber}
                    </NavLink>
                </Box>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD((calculateMonthlyPayment(principal, interest, term)) * selectedTerm)}
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.propertyTax * selectedTerm)}
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.insurance * selectedTerm)}
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.hoa * selectedTerm)}
            </TableCell>

            <TableCell  sx={{ display: { md: "none" }}}>
              {convertToUSD(calculateMonthlyPayment(principal, interest, term) * selectedTerm + unitFinance.propertyTax * selectedTerm + unitFinance.insurance * selectedTerm)}
            </TableCell>

            <TableCell>
                {convertToUSD(unitFinance.rent * selectedTerm)}
            </TableCell>
        </TableRow>
    );
};

export default FinancesTotalUnitValues;