import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';


import Chart from '../components/dashboard/Chart';
import Deposits from '../components/dashboard/Deposits.jsx';
import UpcomingPayments from '../components/dashboard/UpcomingPayments.jsx';
import { useManagementProvider } from '../context/management-context.jsx'
import { useEffect } from 'react'
import { axiosDB } from '../utilities/axios.js'
import { useLoaderData } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const DashboardManagement = () => {
  window.scrollTo(0, 0)

  const { payments, rents } = useLoaderData()
  const { setState } = useManagementProvider()

  useEffect(() => {
    setState({ payments: payments, rents: rents })
  }, [])


  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
          <Toolbar />
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
                  <Chart />
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
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent UpcomingPayments */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <UpcomingPayments />
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
    let response = await axiosDB("/payments")
    const { payments } = response.data
    response = await axiosDB("/rents")
    const { rents } = response.data
    return { payments, rents }
  } catch (error) {
    throw new Error(error)
  }
}


export default DashboardManagement