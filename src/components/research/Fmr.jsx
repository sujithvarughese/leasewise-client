import { axiosHUD } from "../../utilities/axios.js";
import { useState } from "react";
import { FormControl, InputLabel, Select, TableContainer, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const Fmr = () => {

  const [counties, setCounties] = useState([])
  const [fmrByZip, setFmrByZip] = useState([])
  const [fmrData, setFmrData] = useState(null)

  const [county, setCounty] = useState("")
  const [zip, setZip] = useState("")
  const year = 2023
  // after user selects a state, fetch a list of counties and the county code, then prompt user for county
  const getCountyList = (stateCode) => {
    const fetchData = async () => {
      try {
        // retrieves list of counties { state_code, fips_code, county_name, town_name, category }
        const response = await axiosHUD(`/listCounties/${stateCode}`)
        // we need only county_name to populate list and fips_code to then fetch by code
        const counties = response.data.map(county => {
          return {
            text: county.county_name,
            value: county.fips_code
          }
        })
        // form will only populate list if counties state array length > 0
        setCounties(counties)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  // after user selects county, fetch a list of zip codes(if metro county) with FMR list
  const getZipCodeList = (county) => {
    setCounty(county.text)
    console.log(county)
    setZip("")
    const fetchData = async () => {
      try {
        // retrieve list { zip_code, Efficiency, One-Bedroom, Two-Bedroom, Three-Bedroom, Four-Bedroom }
        const response = await axiosHUD(`/data/${county.value}?year=${year}`)
        // if classified as small area, data is not seperated by zipcodes
        if (response.data.data.smallarea_status === "0") {
          setFmrData(response.data.data.basicdata)
        } else {
          const zipCodes = response.data.data.basicdata
          // form will only display zip codes to user once state array is populated
          if (zipCodes.length > 0) {
            setFmrByZip(zipCodes)
            console.log(zipCodes)
          } else {
            setFmrData(zipCodes)
          }

        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  const handleChangeStateCode = (e) => {
    // to clear values in case user picks different state after selecting zip
    setFmrByZip([])
    setFmrData(null)
    getCountyList(e.target.value)
  }

  const handleChangeCounty =(e) => {
    setFmrByZip([])
    setFmrData(null)
    const county = counties.find(county => county.value === e.target.value)
    getZipCodeList(county);
  }

  // set our final data to display
  const handleSelectZipCode = (e) => {
    const data = fmrByZip.find(zip => zip.zip_code === e.target.value)
    setZip(e.target.value)
    setFmrData(data)
  }

  return (
    <Box>
        <Toolbar />
        <Container sx={{ textAlign: "center" }}>

          <Typography variant="h5">Search for Fair Market Rent Values:</Typography>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120}}>
              <InputLabel htmlFor="state" id="state">State</InputLabel>
              <Select
                label="State"
                type="text"
                name="state"
                id="state"
                list={states}
                onChange={handleChangeStateCode}
              >
                {states.map(state => {
                  return (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            {counties.length > 0 &&
              <FormControl sx={{ m: 1, minWidth: 120}}>
                <InputLabel htmlFor="county" id="county">County</InputLabel>
                <Select
                  label="County"
                  type="text"
                  name="county"
                  id="county"
                  list={counties}
                  onChange={handleChangeCounty}
                >
                  {counties.map(county => {
                    return (
                      <MenuItem key={county} value={county.value}>{county.text}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            }

            {fmrByZip?.length > 0 &&
              <FormControl sx={{ m: 1, minWidth: 120}}>
                <InputLabel htmlFor="zip" id="zip">Zip Code</InputLabel>
                <Select
                  label="Zip Code"
                  type="text"
                  name="zip"
                  id="zip"
                  list={fmrByZip.map(zip => zip.zip_code)}
                  onChange={handleSelectZipCode}
                >
                  {fmrByZip.map(zip => {
                    return (
                      <MenuItem key={zip.zip_code} value={zip.zip_code}>{zip.zip_code}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            }
          </Box>


          {fmrData &&
            <TableContainer component={Paper}>
              <Table aria-label="simple-table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Fair Market Rent Values for {county}
                      { zip && `: ${zip}`}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Efficiency</TableCell>
                    <TableCell>${fmrData["Efficiency"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>One-Bedroom</TableCell>
                    <TableCell>${fmrData["One-Bedroom"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Two-Bedroom</TableCell>
                    <TableCell>${fmrData["Two-Bedroom"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Three-Bedroom</TableCell>
                    <TableCell>${fmrData["Three-Bedroom"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Four-Bedroom</TableCell>
                    <TableCell>${fmrData["Four-Bedroom"]}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          }
        </Container>

    </Box>


  );
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default Fmr;