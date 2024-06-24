import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
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

const PrivateNavbar = () => {

  const { signOutUser } = useAuthProvider()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate()
  const signOutAndNavigateHome = () => {
    signOutUser()
    navigate("/")
  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <MenuItem>
            <Button color="secondary" variant="contained" sx={{ width: '100%' }} onClick={signOutAndNavigateHome}>
              Log Out
            </Button>
          </MenuItem>
        </Toolbar>
      </StyledAppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {managementLinks.map(link =>
            <ListItemButton key={link.name} onClick={() => navigate(link.url)}>
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          )}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>

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
        <Outlet />
      </Box>
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