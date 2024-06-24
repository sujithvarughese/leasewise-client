import classes from "./styles/FinanceUnitDetails.module.css";

const FinanceDetailsRow = ({ label, display }) => {

    return (

        <div className={classes.tr}>
            <div className={classes.td}>{label}</div>
            <div className={classes.td}>{display}</div>
        </div>

    );
};

export default FinanceDetailsRow;