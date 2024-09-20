import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome.js'
import Divider from '@mui/material/Divider'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded.js'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Image from 'mui-image'
import mobileFinancesIMG from "../../assets/images/landing/finances.png"
import constructionIMG from "../../assets/images/landing/construction.png"
import messagesIMG from "../../assets/images/landing/messages_.png"
import laptopIMG from "../../assets/images/landing/laptop.png"

const Info = () => {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      id="pricing"
      sx={{
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ margin: "auto", textAlign: "center"}}
            >
              <Tab label="Expenses" value="1" />
              <Tab label="Maintenance" value="2" />
              <Tab label="Messaging" value="3" />
              <Tab label="Forms" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ height: "420px"}} >
            <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
              <Box p={4}>
                <Typography level="h2" sx={{ fontSize: '32px' }}>Keep your finances organized in one place</Typography>
                <Typography>Track and store your expenses with ease. Filter by unit, send rent receipts, export into excel.</Typography>
              </Box>
              <Box height={640}>
                <Image src={mobileFinancesIMG} />
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value="2"  sx={{ height: "420px"}}>
            <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
              <Box p={4}>
                <Typography level="h2" sx={{ fontSize: '32px', mb: 0.5 }}>Built-in, professional maintenance requests</Typography>
                <Typography>Tenants can easily submit any issues from their portal, and you can keep a paper trail of all maintenance performed.</Typography>
              </Box>
              <Box>
                <Image src={constructionIMG} />
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value="3" sx={{ height: "420px"}}>
            <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
              <Box p={4}>
                <Typography level="h2" sx={{ fontSize: '32px', mb: 0.5 }}>Your professional messaging app</Typography>
                <Typography>Keep your phone number private from leads and applicants, and keep tenant communication in one place.</Typography>
              </Box>
              <Box>
                <Image src={messagesIMG} />
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value="4" sx={{ height: "420px"}}>
            <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
              <Box p={4}>
                <Typography level="h2" sx={{ fontSize: '32px', mb: 0.5 }}>All the forms you need to succeed</Typography>
                <Typography>Access 32 essential rental forms, from welcome letters to rent increase notices. Available for download in PDF format. Let us take care of preparing your leases and application forms so you have time to focus on the important stuff.</Typography>
              </Box>
              <Box>
                <Image src={laptopIMG} />
              </Box>
            </Stack>
          </TabPanel>


        </TabContext>
      </Box>

    </Container>
  )
}

export default Info