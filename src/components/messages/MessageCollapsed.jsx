import { TiFlag } from "react-icons/ti"
import { FcInfo } from "react-icons/fc"
import { GoDotFill } from "react-icons/go"
import { RiShareForwardFill } from "react-icons/ri"
import {useState} from "react";
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
const MessageCollapsed = ({ message, setExpandedMessage, markMessageRead, showExpanded, userID, closeReply }) => {

	const { sender, recipient, subject, body, read, flag } = message

	const currentDate = new Date(message.date)
	const date = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
	const time = currentDate.toLocaleTimeString("en-US")

	return (
		// selecting anywhere on collapsed message will open expanded message, and mark as read
		<Box
			component="button"
			border="none"
			width="100%"
			display="flex"
			position="relative"
			padding={1}
			borderRadius={1}
			gap={1}
			sx={{
				"&:hover": {
					bgcolor: "gray",
					cursor: "pointer"
				}
			}}
			onClick={() => {
				setExpandedMessage(message)
				markMessageRead(message)
				showExpanded()
				closeReply()
			}}
		>
			{/* icons dynamically render to show flag and read status */}
			<Stack>
				<Box position="absolute"  top="20%" color="dodgerblue">
					{ recipient._id === userID && !read && <GoDotFill />}
				</Box>
				<Box position="absolute" bottom="20%" color="darkorange">
					{ flag && <TiFlag /> }
				</Box>
			</Stack>

			<Stack justifyContent="flex-start" alignItems="flex-start" pl={1} width="100%">
				{userID === recipient._id ?
				<Typography fontWeight={600} whiteSpace="nowrap" overflow="clip" textOverflow="ellipsis" maxWidth="50%">
					{sender.lastName}, {sender.firstName}
				</Typography>
				:
				<Typography fontWeight={600} whiteSpace="nowrap" overflow="clip" textOverflow="ellipsis" maxWidth="50%">
					{recipient.lastName}, {recipient.firstName}
				</Typography>
				}
				<Typography
					whiteSpace="nowrap" overflow="clip" textOverflow="ellipsis">
					{subject}
				</Typography>

				<Typography
					variant="body2"
					whiteSpace="nowrap" overflow="clip" textOverflow="ellipsis" maxWidth="60%"

				>
					{body}
				</Typography>
			</Stack>


			<Stack position="absolute" right={6} top={24}>
				<Typography variant="subtitle2">
					{date}
				</Typography>
				<Typography variant="caption">
					{time}
				</Typography>
			</Stack>

		</Box>

	);
};

export default MessageCollapsed;