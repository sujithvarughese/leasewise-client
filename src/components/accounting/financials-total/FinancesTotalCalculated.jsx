import classes from "../../../pages/styles/FinancesTotal.module.css";
import  { convertToUSD, totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utilities/financeCalculations.js";

const FinancesTotalCalculated = ({ unitFinances, selectedTerm }) => {

    return (
        <tr>
            <td></td>
            <td className={classes.totals}>
                {convertToUSD(totalMortgage(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalPropertyTax(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalInsurance(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalHoa(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalRent(unitFinances, selectedTerm))}
            </td>
        </tr>
    );
};


export default FinancesTotalCalculated;