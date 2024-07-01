import classes from "./styles/FinanceCalculationForms.module.css";
import React, {useEffect, useState} from "react";
import {calculateProfit} from "../../../utilities/financeCalculations.js";
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import StyledSelect from '../../ui/StyledSelect.jsx'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

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
        <Container>
          <Typography>Calculate Profit</Typography>
          <CssBaseline />
          <Toolbar />
            <form onSubmit={handleSubmit}>
              <TextField name="annualPropertyTax" label="Annual Property Tax" />
              <TextField name="annualInsurancePremium" label="Annual Insurance Premium" />
              <TextField name="annualHoa" label="Annual Assosiation Fees" />
              <TextField name="monthlyRent" label="Monthly Rent Income" />
              <StyledSelect name="term" label="Term"
                            options={[{ label: "Monthly", value: 1 }, { label: "Annual", value: 12 }]} minWidth={120}/>
              <Button type="submit">Calculate Monthly Profit</Button>
            </form>
        </Container>
    );
};

export default CalculateProfitForm;