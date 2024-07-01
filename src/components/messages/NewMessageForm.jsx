import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ButtonGroup, FormControl, Input, Select, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import StyledSelect from '../ui/StyledSelect.jsx'
import TextField from '@mui/material/TextField'
import { Textarea } from '@mui/joy'

const NewMessageForm = ({ close, addressBook, getMessages }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Box>
      <form>
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
            <Button type="submit">Send</Button>
            <Button type="button" onClick={close}>Cancel</Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  )
}

export default NewMessageForm