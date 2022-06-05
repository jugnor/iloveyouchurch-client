import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreateIcon from '@mui/icons-material/Create';
import GavelIcon from '@material-ui/icons/Gavel';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import {useMatch} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import {HomeTabPanel} from "../app/activity/HomeTabPanel";
import {DisciplineHandlingTabPanel} from "../app/discipline/DisciplineTabPanel";
import MyReportTabPanel from "../app/myReport/MyReportTabPanel";
import {CensorTabPanel} from "../app/account/CensorTabPanel";
import AdminTabPanel from "../app/activity/AdminTabPanel";
import {RouteKey, routes} from "../utils/router";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import {UserTabPanel} from "../app/system/UserTabPanel";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>

        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
}));

export default function SystemTabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const postboxPageMatch = useMatch(routes[RouteKey.POSTBOX_ID]);
  const currentPostboxId = postboxPageMatch?.params.postboxId
  const {keycloak} = useKeycloak();
  const userId = keycloak.subject;

  const monitor: boolean = keycloak.hasResourceRole('POSTBOX_MONITOR' )
  const admin: boolean = keycloak.hasResourceRole('POSTBOX_ADMIN' )
  const sysAdmin: boolean = keycloak.hasResourceRole('SYSTEM_ADMIN' )

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return currentPostboxId && userId ? (
    <div className={classes.root} style={{position:'absolute'}}>
      <AppBar position="relative" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >

          <Tab label="User Verwaltung" icon={<AccessibilityNewIcon/>} {...a11yProps(0)} />
          <Tab label="Gruppe Verwaltung" icon={<GroupsIcon/>} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <UserTabPanel postboxId={currentPostboxId} userId={userId}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DisciplineHandlingTabPanel postboxId={currentPostboxId} userId={userId}/>
        </TabPanel>

      </AppBar>
    </div>
  ) : (<>Es ist leider etwas schiefgelaufen</>);
}
