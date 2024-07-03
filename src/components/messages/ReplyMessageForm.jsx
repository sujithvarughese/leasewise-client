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
import { Textarea } from '@mui/joy'
import useSubmit from '../../hooks/useSubmit.js'

const ReplyMessageForm = ({ message, closeReply, getMessages }) => {

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
			recipient: message.sender._id,
			subject: message.subject,
			body: data.body,
			previousMessage: message._id
		}
		submitForm({ method: "POST", url: "/messages", requestConfig: msg })
	}

	useEffect(() => {
		console.log(response)
	}, [response])
	return (
		<div className={classes.container}>
			<Card>
				<form onSubmit={handleSubmit}>
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

						<Button type="submit">{buttonText}</Button>
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