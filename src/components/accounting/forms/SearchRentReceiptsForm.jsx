import classes from "./styles/RentReceiptForms.module.css";
import {Button, Card, Form, Select} from "../../../ui/index.js";
import { axiosDB } from "../../../utils/axios.js";
import FormRow from "../../../ui/FormRow.jsx";
import {useState} from "react";

const SearchRentReceiptsForm = ({ fetchRentReceipts }) => {

    const date = new Date()
    const [year, setYear] = useState(date.toLocaleString('en-us',{ year:'numeric' }))

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchRentReceipts(year)
    }

    return (

        <Card>
            <div className={classes.content}>
                <Form className={classes.form} title="Search" onSubmit={handleSubmit}>
                    <div className={classes.year}>
                        <FormRow label="Year">
                            <Select
                                type="text"
                                name="year"
                                list={years}
                                onChange={(e)=>setYear(e.target.value)}
                            ></Select>
                        </FormRow>
                    </div>
                    <div className={classes.button}>
                        <Button type="submit">Get Receipts</Button>
                    </div>
                </Form>
            </div>
        </Card>

    );
};


const years = ["2023", "2022", "2021", "2020"]
export default SearchRentReceiptsForm;