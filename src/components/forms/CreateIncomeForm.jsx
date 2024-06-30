
import useSubmitForm from '../../hooks/useSubmitForm.js'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel } from '@mui/material'
import StyledSelect from '../ui/StyledSelect.jsx'
import MenuItem from '@mui/material/MenuItem'
import CustomInput from '../ui/CustomInput.jsx'
import React from 'react'
import Button from '@mui/material/Button'
import FormModal from '../ui/FormModal.jsx'

const CreateIncomeForm = ({ open, onClose }) => {

  const { response, error, loading } = useSubmitForm()

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
    <form onSubmit={handleSubmit}>
      <FormModal open={open} onClose={onClose} heading="Create Expense">
        <StyledSelect name="category" label="Category" options={categories} minWidth={120}/>
        <TextField type="number" id="amount" name="amount" label="Amount" variant="outlined" />
        <TextField type="number" id="balance" name="balance" label="Balance" variant="outlined" />
        <TextField type="date" id="datePaid" name="datePaid" label="Date Paid" variant="outlined" />
        <TextField id="paidBy" name="paidBy" label="Paid By" variant="outlined" />
        <TextField id="companyAddress" name="companyAddress" label="Company Address" variant="outlined" />
        <TextField id="companyPhone" name="companyPhone" label="Company Phone" variant="outlined" />
        <TextField type="email" id="companyEmail" name="companyEmail" label="Company Email" variant="outlined" />
        <Button type="submit">Submit</Button>
      </FormModal>
    </form>
  )
}

export default CreateIncomeForm

const categories = [
  { label: "Rent", value: "rent" },
  { label: "Deposit", value: "deposit" },
  { label: "Other", value: "other" }
]