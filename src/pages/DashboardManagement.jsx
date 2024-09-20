import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { convertToUSD, calculateProfit } from "../utilities/financeCalculations.js"

import Chart from '../components/dashboard/Chart';
import Deposits from '../components/dashboard/Deposits.jsx';
import RecentExpenses from '../components/dashboard/RecentExpenses.jsx';
import { useManagementProvider } from '../context/management-context.jsx'
import { useEffect } from 'react'
import { axiosDB } from '../utilities/axios.js'
import { useLoaderData } from 'react-router-dom'
import PieChartExpenses from '../components/dashboard/PieChartExpenses.jsx'
import { useMessagingProvider } from '../context/messaging-context.jsx'
import Listings from '../components/research/Listings.jsx'
import { Research } from '../index.js'
import NewsSection from '../components/news/NewsSection.jsx'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        LeaseWise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const DashboardManagement = () => {
  window.scrollTo(0, 0)

  const { expenses, incomes, mortgages, filteredArticles } = useLoaderData()
  const { setState } = useManagementProvider()


  useEffect(() => {
    setState({ expenses: expenses, incomes: incomes, mortgages: mortgages })
  }, [])

  return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <CssBaseline />
          <Toolbar />
          <Grid item xs={12} marginTop={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <NewsSection articles={filteredArticles}/>
            </Paper>
          </Grid>

          <Grid item xs={12} margin={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Research />
            </Paper>
          </Grid>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <PieChartExpenses expenses={expenses}/>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits incomes={incomes} expenses={expenses}/>
                </Paper>
              </Grid>
              {/* Recent RecentExpenses */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RecentExpenses expenses={expenses}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}

export const dashboardLoader = async () => {
  try {
    let response = await axiosDB("/expenses")
    const { expenses } = response.data
    response = await axiosDB("/incomes")
    const { incomes } = response.data
    response = await axiosDB("/mortgages")
    const { mortgages } = response.data
    response = await axiosDB("/news")
    const { filteredArticles } = response.data
    return { expenses, incomes, mortgages, filteredArticles }
  } catch (error) {
    throw new Error(error)
  }
}


export default DashboardManagement