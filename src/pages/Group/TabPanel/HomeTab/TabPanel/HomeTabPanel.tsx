import React, { Suspense } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../../../../css/Media.css';
import ComputerIcon from '@mui/icons-material/Computer';

import { ActivityRecap } from './ActivityTab/ActivityRecap';

import { RegulationRecap } from './RegulationTab/RegulationRecap';
import { FileRecap } from './FileTab/FileRecap';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '15%',
    bottom: '-30%',
    left: '10%',
    position: 'revert',
    backgroundColor: theme.palette.background.paper
  }
}));
export interface HomeTabPanelProps {
  groupName: string;
}
export function HomeTabPanel({ groupName }: HomeTabPanelProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Suspense fallback={null}>
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
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
            <Tab
              label="Aktivitäten"
              icon={<ComputerIcon />}
              {...a11yProps(0)}
            />
            <Tab label="Charta" icon={<ComputerIcon />} {...a11yProps(1)} />
            <Tab label="Dateien" icon={<ComputerIcon />} {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ActivityRecap groupName={groupName} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegulationRecap groupName={groupName} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FileRecap groupName={groupName} />
          </TabPanel>
        </AppBar>
      </div>
    </Suspense>
  );
}
