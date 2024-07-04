import classes from "./styles/ReplyMessageForm.module.css";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { axiosDB } from "../../utilities/axios.js";
import { TfiClose } from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import Card from '@mui/material/Card'
import { Form } from 'formik'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import MessageForm from '../forms/MessageForm.jsx'
//import { Textarea } from '@mui/joy'
import useSubmit from '../../hooks/useSubmit.js'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const ReplyMessageForm = ({
	message,
	otherUser,
	closeReply,
	getMessages,
	setCurrentConversation,
	currentConversation,
	setExpandedMessage
}) => {

	const { date } = message
	const { user, account } = useAuthProvider()
	const { response, error, loading, submitForm } = useSubmit()
	const [buttonText, setButtonText] = useState("Send")

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = { ...Object.fromEntries(formData) }

		const msg = {
			sender: user.id,
			recipient: otherUser._id,
			subject: message.subject,
			body: data.body,
			previousMessage: message._id
		}
		submitForm({ method: "POST", url: "/messages", requestConfig: msg })
		e.currentTarget.reset()
	}

	useEffect(() => {
		if (response) {
			const updatedConversation = [response.message, ...currentConversation]
			setExpandedMessage(response.message)
			setCurrentConversation(updatedConversation)
			getMessages()
		}
	}, [response])

	return (
		<div className={classes.container}>
			<Card>
				<form onSubmit={handleSubmit}>
					<TextField
						multiline
						rows={4}
						variant="outlined"
						name="body"
						placeholder="Create Message"
						minRows={2}
						maxRows={4}
						fullWidth
					/>
					<Button type="submit">{buttonText}</Button>

				</form>
			</Card>
		</div>

	);
};



export default ReplyMessageForm;