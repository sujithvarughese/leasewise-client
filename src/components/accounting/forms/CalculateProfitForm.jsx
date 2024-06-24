import classes from "./styles/FinanceCalculationForms.module.css";
import {Button, Form, Input, Select} from "../../../ui/index.js";
import {useEffect, useState} from "react";
import {calculateProfit} from "../../../utils/financeCalculations.js";
import FormRow from "../../../ui/FormRow.jsx";

const CalculateProfitForm = ({ annualPropertyTax, annualInsurancePremium, annualHoa, rent, setProfit }) => {

    const [values, setValues] = useState({
        annualPropertyTax: annualPropertyTax || "",
        annualInsurancePremium: annualInsurancePremium || "",
        annualHoa: annualHoa || "",
        monthlyRent: rent || "",
        term: 1
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const profit = calculateProfit(values.annualPropertyTax, values.annualInsurancePremium, values.annualHoa, values.monthlyRent, values.term)
        setProfit(profit)
    }

    useEffect(() => {
        setValues({ ...values, monthlyRent: rent})
    }, [rent]);

    return (
        <div className={classes.container}>
            <Form onSubmit={handleSubmit} title="Calculate Profit">
                    <FormRow label="Annual Property Tax">
                        <Input
                            type="number"
                            name="annualPropertyTax"
                            value={values.annualPropertyTax}
                            onChange={handleChange}
                        ></Input>
                    </FormRow>
                    <FormRow label="Annual Insurance Premium">
                        <Input
                            type="number"
                            name="annualInsurancePremium"
                            value={values.annualInsurancePremium}
                            onChange={handleChange}
                        ></Input>
                    </FormRow>
                    <FormRow label="Annual Assosiation Fee">
                        <Input
                            type="number"
                            name="annualHoa"
                            value={values.annualHoa}
                            onChange={handleChange}
                        ></Input>
                    </FormRow>
                    <FormRow label="Monthly Rent Income">
                        <Input
                            type="number"
                            name="monthlyRent"
                            value={values.monthlyRent}
                            onChange={handleChange}
                        ></Input>
                    </FormRow>
                    <FormRow label="Term">
                        <Select
                            name="term"
                            list={[{ text: "Monthly", value: 1 }, { text: "Annual", value: 12 }]}
                            value={values.term}
                            onChange={handleChange}
                        ></Select>
                    </FormRow>

                    <div className={classes.button}>
                        <Button type="submit">Calculate Monthly Profit</Button>
                    </div>

            </Form>
        </div>
    );
};

export default CalculateProfitForm;