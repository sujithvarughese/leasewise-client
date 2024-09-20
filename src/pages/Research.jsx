import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Fmr from '../components/research/Fmr.jsx'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { convertToUSD } from '../utilities/financeCalculations.js'
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Listings from '../components/research/Listings.jsx'

const Research = () => {

  const [value, setValue] = useState("1")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Container>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="research tabs">
              <Tab label="MLS Search" value="1" />
              <Tab label="Fair Market Rents" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1"  sx={{ p: 0 }}>
            <Listings />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0 }}>
            <Fmr />
          </TabPanel>


        </TabContext>
      </Container>




    </Box>


  );
};


export default Research;