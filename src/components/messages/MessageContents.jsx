import { useAuthProvider } from '../../context/auth-context.jsx'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'

const MessageContents = ({ senderID, lastName, firstName, date, subject, body }) => {

    const currentDate = new Date(date)
    const dateStr = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
    const time = currentDate.toLocaleTimeString("en-US")
    const { user } = useAuthProvider()

    return (
        <Paper
          variant="elevation"
          sx={{
              borderRadius: 2,
              padding: 1,
              width: "85%",
              backgroundColor: `${user.id === senderID ? "dodgerblue" : ""}`,
              placeSelf: `${user.id === senderID ? "flex-end" : "flex-start"}`
          }}>
            <Stack>
                <Typography variant="body2">
                    On {dateStr} {time}, {firstName} {lastName} wrote:
                </Typography>
                <Box p={2}>
                    <Typography variant="subtitle2">{body}</Typography>
                </Box>
            </Stack>
        </Paper>

    );
};

export default MessageContents;