import classes from "./styles/EditUnitForm.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {axiosDB} from "../../utilities/axios.js";
import { ButtonGroup, Input, Select } from '@mui/material'
import Button from '@mui/material/Button'
import FormModal from '../ui/FormModal.jsx'
import useSubmit from '../../hooks/useSubmit.js'
import TextField from '@mui/material/TextField'
import StyledSelect from '../ui/StyledSelect.jsx'
import Stack from '@mui/material/Stack'

const EditUnitForm = ({ id, open, onClose }) => {

	const { response, error, loading, submitForm } = useSubmit()

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = { ...Object.fromEntries(formData), unit: id }
		submitForm({ method: "PATCH", url: "/units", requestConfig: data })
		// e.currentTarget.reset()
		onClose()
	}


	return (
		<FormModal open={open} onClose={onClose} heading="Edit Unit">
		<form onSubmit={handleSubmit}>


			<Stack gap={1}>
				<div className={classes.addressLine1}>
					<TextField label="Unit" type="text" name="unitID"></TextField>
					<TextField label="street" type="text" name="street"></TextField>
				</div>

				<div className={classes.addressLine2}>
					<TextField label="City" type="text" name="city"></TextField>
					<StyledSelect name="state" options={stateOptions} label="State"></StyledSelect>
					<TextField label="zip" type="text" name="zip"></TextField>
				</div>


			</Stack>

			<ButtonGroup sx={{ display: "flex", gap: "36px", justifyContent: "spaceAround"}}>
				<Button type="submit" loading={loading}>Submit</Button>
				<Button onClick={onClose}>Cancel</Button>
			</ButtonGroup>

		</form>
		</FormModal>

	);
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const stateOptions = states.map(state => {
	return { label: state, value: state }
})
export default EditUnitForm;