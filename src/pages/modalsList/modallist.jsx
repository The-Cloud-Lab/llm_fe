import { useEffect, React, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { CardList } from "./CardList";
import { useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';





const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
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




export default function modallist({ modaldata, sendDataToParent }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);



  const classes = {
    root: {
      flexGrow: 1
    }

  };


  return (



    <>
      <Container sx={{ flexGrow: 1 }}>
        <Container sx={{ justifyContent: 'center', alignItems: 'center' }} style={classes.root}>



          <Grid container spacing={6} sx={{ marginBottom: 10 }}>
            {modaldata && modaldata.map(item => (
              <Grid item xs={12} md={4} sm={6} >
                <CardList data={item} sendDataToParent={sendDataToParent} />

              </Grid>
            ))}





          </Grid>
        </Container>


      </Container>
    </>

  )
}

