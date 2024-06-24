import classes from "./styles/FinanceCalculationForms.module.css";
import {useEffect, useState} from "react";
import { calculateMonthlyPayment}  from "../../../utils/financeCalculations.js";
import {Button, Form, Input} from "../../../ui/index.js";
import FormRow from "../../../ui/FormRow.jsx";

const CalculateMonthlyPaymentForm = ({ principal, apr, termYears, setMonthlyPayment}) => {

    const [values, setValues] = useState({
        principal: principal,
        apr: apr,
        termYears: termYears,
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const payment = calculateMonthlyPayment(values.principal, values.apr, values.termYears)
        setMonthlyPayment(payment)
    }
    useEffect(() => {
        setValues({ ...values, principal: principal, apr: apr, termYears: termYears })
    }, [principal, apr, termYears]);

    return (
        <div className={classes.container}>
            <Form onSubmit={handleSubmit} title="Calculate Monthly Payment">
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
                <div className={classes.button}>
                    <Button type="submit">Get Monthly Payment</Button>
                </div>
            </Form>
        </div>
    );
};

export default CalculateMonthlyPaymentForm;