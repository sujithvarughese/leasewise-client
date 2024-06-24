import classes from "./styles/RentReceiptForms.module.css";
import { Form, Input, Select, Button, Card} from "../../../ui/index.js";
import { useState } from "react";
import { axiosDB } from "../../../utils/axios.js";
import FormRow from "../../../ui/FormRow.jsx";


const CreateRentReceiptForm = ({ userID, lastName, firstName, houseNumber, street, apartmentNumber, city, state, zip }) => {

	const [values, setValues] = useState({
		userID: userID,
		date: "",
		amountPaid: 0,
		balance: 0
	})

	const [buttonText, setButtonText] = useState("Create Rent Receipt")
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setValues({
			userID: userID,
			date: "",
			amountPaid: 0,
			balance: 0
		})
		const response = await createRentReceipt({...values, user: userID})
		if (response === true) {
			setButtonText("Created!")
			setTimeout(() => {
				setButtonText("Create Rent Receipt")
			}, 2000)
		}
	}
	return (
		<Card>
			<div className={classes.content}>
				<Form className={classes.form} onSubmit={handleSubmit}>
						<div className={classes.head}>
							<div className={classes.recipient}>
								<div>
									{lastName}, {firstName}
								</div>
								<div className={classes.address}>
									{houseNumber} {street} {apartmentNumber}
								</div>
								<div className={classes.address}>
									{city}, {state} {zip}
								</div>
							</div>
							<div className={classes.date}>
								<FormRow>
									<Input
										htmlFor="date"
										type="Date"
										name="date"
										value={values.date}
										onChange={handleChange}
									></Input>
								</FormRow>
							</div>
						</div>

						<div className={classes.details}>
							<FormRow label="Amount">
								<Input
									htmlFor="amountPaid"
									type="number"
									name="amountPaid"
									value={values.amountPaid}
									onChange={handleChange}
								></Input>
							</FormRow>
							<FormRow label="Balance">
								<Input
									htmlFor="balance"
									type="number"
									name="balance"
									value={values.balance}
									onChange={handleChange}
								></Input>
							</FormRow>
						</div>

						<div className={classes.button}>
							<Button type="submit">{buttonText}</Button>
						</div>


				</Form>
			</div>

		</Card>

	);
};

const createRentReceipt = async (rentReceipt) => {
	try {
		const response = await axiosDB.post("/finance/rent", rentReceipt)
		const { msg } = response.data
		if (msg === "success") {
			return true
		}
	} catch (error) {
		throw new Error(error)
	}
}
const years = ["2023", "2022", "2021", "2020"]

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

export default CreateRentReceiptForm;