import React, { Suspense } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../css/Media.css';
import ComputerIcon from '@mui/icons-material/Computer';
import { ActivityType } from '../../models/ActivityType';
import { ActivityAction } from './ActivityAction';
import { FileAction } from '../system/file/FileAction';
import { ListItemIcon } from '@mui/material';
import { UserPostboxAction } from '../system/userPostbox/UserPostboxAction';
import { RegulationAction } from '../regulation/RegulationAction';

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
    left: '11%',
    position: 'revert',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.paper
  }
}));

export interface AdminTabPanelProps {
  postboxId: string;
  userId: string;
}
export default function AdminTabPanel({
  postboxId,
  userId
}: AdminTabPanelProps) {
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
            <Tab
              label="Nutzer zuordnen"
              icon={<ComputerIcon />}
              {...a11yProps(1)}
            />
            <Tab label="Charta" icon={<ComputerIcon />} {...a11yProps(2)} />
            <Tab label="Dateien" icon={<ListItemIcon />} {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ActivityAction
              postboxId={postboxId}
              menuItems={[
                ActivityType.PROGRAM + '|Program',
                ActivityType.ANNOUNCEMENT + '|Ankündigung',
                ActivityType.EVENT + '|Event',
                ActivityType.PENALTY + '|Straffe'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserPostboxAction
              currentPostboxId={postboxId}
              menuItems={Array.of()}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RegulationAction postboxId={postboxId} action={true} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <FileAction postboxId={postboxId} action={true} />
          </TabPanel>
        </AppBar>
      </div>
    </Suspense>
  );
}
