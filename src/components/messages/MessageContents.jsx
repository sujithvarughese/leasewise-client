import { useAuthProvider } from '../../context/auth-context.jsx'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

const MessageContents = ({ senderID, lastName, firstName, otherUser, date, subject, body, headNode, deleteMessage }) => {

    const { showUnauthorizedAlert } = useAuthProvider()

    const currentDate = new Date(date)
    const dateStr = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
    const time = currentDate.toLocaleTimeString("en-US")
    const { user } = useAuthProvider()

    const [isHovering, setIsHovering] = useState(false)

    const handleDeleteMessage = () => {
      showUnauthorizedAlert()
      // deleteMessage()
    }

    return (
        <Paper
          variant="elevation"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
              borderRadius: 2,
              padding: 1,
              width: "85%",
              backgroundColor: `${user.id === senderID ? "dodgerblue" : ""}`,
              justifySelf: `${user.id === senderID ? "flex-end" : "flex-start"}`,
          }}>
            <Stack>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography variant="body2">
                  On {`${dateStr} ${time}, ${firstName} ${lastName}`} wrote:
                </Typography>
                {isHovering &&
                  <IconButton
                    onClick={handleDeleteMessage}
                    sx={{ p: 0}}>
                    <DeleteForeverIcon  sx={{ height: "20px"}}/>
                  </IconButton>}
              </Stack>

                <Box p={2}>
                    <Typography variant="subtitle2">{body}</Typography>
                </Box>
            </Stack>
        </Paper>

    );
};

export default MessageContents;