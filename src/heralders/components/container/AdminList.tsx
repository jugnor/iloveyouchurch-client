import React, {useCallback, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import '../../css/Media.css';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ComputerIcon from '@mui/icons-material/Computer';
import EventIcon from '@mui/icons-material/Event';
import Announcement from "../admin/Announcement";
import Event from "../admin/Event";
import {ActivityType} from "../../models/ActivityType";
import {calendarWeek} from "../util/WeekPicker";
import {useActivity} from "../../hooks/useActivity";
import {UpsertActivity} from "../admin/UpsertActivity";
import {Activity} from "../../models/Activity";
import {useApi} from "../../hooks/useApi";
import useSWR from 'swr'
import {ResultsObject} from "../util/ResultsObject";

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
  );
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
    width: '15%',
    bottom: '-30%',
    left: '10%',
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const {makeRequest, makeRequestWithFullResponse} = useApi();
  const {
    getActivities
  } = useActivity('3f3739b6-449c-4933-8524-47cea512cee7');
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [getAllActivities, setGetAllActivities] = useState<Activity[]>();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
     setValue(newValue)
  };
  const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag","Sontag"];
  const events = ["Event1", "Event2", "Event3", "Event4"];
  const announcements = ["Ankündigung1", "Ankündigung2", "Ankündigung3", "Ankündigung4"];
  const {data:results} = useSWR<ResultsObject<Activity>>(`/postboxes/3f3739b6-449c-4933-8524-47cea512cee7/activity-results?type=${ActivityType.PROGRAM}`)

  return results ? (
    <div className={classes.root}>
      <AppBar position="relative" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          orientation="vertical"
        >
          <Tab label="Program der Woche" icon={<ComputerIcon/>} {...a11yProps(0)} />
          <Tab label="Veranstaltung" icon={<EventIcon/>} {...a11yProps(1)} />
          <Tab label="Ankündingung" icon={<AnnouncementIcon/>} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UpsertActivity postboxId={'3f3739b6-449c-4933-8524-47cea512cee7'}
                               activities={results.items}
                               labels={days}
                               type={ActivityType.PROGRAM}/>
        </TabPanel>
        <TabPanel value={value} index={1}>

          <div><Event/></div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div><Announcement/></div>
        </TabPanel>

      </AppBar>
    </div>
  ) : (
    <p> Es ist einen Fehler aufgetretten</p>
  );
}
