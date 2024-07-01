import React, { useState } from 'react'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
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

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PrivateNavbar = ({ numUnreadMessages }) => {

  const { signOutUser } = useAuthProvider()
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const navigate = useNavigate()
  const navigation = useNavigation()
  const signOutAndNavigateHome = () => {
    signOutUser()
    navigate("/")
  }

  const [heading, setHeading] = useState("Dashboard")
  const setHeadingAndNavigate = (name, url) => {
    setHeading(name)
    navigate(url)

  }

  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={() => toggleDrawer(true)} sx={{ display: { sm: 'none' }}}>
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1, display: { xs: 'none', sm: "initial" } }}>
            {heading}
          </Typography>

          <Stack flexDirection="row" justifyContent="flex-end" width="100%">
            <IconButton color="inherit">
              <Badge badgeContent={numUnreadMessages} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

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

      <Box display={{ xs: "none", sm: "initial"}}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }} />
        <List component="nav">
          {managementLinks.map(link =>
            <ListItemButton key={link.name} onClick={() => setHeadingAndNavigate(link.name, link.url)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} sx={{ display: { xs: "none", md: "initial" }}}/>
            </ListItemButton>
          )}
        </List>
      </Box>

      <Drawer
        anchor="left" open={open} onClose={() => toggleDrawer(false)}
        sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
      >
        <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1, }}>
          <DrawerHeader>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1, }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }} />
            <List component="nav">
              {managementLinks.map(link =>
                <ListItemButton key={link.name} onClick={() => setHeadingAndNavigate(link.name, link.url)}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.name}/>
                </ListItemButton>
              )}
            </List>
          </Box>
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
  }
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