import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GroupsIcon from '@mui/icons-material/Groups';
import {DisciplineHandlingTabPanel} from "../app/discipline/DisciplineTabPanel";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import {UserTabPanel} from "../app/system/UserTabPanel";
import {useUserProperties} from "../hooks/useUserProperties";
import {PostboxTabPanel} from "../app/system/PostboxTabPanel";

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
  const {userId, currentPostboxId} = useUserProperties();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return currentPostboxId && userId ? (
    <div className={classes.root} style={{position: 'absolute'}}>
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
          <PostboxTabPanel/>
        </TabPanel>

      </AppBar>
    </div>
  ) : (<>Es ist leider etwas schiefgelaufen</>);
}
