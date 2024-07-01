
import useSubmit from '../../hooks/useSubmit.js'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel } from '@mui/material'
import StyledSelect from '../ui/StyledSelect.jsx'
import MenuItem from '@mui/material/MenuItem'
import CustomInput from '../ui/CustomInput.jsx'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import FormModal from '../ui/FormModal.jsx'
import { LoadingButton } from '@mui/lab'
import Stack from '@mui/material/Stack'

const CreateMortgageForm = ({ id, open, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = [...formData.values()]
    const fieldIsEmpty = values.includes("")
    if (fieldIsEmpty) {
      console.log("enter all fields")
      return
    }
    const data = { ...Object.fromEntries(formData), unit: id }
    submitForm({ method: "POST", url: "/mortgages", requestConfig: data })
    // e.currentTarget.reset()
    console.log(data)
  }

  useEffect(() => {
    console.log(response)
  }, [response])

  return (
    <FormModal open={open} onClose={onClose} heading="Create Mortgage">
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField id="bank" name="bank" label="Bank" variant="outlined" />
          <TextField type="number" id="purchasePrice" name="purchasePrice" label="Purchase Price" variant="outlined" />
          <TextField type="number" id="principal" name="principal" label="Principal" variant="outlined" />
          <TextField type="number" id="interest" name="interest" label="Interest" variant="outlined" />
          <TextField type="number" id="term" name="term" label="Term" variant="outlined" />
          <TextField type="number" id="numPaymentsMade" name="numPaymentsMade" label="Payments made" variant="outlined" />
          <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
        </Stack>
      </form>
    </FormModal>
  )
}

export default CreateMortgageForm
