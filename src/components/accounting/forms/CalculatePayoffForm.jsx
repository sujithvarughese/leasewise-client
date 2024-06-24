import classes from "./styles/FinanceCalculationForms.module.css";
import { calculatePayoff } from "../../../utils/financeCalculations.js";
import { Input, Form, Button } from "../../../ui/index.js";
import {useEffect, useState} from "react";
import FormRow from "../../../ui/FormRow.jsx";

const CalculatePayoffForm = ({ principal, apr, termYears, paymentsMade, setPayoffAmount }) => {

    const [values, setValues] = useState({
        principal: principal,
        apr: apr,
        termYears: termYears,
        paymentsMade: paymentsMade
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const payoff = calculatePayoff(values.principal, values.apr, values.termYears, values.paymentsMade)
        setPayoffAmount(payoff)
    }

    useEffect(() => {
        setValues({ ...values, principal: principal, apr: apr, termYears: termYears, paymentsMade: paymentsMade })
    }, [principal, apr, termYears, paymentsMade]);

    return (
        <div className={classes.container}>
        <Form onSubmit={handleSubmit}  title="Calculate Mortgage Payoff">
                <FormRow label="Principal">
                    <Input
                        type="number"
                        name="principal"
                        value={values.principal}
                        onChange={handleChange}
                    ></Input>
                </FormRow>

                <FormRow label="APR">
                    <Input
                        type="number"
                        name="apr"
                        value={values.apr}
                        onChange={handleChange}
                    ></Input>
                </FormRow>

                <FormRow label="Term Length (Years)">
                    <Input
                        type="number"
                        name="termYears"
                        value={values.termYears}
                        onChange={handleChange}
                    ></Input>
                </FormRow>

                <FormRow label="Total Payments Made">
                    <Input
                        type="number"
                        name="paymentsMade"
                        value={values.paymentsMade}
                        onChange={handleChange}
                    ></Input>
                </FormRow>
            <div className={classes.button}>
                <Button type="submit">Get Payoff Amount</Button>
            </div>
        </Form>
        </div>
    );
};

export default CalculatePayoffForm;