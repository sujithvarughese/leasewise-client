import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useManagementProvider } from '../../context/management-context.jsx'

const TabMortgages = ({ id }) => {

  const { mortgages } = useManagementProvider()
  const unitMortgages = mortgages?.filter(mortgage => mortgage.unit === id)
  console.log(unitMortgages)

  return (
    <TabPanel value="mortgage">
      <Box>
        {unitMortgages?.map(mortgage =>
          <Box key={mortgage._id}>
            <Typography>{mortgage?.bank}</Typography>
          </Box>
        )}
      </Box>
    </TabPanel>
  )
}

export default TabMortgages