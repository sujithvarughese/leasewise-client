
import useSubmitForm from '../../hooks/useSubmitForm.js'
import TextField from '@mui/material/TextField'
import { InputLabel } from '@mui/material'

const CreateExpenseForm = () => {

  const { response, error, loading } = useSubmitForm()

  return (
    <form>

      <TextField id="payTo" label="Pay To" variant="outlined" />

    </form>
  )
}

export default CreateExpenseForm