import { RiReplyLine } from "react-icons/ri"
import { TiFlag, TiFlagOutline } from "react-icons/ti"
import { CiUnread } from "react-icons/ci"
import { IoTrashOutline } from "react-icons/io5"
import { axiosDB } from "../../utilities/axios.js";
import {TfiControlBackward} from "react-icons/tfi";
import { useAuthProvider } from '../../context/auth-context.jsx'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ButtonGroup, Typography } from '@mui/material'

const MessageActions = ({ message, reply, toggleFlag, markMessageUnread, setMobileExpanded }) => {

	const { user } = useAuthProvider()
	const { date, sender, recipient, subject, body, read, flag } = message

	return (
		<Stack
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			p={1}
		>
			<Box>
				<Box display={{ xs: "flex", lg: "none" }}>
					<IconButton onClick={()=>setMobileExpanded(false)}><TfiControlBackward /></IconButton>
				</Box>

				<Stack flexDirection="row">
					<Typography>Subject:</Typography>
					<Typography
						whiteSpace="nowrap" overflow="clip" textOverflow="ellipsis"
						fontWeight={600}
					>
						{subject}</Typography>
				</Stack>
			</Box>

			<ButtonGroup>
				<IconButton onClick={()=>toggleFlag(message)}>
					{ flag ? <TiFlag /> : <TiFlagOutline />}
				</IconButton>

				<IconButton onClick={()=>console.log("Unauthorized to delete!")}>
					<IoTrashOutline />
				</IconButton>

				{
				message.read &&
				<IconButton onClick={()=>markMessageUnread(message)}>
					<CiUnread />
				</IconButton>
				}
			</ButtonGroup>

		</Stack>
	);
};



const deleteMessage = async (message) => {
	console.log(message);
	try {
		await axiosDB.delete("/messages", message)
	} catch (error) {
		throw new Error(error)
	}
}

export default MessageActions;