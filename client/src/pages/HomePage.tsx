import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import EcoIcon from '@material-ui/icons/Eco';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate, RouteComponentProps, Router } from '@reach/router';
import clsx from 'clsx';

import Recipes from './Recipes';
import Ingredients from './Ingredients';
import Bar from './Bar';
import RecipePage from './RecipePage';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  containerReset: {
    paddingLeft: 0,
    marginLeft: 0,
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    right: 'auto',
    left: 0,
    width: '110%',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  rightHalf: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '0px;',
  },
}));

type HomeProps = RouteComponentProps;
export function HomePage(props: HomeProps) {
  const classes = useStyles();

  // Drawer state
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container className={clsx(classes.containerReset, classes.outerContainer)}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/recipes')}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Cocktails" />
          </ListItem>
          <ListItem button onClick={() => navigate('/ingredients')}>
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            <ListItemText primary="Ingredients" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/bar')}>
            <ListItemIcon>
              <LocalBarIcon />
            </ListItemIcon>
            <ListItemText primary="My Bar" />
          </ListItem>
        </List>
      </Drawer>
      <Container className={classes.rightHalf}>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Home" edge="start">
              <Avatar src="/android-chrome-192x192.png" alt="LB" />
            </IconButton>
            <Typography variant="h5">My Home Bar</Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Router>
              <Recipes path="/recipes" />
              <Ingredients path="/ingredients" />
              <Bar path="/bar" />
              <RecipePage path="/recipes/:recipeId" />
            </Router>
          </Container>
        </main>
      </Container>
    </Container>
  );
}
