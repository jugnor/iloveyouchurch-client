import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import { HomeTabPanel } from './HomeTab/TabPanel/HomeTabPanel';
import MyReportTabPanel from './MyReportTab/MyReportTabPanel';
import AdminTabPanel from '../../../app/activity/AdminTabPanel';
import { useUserProperties } from '../../../hooks/useUserProperties';
import useSWR from 'swr';
import { UserPostboxModel } from '../../../models/UserPostboxModel';
import { UserRole } from '../../../models/UserModel';
import { AccountGivingTabPanel } from './AccountGivingTab/TabPanel/AccountGivingTabPanel';
import { CensorTabPanel } from './CensorTab/TabPanel/CensorTabPanel';

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
    width: '100%',
    backgroundColor: 'transparent'
  }
}));

export default function DepartmentTabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { currentPostboxId, userId, isSystemAdmin } = useUserProperties();

  const { data: userPostbox } = useSWR<UserPostboxModel>(
    `/users/${userId}/postbox/{userId}`
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return currentPostboxId && userId ? (
    <div className={classes.root} style={{ position: 'absolute' }}>
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
          <Tab label="Zu Hause" icon={<MeetingRoomIcon />} {...a11yProps(0)} />
          <Tab
            label="Rechenschaft ziehen"
            icon={<CreateIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label="Meine Berichte"
            icon={<MenuBookIcon />}
            {...a11yProps(2)}
          />
          {userPostbox?.userRole === UserRole.MONITOR ||
          userPostbox?.userRole === UserRole.ADMIN ||
          isSystemAdmin ? (
            <Tab label="Zensor" icon={<GavelIcon />} {...a11yProps(3)} />
          ) : (
            ''
          )}
          {userPostbox?.userRole === UserRole.ADMIN || isSystemAdmin ? (
            <Tab
              label="Leiter"
              icon={<SupervisorAccountIcon />}
              {...a11yProps(4)}
            />
          ) : (
            ''
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomeTabPanel postboxId={currentPostboxId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountGivingTabPanel postboxId={currentPostboxId} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyReportTabPanel postboxId={currentPostboxId} userId={userId} />
      </TabPanel>
      {userPostbox?.userRole === UserRole.MONITOR ||
      userPostbox?.userRole === UserRole.ADMIN ||
      isSystemAdmin ? (
        <TabPanel value={value} index={3}>
          <CensorTabPanel postboxId={currentPostboxId} userId={userId} />
        </TabPanel>
      ) : (
        ''
      )}
      {userPostbox?.userRole === UserRole.ADMIN || isSystemAdmin ? (
        <TabPanel value={value} index={4}>
          <AdminTabPanel postboxId={currentPostboxId} userId={userId} />
        </TabPanel>
      ) : (
        ''
      )}
    </div>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
