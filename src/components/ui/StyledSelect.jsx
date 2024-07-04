import { FormControl, InputLabel, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const StyledSelect = ({ name, label, options, ...props }) => {
  return (
    <FormControl sx={props}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select name={name} id={name} {...props} on>
        {options?.map(option =>
          <MenuItem key={option} value={option.value}>
            {option.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default StyledSelect