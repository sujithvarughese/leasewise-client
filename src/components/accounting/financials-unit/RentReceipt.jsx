import classes from "./styles/RentReceipt.module.css"
import santaSignature from "../../../assets/images/santa-signature.jpeg"
const RentReceipt = ({ date, amountPaid, balance, houseNumber, street, apartmentNumber, city, state, zip, lastName, firstName }) => {

	return (
		<div className={classes.rentReceipt}>

			<div className={classes.title}>
				Rent Receipt
			</div>

			<div className={classes.dateContainer}>
				<div>
					Date of Payment:
				</div>
				<div className={classes.value}>
					{date}
				</div>
			</div>

			<div className={classes.col1}>
				<div className={classes.nameContainer}>
					Received From:
					<div className={classes.name}>
						{firstName} {lastName}
					</div>
				</div>

				<div className={classes.addressContainer}>
					<div className={classes.address}>
						<div>
							{houseNumber} {street} {apartmentNumber}
						</div>
						<div>
							{city}, {state} {zip}
						</div>
					</div>
				</div>

			</div>

			<div className={classes.col2}>

				<div className={classes.amountContainer}>
					<div>
						Paid:
					</div>
					<div>
						{amountPaid}
					</div>
				</div>

				<div className={classes.balanceContainer}>
					<div>
						Balance:
					</div>
					<div>
						{balance}
					</div>
				</div>

				<div>
					<img src={santaSignature} alt="santa-signature" className={classes.image}/>
					<div className={classes.signature}>
						Landlord's Signature
					</div>

				</div>
			</div>






		</div>
	);
};

export default RentReceipt;