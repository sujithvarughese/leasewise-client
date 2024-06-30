import React from 'react'
import { Textarea } from '@mui/joy'

const MessageForm = ({ name, placeholder, ...props }) => {
  return (
    <Textarea
      id={name}
      name={name}
      placeholder={placeholder ||"Create Message"}
      minRows={2}
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
      {...props}
    />
  )
}

export default MessageForm