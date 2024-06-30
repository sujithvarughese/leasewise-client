import React from 'react'
import { FormControl, InputLabel, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const CustomInput = ({ name, label, options, ...props }) => {
  return (
    <FormControl>
      <InputLabel id={name}></InputLabel>
      <Select name={name} id={name} {...props}>
        {options.map(option =>
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default CustomInput