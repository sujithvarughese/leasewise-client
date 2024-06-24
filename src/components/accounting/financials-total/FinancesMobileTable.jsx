import classes from "./styles/FinancesMobileTable.module.css";
import { NavLink } from "react-router-dom";
import {
    calculateMonthlyPayment,
    totalHoa,
    totalInsurance,
    totalMortgage, totalProfit,
    totalPropertyTax,
    totalRent
} from "../../../utilities/financeCalculations.js";
import {IoRemoveCircle} from "react-icons/io5";
import { convertToUSD } from "../../../utilities/financeCalculations.js";
import {useState} from "react";
import Button from '@mui/material/Button'

const FinancesMobileTable = ({ unitFinances, selectedTerm, removeUnit }) => {

    const [viewTotal, setViewTotal] = useState(false)

    return (
        <div className={classes.container}>

            <div className={classes.links}>
                <Button
                    active={!viewTotal}
                    fontSize="24px"
                    onClick={()=>setViewTotal(false)}
                >Details
                </Button>
                <Button
                    active={viewTotal}
                    fontSize="24px"
                    onClick={()=>setViewTotal(true)}
                >Total
                </Button>
            </div>

            {
                !viewTotal ?
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            <th>Address</th>
                            <th>Finances</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            unitFinances.map(unitFinance => {
                                const { unitID, financeID, houseNumber, street, apartmentNumber, city, state, zip, tenant, user } = unitFinance
                                const { principal, interest, term } = unitFinance.mortgage
                                return (
                                    <tr className={classes.values} key={unitFinance.financeID}>
                                        <td className={classes.addressCol}>
                                            <NavLink
                                                to={{ pathname: `../accounting/${unitID}`}}
                                                state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
                                                className={classes.link}
                                            >
                                                {houseNumber} {street} {apartmentNumber}
                                            </NavLink>
                                            <div>
                                                <Button
                                                    onClick={()=>removeUnit(unitFinance.financeID)}
                                                    fontSize="32px"
                                                    color="darkred"
                                                ><IoRemoveCircle />
                                                </Button>
                                            </div>


                                        </td>
                                        <td className={classes.finances}>
                                            <div className={classes.tr}>
                                                <div className={classes.td}>
                                                    Mortgage
                                                </div>
                                                <div className={classes.td}>
                                                    {convertToUSD((calculateMonthlyPayment(principal, interest, term)) * selectedTerm)}
                                                </div>
                                            </div>
                                            <div className={`${classes.tr} ${classes.shaded}`}>
                                                <div className={classes.td}>
                                                    Tax
                                                </div>
                                                <div className={classes.td}>
                                                    {convertToUSD(unitFinance.propertyTax * selectedTerm)}
                                                </div>
                                            </div>
                                            <div className={classes.tr}>
                                                <div className={classes.td}>
                                                    Insurance
                                                </div>
                                                <div className={classes.td}>
                                                    {convertToUSD(unitFinance.insurance * selectedTerm)}
                                                </div>
                                            </div>
                                            <div className={`${classes.tr} ${classes.shaded}`}>
                                                <div className={classes.td}>
                                                    HOA
                                                </div>
                                                <div className={classes.td}>
                                                    {convertToUSD(unitFinance.hoa * selectedTerm)}
                                                </div>
                                            </div>
                                            <div className={classes.tr}>
                                                <div className={classes.td}>
                                                    Rent
                                                </div>
                                                <div className={classes.td}>
                                                    {convertToUSD(unitFinance.rent * selectedTerm)}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    :
                    <div className={classes.total}>
                        <div className={classes.title}>
                            Combined Finances
                        </div>
                        <div className={classes.body}>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    Mortgage
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalMortgage(unitFinances, selectedTerm))}
                                </div>
                            </div>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    Taxes
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalPropertyTax(unitFinances, selectedTerm))}
                                </div>
                            </div>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    Insurance
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalInsurance(unitFinances, selectedTerm))}
                                </div>
                            </div>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    HOA
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalHoa(unitFinances, selectedTerm))}
                                </div>
                            </div>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    Rent
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalRent(unitFinances, selectedTerm))}
                                </div>
                            </div>
                            <div className={classes.tr}>
                                <div className={classes.td}>
                                    Profit
                                </div>
                                <div className={classes.td}>
                                    {convertToUSD(totalProfit(unitFinances, selectedTerm))}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default FinancesMobileTable;