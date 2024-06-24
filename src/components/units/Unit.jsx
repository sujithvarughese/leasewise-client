import classes from "./styles/Unit.module.css";
import { EditUnitForm, } from "../";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { convertToUSD } from "../../utilities/financeCalculations.js";
import { BiMessageSquareEdit } from "react-icons/bi"
import { ImUserPlus } from "react-icons/im";
import { MdOutgoingMail } from "react-icons/md";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'


const Unit = ({ unit }) => {

	const { houseNumber, street, city, apartmentNumber, state, zip, image, bedrooms, bathrooms, tenant, user } = unit

	// state functions to hide and show forms
	const [showEditUnitForm, setShowEditUnitForm] = useState(false)
	const [showCreateUserForm, setShowCreateUserForm] = useState(false)
	const [showEditUserForm, setShowEditUserForm] = useState(false)
	const [showMessageForm, setShowMessageForm] = useState(false)

	return (
			<Paper>
				<div className={classes.content}>
					{/* clicking image or address navigates to FinancesUnit */}
					<NavLink
						to={{ pathname: `../accounting/${unit._id }`}}
						state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
					>
						<img src={image} alt="img" className={classes.image}/>
					</NavLink>

					<div className={classes.info}>
						{ showEditUnitForm && <EditUnitForm cancel={()=>setShowEditUnitForm(false)} unit={unit}/> }
						{ showEditUserForm && <EditUserForm cancel={()=>setShowEditUserForm(false)} userID={user} tenant={tenant}/> }
						{
							!showEditUnitForm && !showEditUserForm &&
								<Stack>
									<NavLink
										to={{ pathname: `../accounting/${unit._id }`}}
										state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
										className={classes.link}
									>

										<Typography>{houseNumber} {street} {apartmentNumber}</Typography>
									</NavLink>
									<Typography>{city}, {state} {zip}</Typography>
									{ /*<Button onClick={()=>setShowEditUnitForm(true)} fontSize="14px">[Edit]</Button> */}
								</Stack>
						}
						{
							user && !showEditUserForm && !showEditUnitForm &&
							<div className={classes.userContainer}>
								<div className={classes.tenant}>

									<Typography>Tenant: {tenant.firstName} {tenant.lastName}</Typography>
									<Typography>{tenant.email}</Typography>
									<Typography>{tenant.phone}</Typography>
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
								Rent: {convertToUSD(tenant.rent)}
							</div>
						}

					</div>
					{// if occupied show message user icon, else show create user button
					user ?
					<Button onClick={()=>setShowMessageForm(prevState => !prevState)} fontSize="42px">
						<MdOutgoingMail />
					</Button>
					:
					<Button onClick={()=>setShowCreateUserForm(true)} fontSize="48px">
						<ImUserPlus />
					</Button>
					}
				</div>

				<div className={classes.forms}>
					{/* forms open when state toggled */}

					{/* showCreateUserForm && <CreateUserForm closeForm={()=>setShowCreateUserForm(false)} unitID={unit._id}/> */}

					{/* showMessageForm &&
						<CreateMessageForm
							cancel={()=>setShowMessageForm(false)}
							addressBook={[{
								text: `${tenant.lastName}, ${tenant.firstName}`,
								value: user
							}]}
						/>
					*/}
				</div>
			</Paper>

	);
};

export default Unit;