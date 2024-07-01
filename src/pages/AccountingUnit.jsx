import classes from "../components/accounting/financials-unit/styles/FinanceUnitDetails.module.css";
import CalculateProfitForm from "../components/accounting/forms/CalculateProfitForm.jsx"
import {useState} from "react";
import { convertToUSD } from "../utilities/financeCalculations.js";
import FinanceDetailsRow from "../components/accounting/financials-unit/FinanceDetailsRow.jsx";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ButtonGroup, TableContainer } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'


const AccountingUnit = ({ updateUnitFinance, purchasePrice, rent, fairMarketRent, annualPropertyTax, annualInsurancePremium, annualHoa }) => {

    const [profit, setProfit] = useState("")

    const [editMode, setEditMode] = useState(!(purchasePrice && rent && fairMarketRent))

    const [values, setValues] = useState({
        purchasePrice: purchasePrice || 0,
        rent: rent || 0,
        fairMarketRent: fairMarketRent || 0,
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: Number(e.target.value) })
    }

    const cancel = () => {
        setValues({
            purchasePrice: purchasePrice || "",
            rent: rent || "",
            fairMarketRent: fairMarketRent || ""
        })
        setEditMode(false)
    }

    const update = () => {
        updateUnitFinance(values)
        setEditMode(false)
    }

    return (
      <Box display="flex" mt={12}>
          <Container>
              <TableContainer component={Paper}>
                  <Table aria-label="simple-table">
                      <TableHead>
                          <TableRow>
                              <TableCell>
                                  Overview
                              </TableCell>
                              <TableCell>
                                  {!editMode && <Button onClick={()=>setEditMode(!editMode)} fontSize="14px">[Edit]</Button>}
                              </TableCell>
                          </TableRow>

                      </TableHead>

                      <TableBody>
                          <FinanceDetailsRow
                            label="Purchase Price"
                            display={(purchasePrice && !editMode) ? convertToUSD(values.purchasePrice)
                              :
                              <TextField
                                name="purchasePrice"
                                type="number"
                                value={values.purchasePrice}
                                onChange={handleChange}
                              />
                            }
                          />
                          <FinanceDetailsRow
                            label="Rent"
                            display={(rent && !editMode) ? convertToUSD(values.rent)
                              :
                              <TextField
                                name="rent"
                                type="number"
                                value={values.rent}
                                onChange={handleChange}
                              />
                            }
                          />
                          <FinanceDetailsRow
                            label="Fair Market Rent"
                            display={(fairMarketRent && !editMode) ? convertToUSD(values.fairMarketRent)
                              :
                              <TextField
                                name="fairMarketRent"
                                type="number"
                                value={values.fairMarketRent}
                                onChange={handleChange}
                              />
                            }
                          />
                          {
                            editMode &&
                            <ButtonGroup>
                                <Button onClick={update}>Update</Button>
                                <Button onClick={cancel}>Cancel</Button>
                            </ButtonGroup>
                          }
                      </TableBody>
                  </Table>

                  {
                    purchasePrice && rent &&
                    <div>
                        <CalculateProfitForm
                          annualPropertyTax={annualPropertyTax}
                          annualInsurancePremium={annualInsurancePremium}
                          annualHoa={annualHoa}
                          rent={rent}
                          setProfit={setProfit}
                        />
                        {
                          profit &&
                          <div>
                              Total Profit: {convertToUSD(profit)}
                          </div>
                        }
                    </div>
                  }
              </TableContainer>
          </Container>


      </Box>

    );
};

export default AccountingUnit;