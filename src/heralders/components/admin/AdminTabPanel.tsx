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
import {UpsertActivity} from "./UpsertActivity";
import {Activity} from "../../models/Activity";
import GavelIcon from '@mui/icons-material/Gavel';

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

export default function AdminTabPanel() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  };

  const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sontag"];
  const events = ["Veranstaltung1", "Veranstaltung2", "Veranstaltung3", "Veranstaltung4"];
  const announcements = ["Ankündigung1", "Ankündigung2", "Ankündigung3", "Ankündigung4"];
  const penalties = ["Straffe1", "Straffe2", "Straffe3", "Straffe4"];

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
            <UpsertActivity postboxId={'4e949cda-fc03-4b66-8743-3edae335d4ea'}
                            labels={days}
                            type={ActivityType.PROGRAM}/>
        </TabPanel>
        <TabPanel value={value} index={1}>

            <UpsertActivity postboxId={'4e949cda-fc03-4b66-8743-3edae335d4ea'}
                            labels={events}
                            type={ActivityType.EVENT}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <UpsertActivity postboxId={'4e949cda-fc03-4b66-8743-3edae335d4ea'}
                            labels={announcements}
                            type={ActivityType.ANNOUNCEMENT}/>
        </TabPanel>

        <TabPanel value={value} index={3}>

            <UpsertActivity postboxId={'4e949cda-fc03-4b66-8743-3edae335d4ea'}
                            labels={penalties}
                            type={ActivityType.PENALTY}/>
        </TabPanel>
      </AppBar>
    </div>
  );
}
