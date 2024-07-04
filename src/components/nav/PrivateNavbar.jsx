import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useNavigation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu.js'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications.js'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useAuthProvider } from '../../context/auth-context.jsx'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { mainListItems, secondaryListItems } from './listItems.jsx'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import DashboardIcon from '@mui/icons-material/Dashboard.js'
import ApartmentIcon from '@mui/icons-material/Apartment.js'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange.js'
import ForumIcon from '@mui/icons-material/Forum.js'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding.js'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance.js'
import Loading from '../Loading.jsx'
import { LinearProgress } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import { useMessagingProvider } from '../../context/messaging-context.jsx'
import logo from "../../assets/images/landing/logos/lease-wise-logo.png"
const logoStyle = {
  width: '48px',
  height: 'auto',
  cursor: 'pointer',
};


const PrivateNavbar = () => {

  const { signOutUser } = useAuthProvider()
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const navigate = useNavigate()
  const navigation = useNavigation()
  const signOutAndNavigateHome = () => {
    setTimeout(() => {
      signOutUser()
    }, 150)
    navigate("/")
  }

  const [heading, setHeading] = useState("Dashboard")

  const setHeadingAndNavigate = (name, url) => {
    toggleDrawer(false)
    setHeading(name)
    navigate(url)
  }

  const { numUnreadMessages } = useMessagingProvider()


  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit" aria-label="open drawer"
            onClick={() => toggleDrawer(true)}
            sx={{ display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>


          <Button variant="text" to="/" onClick={() => setHeadingAndNavigate("Dashboard", "/")}>
            <img
              src={logo}
              style={logoStyle}
              alt="logo of sitemark"
            />
          </Button>



          <Stack flexDirection="row" justifyContent="flex-end" width="100%">

            {/*<IconButton color="inherit">
              <Badge badgeContent={numUnreadMessages} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}

            <MenuItem>
              <Button color="secondary" variant="contained" sx={{ width: '100%' }} onClick={signOutAndNavigateHome}>
                Log Out
              </Button>
            </MenuItem>
          </Stack>

        </Toolbar>

        <Box width="100%">
          {navigation.state === "loading" && <LinearProgress color="secondary"/>}
        </Box>
      </AppBar>

      <Box display={{ xs: "none", sm: "initial"}} >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }} />
        <List component="nav">
          {managementLinks.map(link =>
            <Box key={link.name} bgcolor={ heading === link.name ? "dodgerblue" : ""}>
              <ListItemButton onClick={() => setHeadingAndNavigate(link.name, link.url)}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} sx={{ display: { xs: "none", md: "initial" }}}/>
              </ListItemButton>
            </Box>

          )}
        </List>
      </Box>

      <Drawer
        anchor="left" open={open} onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1, }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => toggleDrawer(close)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>

          <List component="nav" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, }}>
            {managementLinks.map(link =>
              <ListItemButton key={link.name} onClick={() => setHeadingAndNavigate(link.name, link.url)}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.name}/>
              </ListItemButton>
            )}
          </List>
          </Box>

      </Drawer>

    </Box>

  )
}

const managementLinks = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    url: "/"
  },
  {
    name: "Units",
    icon: <ApartmentIcon />,
    url: "/units"
  },
  {
    name: "Accounting",
    icon: <CurrencyExchangeIcon />,
    url: "/accounting"
  },
  {
    name: "Messages",
    icon: <ForumIcon />,
    url: "/messages"
  },
  {
    name: "Research",
    icon: <DataThresholdingIcon />,
    url: "/research"
  },
]

const tenantLinks = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    url: "/"
  },
  {
    name: "Messages",
    icon: <ForumIcon />,
    url: "messages"
  },
  {
    name: "Payments",
    icon: <AccountBalanceIcon />,
    url: "payments"
  },
]

export default PrivateNavbar