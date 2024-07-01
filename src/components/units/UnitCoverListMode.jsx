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

				<div className={classes.content}>

					{/* clicking image or address navigates to FinancesUnit */}
					<Button onClick={navigateToUnit}>
						<CardMedia
							component="img"
							image={image}
							alt={`${houseNumber} ${street}`}
							sx={{
								height: "240px",
								width: "240px",
							}}
							/>
					</Button>

					<div className={classes.info}>

						<Stack>
							<Button onClick={navigateToUnit}
								className={classes.link}
							>
								<Typography>{houseNumber} {street} {apartmentNumber}</Typography>
							</Button>

							<Typography>{city}, {state} {zip}</Typography>
							{ /*<Button onClick={()=>setShowEditUnitForm(true)} fontSize="14px">[Edit]</Button> */}
						</Stack>

						{
						user &&
						<div className={classes.userContainer}>
							<div className={classes.tenant}>

								<Typography>Tenant: {tenant?.firstName} {tenant?.lastName}</Typography>
								<Typography>{tenant?.email}</Typography>
								<Typography>{tenant?.phone}</Typography>
							</div>
						</div>
						}

					</div>

					<div className={classes.details}>
						<div>
							{bedrooms}-br / {bathrooms}-bath
						</div>
						{
							user &&
							<div className={classes.rent}>
								Rent: {convertToUSD(tenant?.rent)}
							</div>
						}
					</div>

					{/*// if occupied show message user icon, else show create user button
					user &&
					<Button onClick={()=>setShowMessageForm(prevState => !prevState)} fontSize="42px">
						<MdOutgoingMail />
					</Button>
					*/}
				</div>


				{showMessageForm &&
					<CreateMessageForm
						cancel={()=>setShowMessageForm(false)}
						addressBook={[{
							text: `${tenant?.lastName}, ${tenant?.firstName}`,
							value: user
						}]}
					/>
				}


			</Card>

	);
};

export default UnitCoverListMode;