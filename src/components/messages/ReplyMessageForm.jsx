import classes from "./styles/ReplyMessageForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utilities/axios.js";
import { TfiClose } from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import Card from '@mui/material/Card'
import { Form } from 'formik'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

const ReplyMessageForm = ({ message, closeReply, getMessages }) => {

	const { date } = message
	const { user } = useAuthProvider()
	// recipient is initially set to first name in address book (user has only one name in address book so default to admin)
	const [body, setBody] = useState("")
	const [buttonText, setButtonText] = useState("Send")
	const handleChange = (e) => {
		setBody(e.target.value);
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// add sender info before passing to server
		try {
			const msg = await replyMessage({
				sender: user.id,
				recipient: message.sender._id,
				subject: message.subject,
				body: body,
				previousMessage: message._id
			})
			if (msg === 'success') {
				setButtonText("Sent!")
				setBody("")
			} else {
				setButtonText("Error")
			}
			await getMessages()
			setTimeout(() => {
				// navigate back to messages to update messages display
				navigate("/messages");
				closeReply()
			}, 1000)
		} catch (error) {
			throw new Error(error)
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.cancel} onClick={closeReply}>
				< TfiClose />
			</div>
			<Card>
				<form onSubmit={handleSubmit}>
					<div className={classes.form}>
						<Typography
							placeholder="Type reply here..."
							name="body"
							value={body}
							rows="10"
							onChange={handleChange}
						></Typography>

						<div className={classes.button}>
							<Button type="submit">{buttonText}</Button>
						</div>
					</div>
				</form>
			</Card>
		</div>

	);
};

const replyMessage = async (message) => {
	try {
		const response = await axiosDB.post("/messages", message)
		const { msg } = response.data
		return msg
	} catch (error) {
		throw new Error(error)
	}
}

export default ReplyMessageForm;