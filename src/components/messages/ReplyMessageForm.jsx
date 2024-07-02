import classes from "./styles/ReplyMessageForm.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utilities/axios.js";
import { TfiClose } from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import Card from '@mui/material/Card'
import { Form } from 'formik'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import MessageForm from '../forms/MessageForm.jsx'
import { Textarea } from '@mui/joy'

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
			<Card>
				<form onSubmit={handleSubmit}>
					<div className={classes.form}>
						<Textarea
							name="body"
							placeholder="Create Message"
							minRows={2}
							sx={{
								border: "none",
								'--Textarea-focusedInset': 'var(--any, )',
								'--Textarea-focusedThickness': '0.25rem',
								'--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
								'&::before': {
									transition: 'box-shadow .15s ease-in-out',
								},
								'&:focus-within': {
									borderColor: '#86b7fe',
								},
							}}
						/>
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