import classes from "./styles/Units.module.css";
import {useEffect, useState} from "react";

import { useLoaderData } from "react-router-dom";
import { axiosDB } from "../utilities/axios.js";
import { Unit, SearchUnits, CreateUnitForm } from "../components";
import UnitCard from '../components/gallery/UnitCard.jsx'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Switch } from '@mui/material'

const Units = () => {
	// units = [{ unit }, {},...]
	const units = useLoaderData()
/*
	// set in global state
	const { setUnits } = useGlobalContext()
	useEffect(() => {
		setUnits(units)
	}, []);
*/
	// state to trigger show create unit form
	const [showCreateUnitForm, setShowCreateUnitForm] = useState(false)
	const [listMode, setListMode] = useState(false)

	// state for search function
	const [query, setQuery] = useState("")

	// filter units by search by using derived state;
	// -convert query to lower case and check if any part of the address contains the search
	const queriedUnits = units.filter(unit => {
		return (
			unit.houseNumber.toLowerCase().includes(query.toLowerCase())  ||
			unit.street.toLowerCase().includes(query.toLowerCase()) ||
			unit.apartmentNumber?.toLowerCase().includes(query.toLowerCase()) ||
			unit.city.toLowerCase().includes(query.toLowerCase()) ||
			unit.state.toLowerCase().includes(query.toLowerCase()) ||
			unit.zip.toLowerCase().includes(query.toLowerCase())
		)
	})
	// scroll to top on load
	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);
	return (
		<div className={classes.container}>

			<form>
				<label htmlFor="isChecked">Gallery Mode</label>
				<Switch id="isChecked" isChecked={!listMode} onChange={() => setListMode(!listMode)}></Switch>
			</form>


			<div className={classes.options}>

				{/* Search bar */}
				<div className={classes.search}>
					<SearchUnits query={query} setQuery={setQuery} />
				</div>
				<div>
					<Button onClick={()=>setShowCreateUnitForm(!showCreateUnitForm)}>
						{!showCreateUnitForm ? "Create Unit" : "Hide Form"}</Button>
				</div>

			</div>

			{
				// pass setState function as cancel to hide form if desired
				showCreateUnitForm && <CreateUnitForm cancel={()=>setShowCreateUnitForm(false)}/>
			}

			<div className={classes.unitContainer}>
				<div className={classes.desktop}>
					{listMode ?
						<Stack>
							{queriedUnits?.map(unit =><Unit key={unit._id} unit={unit}/>)}
						</Stack>
							:
						<Stack flexDirection="row" flexWrap="wrap">
							{queriedUnits?.map(unit =><UnitCard key={unit._id} {...unit}/>)}
						</Stack>
					}
				</div>
				<div className={classes.mobile}>
					{listMode ?
						<Stack>
							{queriedUnits?.map(unit =><Unit key={unit._id} unit={unit}/>)}
						</Stack>
						:
						<Stack flexDirection="row" flexWrap="wrap">
							{queriedUnits?.map(unit =><UnitCard key={unit._id} {...unit}/>)}
						</Stack>
					}
				</div>
			</div>

		</div>
	);
};

export const unitsLoader = async () => {
	try {
		// all units
		const response = await axiosDB("/units")
		const { units } = response.data
		console.log(units)
		return units
	} catch (error) {
		throw new Error(error)
	}
}

export default Units;