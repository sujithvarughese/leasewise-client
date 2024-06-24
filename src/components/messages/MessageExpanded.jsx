import classes from "./styles/MessageExpanded.module.css";
import MessageActions from './MessageActions.jsx'
import MessageContents from './MessageContents.jsx'
import ReplyMessageForm from './ReplyMessageForm.jsx'
import { axiosDB } from "../../utilities/axios.js";
import {useEffect, useRef, useState} from "react";

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

		currentMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}, [message])

	return (
		<div className={classes.container}>

			{
				<MessageActions
					message={message}
					reply={()=>setShowCreateReply(true)}
					toggleFlag={toggleFlag}
					markMessageUnread={markMessageUnread}
					setMobileExpanded={setMobileExpanded}
				/>
			}

			<div className={classes.content}>

				<div className={classes.messages}>
					{
						showCreateReply &&
						<div className={classes.replyForm}>
							<ReplyMessageForm
								message={message}
								closeReply={()=>setShowCreateReply(false)}
								getMessages={getMessages}
							/>
						</div>
					}
					{
						previousMessages.length > 0 &&
						<div className={classes.previousMessages}>
							{
								previousMessages.map(previousMessage => {
									return (
										<div className={classes.message} key={previousMessage._id}>
											<MessageContents
												lastName={previousMessage.sender.lastName}
												firstName={previousMessage.sender.firstName}
												senderID={previousMessage.sender._id}
												date={previousMessage.date}
												subject={previousMessage.subject}
												body={previousMessage.body}
											/>
										</div>
									)
								}).reverse()
							}
						</div>
					}
					<div   ref={currentMessageRef} className={classes.message}>
						<MessageContents
							lastName={sender.lastName}
							firstName={sender.firstName}
							senderID={sender._id}
							date={date}
							subject={subject}
							body={body}
						/>
					</div>
					<div className={classes.replyForm}>
						<ReplyMessageForm
							message={message}
							closeReply={()=>setShowCreateReply(false)}
							getMessages={getMessages}
						/>
					</div>




				</div>
			</div>
		</div>
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