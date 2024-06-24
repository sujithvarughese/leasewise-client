import classes from "../../../pages/styles/FinancesTotal.module.css";
import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment, convertToUSD } from "../../../utilities/financeCalculations.js";
import {NavLink} from "react-router-dom";

const FinancesTotalUnitValues = ({ unitFinance, selectedTerm, removeUnit }) => {

    const { unitID, financeID, houseNumber, street, apartmentNumber, city, state, zip, tenant, user } = unitFinance
    const { principal, interest, term } = unitFinance.mortgage
    return (

        <tr className={classes.tr}>
            <td>
                <div className={classes.addressCol}>
                    <div
                        className={classes.remove}
                        onClick={()=>removeUnit(unitFinance.financeID)}
                    >
                        <IoRemoveCircle />
                    </div>

                    <NavLink
                        to={{ pathname: `../accounting/${unitID}`}}
                        state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
                        className={classes.link}
                    >
                        {houseNumber} {street} {apartmentNumber}
                    </NavLink>

                </div>


            </td>
            <td>
                {convertToUSD((calculateMonthlyPayment(principal, interest, term)) * selectedTerm)}
            </td>
            <td>
                {convertToUSD(unitFinance.propertyTax * selectedTerm)}
            </td>
            <td>
                {convertToUSD(unitFinance.insurance * selectedTerm)}
            </td>
            <td>
                {convertToUSD(unitFinance.hoa * selectedTerm)}
            </td>
            <td>
                {convertToUSD(unitFinance.rent * selectedTerm)}
            </td>
        </tr>
    );
};

export default FinancesTotalUnitValues;