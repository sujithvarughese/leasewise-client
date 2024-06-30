
import useSubmitForm from '../../hooks/useSubmitForm.js'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel } from '@mui/material'
import StyledSelect from '../ui/StyledSelect.jsx'
import MenuItem from '@mui/material/MenuItem'
import CustomInput from '../ui/CustomInput.jsx'
import React from 'react'
import Button from '@mui/material/Button'
import FormModal from '../ui/FormModal.jsx'

const CreateMortgageForm = ({ open, onClose }) => {

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
        <TextField id="bank" name="bank" label="Bank" variant="outlined" />
        <TextField type="number" id="purchasePrice" name="purchasePrice" label="Purchase Price" variant="outlined" />
        <TextField type="number" id="principal" name="principal" label="principal" variant="outlined" />
        <TextField type="number" id="interest" name="interest" label="Interest" variant="outlined" />
        <TextField type="number" id="term" name="term" label="Term" variant="outlined" />
        <TextField type="number" id="numPaymentsMade" name="numPaymentsMade" label="Payments made" variant="outlined" />
        <Button type="submit">Submit</Button>
      </FormModal>
    </form>
  )
}

export default CreateMortgageForm
