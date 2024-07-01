import {useEffect, useState} from "react";

import { useLoaderData } from "react-router-dom";
import { axiosDB } from "../utilities/axios.js";
import { UnitCoverListMode, SearchUnits, CreateUnitForm } from "../components";
import UnitCoverGalleryMode from '../components/units/UnitCoverGalleryMode.jsx'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Switch } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useManagementProvider } from '../context/management-context.jsx'

const Units = () => {
	// units = [{ unit }, {},...]
	const units = useLoaderData()

	// set in global state
	const { setState } = useManagementProvider()
	useEffect(() => {
		setState({ units: units })
	}, []);

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
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

					<FormControlLabel
						control={<Switch checked={!listMode} onChange={() => setListMode(!listMode)} />}
						label="Gallery Mode"
					/>



					<Stack flexDirection="row" justifyContent="space-between" alignItems="center">
						{/* Search bar */}
						<SearchUnits query={query} setQuery={setQuery} />


							<Button
								onClick={()=>setShowCreateUnitForm(!showCreateUnitForm)}
							>
								{!showCreateUnitForm ? "Create Unit" : "Hide Form"}</Button>
					</Stack>

					{showCreateUnitForm && <CreateUnitForm cancel={()=>setShowCreateUnitForm(false)}/>}


					{listMode ?
						<Stack>
							{queriedUnits?.map(unit =><UnitCoverListMode key={unit._id} {...unit}/>)}
						</Stack>
						:
						<Stack flexDirection="row" flexWrap="wrap" justifyContent="center">
							{queriedUnits?.map(unit =><UnitCoverGalleryMode key={unit._id} {...unit}/>)}
						</Stack>
					}


				</Container>
			</Box>
		</Box>




	);
};

export const unitsLoader = async () => {
	try {
		// all units
		const response = await axiosDB("/units")
		const { units } = response.data
		return units
	} catch (error) {
		throw new Error(error)
	}
}

export default Units;