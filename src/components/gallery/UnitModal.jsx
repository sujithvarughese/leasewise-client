import { axiosDB } from '../../utilities/axios.js'
import { useEffect, useState } from 'react'

import FinancialDataTabPanel from './FinancialDataTabPanel.jsx'
import { Modal, Tab, Tabs, Typography } from '@mui/material'
import Image from 'mui-image'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
const UnitModal = ({ isOpen, onClose, _id, houseNumber, street, apartmentNumber, city, state, zip, image, bedrooms, bathrooms, tenant, user }) => {


  const [financialData, setFinancialData] = useState(null)
  const fetchUnitFinancialData = async () => {
    try {
      const response = await axiosDB(`/finance/${_id}`)
      const { unitFinance } = response.data
      setFinancialData(unitFinance)
      console.log(unitFinance)
    } catch (error) {
      console.log(error);
    }
  }
  const updateUnitFinance = async (values) => {
    try {
      await axiosDB.patch("/finance", { id: financialData._id, values })
      setFinancialData({ ...financialData, ...values })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUnitFinancialData()
  }, [])

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Image src={image} alt="image" />

      <Stack justifyContent="space-around">
        <Box>
          <Typography>{houseNumber} {street} {apartmentNumber}</Typography>
          <Typography fontSize="md">{city}, {state} {zip}</Typography>
        </Box>
        <Box>
          <Typography>{bedrooms} bd / {bathrooms}ba</Typography>
        </Box>
      </Stack>

      <Stack justifyContent="space-around">
        <Box>
          <Typography fontSize="sm">{tenant?.lastName}, {tenant?.firstName}</Typography>
          <Typography fontSize="sm">{tenant?.email}</Typography>
        </Box>
        <Typography fontSize="sm">Rent: ${tenant?.rent}</Typography>
      </Stack>

      <Tabs>
        <TabList>
          <Tab>Finances</Tab>
          <Tab>Messages</Tab>
          <Tab>Rents</Tab>
          <Tab></Tab>
          <Tab></Tab>
        </TabList>

          <FinancialDataTabPanel
            updateUnitFinance={updateUnitFinance}
            purchasePrice={financialData?.purchasePrice}
            rent={financialData?.rent}
            fairMarketRent={financialData?.fairMarketRent}
            annualPropertyTax={financialData?.annualPropertyTax}
            annualInsurancePremium={financialData?.insurance?.annualPremium}
            annualHoa={financialData?.hoa?.annualFee}
            />
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>

      </Tabs>
    </Modal>
  )
}

export default UnitModal