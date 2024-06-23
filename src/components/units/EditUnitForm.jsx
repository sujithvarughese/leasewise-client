import classes from "./styles/EditUnitForm.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {axiosDB} from "../../utilities/axios.js";
import { Input, Select } from '@mui/material'
import Button from '@mui/material/Button'

const EditUnitForm = ({ cancel, unit }) => {

	const [values, setValues] = useState(unit)
	const [buttonText, setButtonText] = useState("Save")
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const msg = await editUnit(values)
			if (msg === 'success') {
				setButtonText("Saved!")
			} else {
				setButtonText("Error")
			}
			setTimeout(() => {
				// navigate back to units page to render changes
				navigate("/units");
				// close form
				cancel()
			}, 1000)
		} catch (error) {

			throw new Error(error)
		}
	}

	return (
		<div className={classes.container}>
		<form onSubmit={handleSubmit}>
			<div className={classes.form}>
				<div className={classes.address}>
					<div className={classes.addressLine1}>
						<div className={classes.id}>
							<Input
								htmlFor="unitID"
								placeholder="UNIT"
								type="text"
								name="unitID"
								value={values.unitID}
								onChange={handleChange}
							></Input>
						</div>
						<div className={classes.street}>
							<Input
								htmlFor="street"
								placeholder="STREET"
								type="text"
								name="street"
								value={values.street}
								onChange={handleChange}
							></Input>
						</div>
					</div>

					<div className={classes.addressLine2}>
						<Input
							htmlFor="city"
							placeholder="CITY"
							type="text"
							name="city"
							value={values.city}
							onChange={handleChange}
						></Input>
						<Select
							type="text"
							name="state"
							list={states}
							value={values.state}
							onChange={handleChange}
						></Select>
						<Input
							htmlFor="zip"
							placeholder="ZIP"
							type="text"
							name="zip"
							value={values.zip}
							onChange={handleChange}
						></Input>
					</div>
				</div>
				<div className={classes.buttons}>
					<Button>{buttonText}</Button>
					<Button onClick={cancel}>Cancel</Button>
				</div>
			</div>
		</form>
		</div>

	);
};
const editUnit = async (updatedUnit) => {
	try {
		const response = await axiosDB.patch("/units", updatedUnit)
		const { msg } = response.data
		return msg
	} catch (error){
		console.log(error);
	}
}
const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default EditUnitForm;