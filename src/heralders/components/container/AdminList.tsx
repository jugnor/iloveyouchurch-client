import React, {useState} from "react";
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
import {ActivityType} from "../../models/ActivityType";
import {useActivity} from "../../hooks/useActivity";
import {UpsertActivity} from "../admin/UpsertActivity";
import {Activity} from "../../models/Activity";
import {useApi} from "../../hooks/useApi";
import useSWR from 'swr'
import {ResultsObject} from "../util/ResultsObject";
import GavelIcon from '@mui/icons-material/Gavel';
import {getActivities} from "../admin/CallActivity";

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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [getAllActivities, setGetAllActivities] = useState<Activity[]>();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  };
  const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sontag"];
  const events = ["Event1", "Event2", "Event3", "Event4"];
  const announcements = ["Ankündigung1", "Ankündigung2", "Ankündigung3", "Ankündigung4"];
  const penalties = ["Straffe1", "Straffe2", "Straffe3", "Straffe4"];
  const {data: programResults} = getActivities("3f3739b6-449c-4933-8524-47cea512cee7",ActivityType.PROGRAM)
  const {data: eventResults} = getActivities("3f3739b6-449c-4933-8524-47cea512cee7",ActivityType.EVENT)
  const {data: announcementResults} = getActivities("3f3739b6-449c-4933-8524-47cea512cee7",ActivityType.ANNOUNCEMENT)
  const {data: penaltyResults} =getActivities("3f3739b6-449c-4933-8524-47cea512cee7",ActivityType.PENALTY)

  return (
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
          <Tab label="Straffe" icon={<GavelIcon/>} {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {programResults ? (
            <UpsertActivity postboxId={'3f3739b6-449c-4933-8524-47cea512cee7'}
                            activities={programResults.items}
                            labels={days}
                            type={ActivityType.PROGRAM}/>) : (
            <p> Es ist einen Fehler aufgetretten: Das Program der Woche kann nicht angezeigt
              werden.</p>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {eventResults ? (
            <UpsertActivity postboxId={'3f3739b6-449c-4933-8524-47cea512cee7'}
                            activities={eventResults.items}
                            labels={events}
                            type={ActivityType.EVENT}/>) : (
            <p> Es ist einen Fehler aufgetretten: Die Veranstaltungen können nicht angezeigt
              werden.</p>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {announcementResults ? (
            <UpsertActivity postboxId={'3f3739b6-449c-4933-8524-47cea512cee7'}
                            activities={announcementResults.items}
                            labels={announcements}
                            type={ActivityType.ANNOUNCEMENT}/>) : (
            <p> Es ist einen Fehler aufgetretten: Die Ankündigungen können nicht angezeigt
              werden.</p>
          )}
        </TabPanel>

        <TabPanel value={value} index={3}>
          {penaltyResults ? (
            <UpsertActivity postboxId={'3f3739b6-449c-4933-8524-47cea512cee7'}
                            activities={penaltyResults.items}
                            labels={penalties}
                            type={ActivityType.PENALTY}/>) : (
            <p> Es ist einen Fehler aufgetretten: Die Straffen können nicht angezeigt werden.</p>)}
        </TabPanel>
      </AppBar>
    </div>
  );
}
