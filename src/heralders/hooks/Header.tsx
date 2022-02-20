import React, {useCallback} from 'react';
//import Fade from 'react-reveal';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import "animate.css/animate.min.css";
import '../../css/Progress.css';


import {useSpring} from 'react-spring'


import clsx from 'clsx';
import {useKeycloak} from "@react-keycloak/web";

const drawerWidth = 340;
const drawerBackgroundColor = 'rgba(255,255,255,0.8)';
const drawerBackgroundColorBar = 'default';
const drawerHeigth = 70;
const border = '1px solid blue'
const position = 'relative'


const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    otherBar: {
      height: drawerHeigth,
      position: position,
      backgroundColor: drawerBackgroundColorBar,
      backgroundSize: 'cover',
      border: border

    },
    otherBar1: {
      height: drawerHeigth,
      position: position,
      backgroundColor: drawerBackgroundColorBar,
      backgroundSize: 'cover',

      //border :border

    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,

    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: drawerBackgroundColor,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',


    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function Header() {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  })

  const { keycloak } = useKeycloak();

  const logout = useCallback(() => {
    keycloak?.logout({
      redirectUri: process.env.REACT_APP_KEYCLOAK_REDIRECT
    });
  }, [keycloak]);

  const classes1 = useStyle();

  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static"
              className={clsx(classes1.appBar, {
                [classes1.appBarShift]: open,
              })}
      >
        <Toolbar>
          <Header
            logo={
              <img
                alt={'Freistaat Thüringen Logo'}
                height="32"
                src="/freistaat-thueringen-logo-behoerdenclient.svg"
              />
            }
            menu={
              <Menu>
                {keycloak.authenticated && (
                  <MenuItem
                    appearance="light"
                    href={process.env.REACT_APP_DOCS}
                    icon="help-outline"
                    label={'Abmelden'}
                    onClick={logout}
                  />
                )}
              </Menu>
            }
            navigation={
              <Stack orientation="horizontal">
                {keycloak.authenticated && (
                  <Button
                    id="buttonLogout"
                    appearance="primary-link"
                    label={'Abmelden'}
                    onClick={logout}
                  />
                )}
              </Stack>
            }
          ></Header>
          );
          <div className={classes.grow}/>
          <Typography variant="h6" noWrap>Willkommen Zu Hause Heralders</Typography>
        </Toolbar>

      </AppBar>
    </div>
  );
}
