import classes from "./styles/Unit.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { convertToUSD } from "../../utilities/financeCalculations.js";
import { BiMessageSquareEdit } from "react-icons/bi"
import { ImUserPlus } from "react-icons/im";
import { MdOutgoingMail } from "react-icons/md";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { CardMedia, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'


const UnitCoverListMode = ({
	_id,
	houseNumber,
	street,
	city,
	apartmentNumber,
	state,
	zip,
	image,
	bedrooms,
	bathrooms,
	tenant,
	user
}) => {

	// state functions to hide and show forms
	const [showMessageForm, setShowMessageForm] = useState(false)

	const navigate = useNavigate()
	const navigateToUnit = () => {
		navigate(`/unit/${_id}`, { state: _id })
	}
	return (
			<Card>
				<Grid container alignItems="center">
					{/* clicking image or address navigates to FinancesUnit */}

					<Grid item xs={3}>
						<Button onClick={navigateToUnit}>
							<CardMedia
								component="img"
								image={image}
								alt={`${houseNumber} ${street}`}
								sx={{
									height: { xs: "80px", md: "150px" },
									width: { xs: "80px", md: "150px" }
								}}
							/>
						</Button>
					</Grid>


					<Grid item xs={6} lg={7}>
						<Stack>
							<Box>
								<Button onClick={navigateToUnit} sx={{ p: 0}}>
									<Typography whiteSpace="nowrap" overflop="clip" textOverflow="ellipsis">{houseNumber} {street} {apartmentNumber}</Typography>
								</Button>
							</Box>
							<Typography>{city}, {state} {zip}</Typography>
						</Stack>
						{
						user &&
						<Box>
							<Typography fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.lastName}, {tenant?.firstName} </Typography>
							<Typography fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.email}</Typography>
							<Typography fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.phone}</Typography>
						</Box>
						}
					</Grid>

					<Grid item xs={2}>
						<Typography fontSize={{ xs: "12px", sm: "16px" }}>
							{bedrooms}-br / {bathrooms}-bath
						</Typography>
						{
							user &&
							<Typography fontSize={{ xs: "12px", sm: "16px" }}>
								Rent: {convertToUSD(tenant?.rent)}
							</Typography>
						}
					</Grid>
				</Grid>
			</Card>

	);
};

export default UnitCoverListMode;