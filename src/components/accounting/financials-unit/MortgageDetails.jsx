import classes from "./styles/FinanceUnitDetails.module.css";
import {CalculateMonthlyPaymentForm, CalculatePayoffForm} from "../../index.js";
import {useState} from "react";
import { convertToUSD } from "../../../utils/financeCalculations.js";
import {Button, Input, ButtonPlain} from "../../../ui/index.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";

const MortgageDetails = ({ updateUnitFinance, mortgage }) => {

    const { bank, principal, interest, term, paymentsMade } = mortgage

    const [editMode, setEditMode] = useState(!(bank && principal && interest && term && paymentsMade))

    const [values, setValues] = useState({
        bank: bank || "",
        principal: principal || 0,
        interest: interest || 0,
        term: term || 0,
        paymentsMade: paymentsMade || 0
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const cancel = () => {
        setValues({
            bank: bank,
            principal: principal,
            interest: interest,
            term: term,
            paymentsMade: paymentsMade

        })
        setEditMode(false)
    }
    const update = () => {
        updateUnitFinance({ mortgage: values })
        setEditMode(false)
    }
    const [payoffAmount, setPayoffAmount] = useState("")
    const [monthlyPayment, setMonthlyPayment] = useState("")

    return (
        <div className={classes.container}>
            <div className={classes.table}>
                <div className={classes.head}>
                    <div className={classes.title}>
                        Mortgage
                    </div>
                    <div className={classes.editDesktop}>
                        {!editMode && <ButtonPlain fontSize="14px" onClick={()=>setEditMode(!editMode)}>[Edit]</ButtonPlain>}
                    </div>
                </div>
                <div className={classes.body}>
                    <FinanceDetailsRow
                        label="Bank"
                        display={(bank && !editMode) ? values.bank
                            :
                            <Input
                                name="bank"
                                type="text"
                                value={values.bank}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Principal"
                        display={(principal && !editMode) ? convertToUSD(values.principal)
                            :
                            <Input
                                name="principal"
                                type="number"
                                value={values.principal}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Interest"
                        display={(interest && !editMode) ? `${values.interest}%`
                            :
                            <Input
                                name="interest"
                                type="text"
                                value={values.interest}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Term (Years)"
                        display={(term && !editMode) ? values.term
                            :
                            <Input
                                name="term"
                                type="number"
                                value={values.term}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Payments Made"
                        display={(paymentsMade && !editMode) ? values.paymentsMade
                            :
                            <Input
                                name="paymentsMade"
                                type="number"
                                value={values.paymentsMade}
                                onChange={handleChange}
                            />
                        }
                    />
                    {
                        editMode &&
                        <div className={classes.buttons}>
                            <Button onClick={update}>Update</Button>
                            <Button onClick={cancel}>Cancel</Button>
                        </div>
                    }

                </div>
            </div>
            <div className={classes.editMobile}>
                {!editMode && <Button onClick={()=>setEditMode(!editMode)}>Edit</Button>}
            </div>
            {
                bank && principal && interest && term &&

                <div className={classes.calc}>
                    <div className={classes.calcPayment}>
                        <CalculateMonthlyPaymentForm
                            principal={principal}
                            apr={interest}
                            termYears={term}
                            setMonthlyPayment={setMonthlyPayment}
                        />
                        {
                            monthlyPayment &&
                            <div className={classes.result}>
                                Monthly Payment: {convertToUSD(monthlyPayment)}
                            </div>
                        }
                    </div>
                    <div className={classes.calcPayoff}>
                        <CalculatePayoffForm
                            principal={principal}
                            apr={interest}
                            termYears={term}
                            paymentsMade={paymentsMade}
                            setPayoffAmount={setPayoffAmount}
                        />
                        {
                            payoffAmount &&
                            <div className={classes.result}>
                                Payoff Amount: {convertToUSD(payoffAmount)}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>

    );
};

export default MortgageDetails;