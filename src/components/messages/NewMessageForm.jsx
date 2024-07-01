import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ButtonGroup, FormControl, Input, Select, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import StyledSelect from '../ui/StyledSelect.jsx'
import TextField from '@mui/material/TextField'
import { Textarea } from '@mui/joy'
import { axiosDB } from '../../utilities/axios.js'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewMessageForm = ({ close, addressBook, getMessages }) => {

  const { user } = useAuthProvider()

  // recipient is initially set to first name in address book (user has only one name in address book so default to admin)
  //const [values, setValues] = useState({ ...initialState, recipient: addressBook[0].value })
  const [buttonText, setButtonText] = useState("Send")
  /*
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
*/
  const navigate = useNavigate()

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values)
      // add sender info before passing to server
      const msg = await createMessage({ ...values, sender: user.userID })
      // navigate back to messages to update messages display
      if (msg === 'success') {
        setButtonText("Sent!")
      } else {
        setButtonText("Error")
      }
      await getMessages()
      setTimeout(() => {
        navigate("/messages");
        close()
      }, 1000)
    } catch (error) {
      throw new Error(error)
    } finally {
      actions.resetForm()
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack>
          <StyledSelect name="recipient" label="To:" options={addressBook} />
          <TextField name="subject" label="Subject" />
          <Textarea
            id="body"
            name="body"
            placeholder="Type new message here..."
            minRows="15"
            sx={{
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
          <ButtonGroup>
            <Button type="submit">{buttonText}</Button>
            <Button type="button" onClick={close}>Cancel</Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  )
}
const createMessage = async (message) => {
  try {
    const response = await axiosDB.post("/messages", message)
    const { msg } = response.data
    return msg
  } catch (error) {
    console.log(error);
  }
}

export default NewMessageForm