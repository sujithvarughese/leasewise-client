import MessageActions from './MessageActions.jsx'
import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
const MessageExpanded = ({
	expandedConversation,
	messages,
	toggleFlag,
	userID,
	markMessageUnread,
	showCreateReply,
	setShowCreateReply,
	setExpandedMessage,
	getMessages,
	closeExpanded
}) => {

	const [currentConversation, setCurrentConversation] = useState([])
	const [otherUser, setOtherUser] = useState(null)

	useEffect(() => {
		getMessages()
	}, [currentConversation])

	const fetchCurrentConversation = async (messageID) => {
		try {
			const response = await axiosDB(`/messages/previous/${messageID}`)
			const { previousMessages } = response.data
			setCurrentConversation(previousMessages)
		} catch (error) {
			throw new Error(error)
		}
	}

	const getOtherUser = () => {
		if (expandedConversation.sender._id === userID) {
			setOtherUser(expandedConversation.recipient)
		} else {
			setOtherUser(expandedConversation.sender)
		}
	}

	const deleteMessage = async () => {
		try {
			await axiosDB.delete(`/messages/${expandedConversation._id}`)
			const updatedConversation = currentConversation.filter(item => item._id !== expandedConversation._id)
			setCurrentConversation(updatedConversation)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		fetchCurrentConversation(expandedConversation._id)
		getOtherUser()
		return () => setCurrentConversation([])
	}, [expandedConversation])


/*
	useEffect(() => {
		const previousMessagesArray = []
		let currentMessage = message
		previousMessagesArray.push(currentMessage)
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

	*/

	return (
		<Box sx={{ px: 3 }}>
			{<MessageActions
				message={expandedConversation}
				reply={()=>setShowCreateReply(true)}
				toggleFlag={toggleFlag}
				markMessageUnread={markMessageUnread}
				closeExpanded={closeExpanded}
			/>}
			<Box>
				{currentConversation?.length > 0 &&
				<Grid display="grid" gap={2}>
					{currentConversation?.map(message =>
					<MessageContents
						key={message._id}
						lastName={message.sender.lastName}
						firstName={message.sender.firstName}
						senderID={message.sender._id}
						date={message.date}
						subject={message.subject}
						body={message.body}
						headNode={message.headNode}
						otherUser={otherUser}
						deleteMessage={deleteMessage}
					/>).reverse()}
				</Grid>
				}
				<ReplyMessageForm
					message={expandedConversation}
					otherUser={otherUser}
					closeReply={()=>setShowCreateReply(false)}
					getMessages={getMessages}
					setCurrentConversation={setCurrentConversation}
					currentConversation={currentConversation}
					setExpandedMessage={setExpandedMessage}
				/>
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