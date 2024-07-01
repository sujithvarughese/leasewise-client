
import useSubmit from '../../hooks/useSubmit.js'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel } from '@mui/material'
import StyledSelect from '../ui/StyledSelect.jsx'
import MenuItem from '@mui/material/MenuItem'
import CustomInput from '../ui/CustomInput.jsx'
import React from 'react'
import Button from '@mui/material/Button'
import FormModal from '../ui/FormModal.jsx'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

const CreateExpenseForm = ({ open, onClose }) => {

  const { response, error, loading } = useSubmit()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = [...formData.values()]
    const fieldIsEmpty = values.includes("")
    if (fieldIsEmpty) {
      console.log("enter all fields")
      return
    }
    const data = Object.fromEntries(formData)
    e.currentTarget.reset()
    console.log(data)
  }

  return (

    <FormModal open={open} onClose={onClose} heading="Create Expense">
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <StyledSelect name="category" label="Category" options={categories} minWidth={120}/>
          <TextField id="payTo" name="payTo" label="Pay To" variant="outlined" />
          <Stack flexDirection="row" gap={2}>
            <TextField type="number" id="amount" name="amount" label="Amount" variant="outlined" />
            <TextField type="number" id="balance" name="balance" label="Balance" variant="outlined" />
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <TextField type="date" id="dateDue" name="dateDue" helperText="Due Date" variant="outlined" />
            <TextField type="date" id="datePaid" name="datePaid" helperText="Date Paid" variant="outlined" />
          </Stack>
          <TextField id="companyName" name="companyName" label="Company" variant="outlined" />
          <TextField id="companyAddress" name="companyAddress" label="Company Address" variant="outlined" />
          <Stack flexDirection="row" gap={2}>
            <TextField id="companyPhone" name="companyPhone" label="Company Phone" variant="outlined" />
            <TextField type="email" id="companyEmail" name="companyEmail" label="Company Email" variant="outlined" />
          </Stack>
          <Button type="submit">Submit</Button>
        </Stack>

      </form>
    </FormModal>

  )
}

export default CreateExpenseForm

const categories = [
  { label: "Tax", value: "tax" },
  { label: "Insurance", value: "insurance" },
  { label: "HOA", value: "hoa" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Repairs", value: "repairs" },
  { label: "Advertising", value: "advertising" },
  { label: "Appliances", value: "appliances" },
  { label: "Utilities", value: "utilities" },
  { label: "Other", value: "other" }
]