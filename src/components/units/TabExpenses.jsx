import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const TabExpenses = ({ unitExpenses }) => {

  console.log(unitExpenses)
  return (
    <TabPanel value="expenses">
      {unitExpenses.map(expense =>
        <Box key={expense._id}>
          <Typography>{expense.amount}</Typography>
        </Box>
      )}
    </TabPanel>
  )
}

export default TabExpenses