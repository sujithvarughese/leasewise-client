
import TabPanel from '@mui/lab/TabPanel';
import { convertToUSD } from '../../utilities/financeCalcs.js'
import FinanceDetailsRow from './FinanceDetailsRow.jsx'

const FinancialDataTabPanel = ({
  purchasePrice,
  rent,
  fairMarketRent,
  annualPropertyTax,
  annualInsurancePremium,
  annualHoa
}) => {
  return (
    <TabPanel>
      <FinanceDetailsRow label="Purchase Price" display={convertToUSD(purchasePrice)} />
      <FinanceDetailsRow label="Rent" display={convertToUSD(rent)} />
      <FinanceDetailsRow label="Fair Market Rent" display={convertToUSD(fairMarketRent)} />
      <FinanceDetailsRow label="Annual Property Tax" display={convertToUSD(annualPropertyTax)} />
      <FinanceDetailsRow label="Annual Insurance Premium" display={convertToUSD(annualInsurancePremium)} />
      <FinanceDetailsRow label="Annual Homeowner's Association Fee" display={convertToUSD(annualHoa)} />

    </TabPanel>
  )
}

export default FinancialDataTabPanel