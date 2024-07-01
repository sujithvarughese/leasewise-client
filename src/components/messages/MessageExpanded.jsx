import MessageActions from './MessageActions.jsx'
import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const MessageExpanded = ({ message, messages, toggleFlag, userID, markMessageUnread, showCreateReply, setShowCreateReply, getMessages, setMobileExpanded }) => {

	const { date, sender, recipient, subject, body } = message

	const [previousMessages, setPreviousMessages] = useState([])

	const currentMessageRef = useRef()



	useEffect(() => {
		const previousMessagesArray = []
		let currentMessage = message
		while (currentMessage.previousMessage) {
			const previousMessage = messages.find(message => message._id === currentMessage.previousMessage)
			previousMessagesArray.push(previousMessage)
			currentMessage = previousMessage
		}
		setPreviousMessages(previousMessagesArray)

		if (previousMessagesArray.length > 6) {
			currentMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}, [message])

	return (
		<Box sx={{ overflowY: "scroll" }}>
			{
			<MessageActions
				message={message}
				reply={()=>setShowCreateReply(true)}
				toggleFlag={toggleFlag}
				markMessageUnread={markMessageUnread}
				setMobileExpanded={setMobileExpanded}
			/>
			}

				<Box>
					{
					previousMessages.length > 0 &&
					<div>
						{
							previousMessages.map(previousMessage => {
								return (
									<Grid display="grid" key={previousMessage._id}>
										<MessageContents
											lastName={previousMessage.sender.lastName}
											firstName={previousMessage.sender.firstName}
											senderID={previousMessage.sender._id}
											date={previousMessage.date}
											subject={previousMessage.subject}
											body={previousMessage.body}
										/>
									</Grid>
								)
							}).reverse()
						}
					</div>
					}
					<div ref={currentMessageRef}>
						<MessageContents
							lastName={sender.lastName}
							firstName={sender.firstName}
							senderID={sender._id}
							date={date}
							subject={subject}
							body={body}
						/>
					</div>

					<div>
						<ReplyMessageForm
							message={message}
							closeReply={()=>setShowCreateReply(false)}
							getMessages={getMessages}
						/>
					</div>
				</Box>

		</Box>
	);
};

const markMessageRead = async (message) => {
	try {
		const response = await axiosDB.post("/messages/read", message)
		const { messages } = response.data
		// messages = { inbox, outbox }
		return messages
	} catch (error) {
		throw new Error(error)
	}
}

export default MessageExpanded;