import React, { useMemo } from 'react';
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
import { useUserProperties } from '../../../hooks/useUserProperties';
import useSWR from 'swr';
import { GroupRole } from '../../../models/UserModel';
import { AccountGivingTabPanel } from './AccountGivingTab/TabPanel/AccountGivingTabPanel';
import { CensorTabPanel } from './CensorTab/TabPanel/CensorTabPanel';
import LeaderTabPanel from './LeaderTab/LeaderTabPanel';
import { GroupModel } from '../../../models/GroupModel';
import {useParams} from "react-router-dom";

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

export default function GroupTabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { currentGroupId, userId, isAdmin } = useUserProperties();

  const elementUrl = useMemo(() => {
    return `/api/groups/subGroups/${currentGroupId}`;
  }, [currentGroupId]);

  const { data: groupModel } = useSWR<GroupModel>(elementUrl, {
    suspense: false
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  console.log("groupM",groupModel)

  return currentGroupId && userId && groupModel ? (
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
          {(groupModel?.groupRole === GroupRole.CENSOR.toString() ||
            groupModel?.groupRole === GroupRole.LEAD.toString() ||
            isAdmin) && (
            <Tab label="Zensor" icon={<GavelIcon />} {...a11yProps(3)} />
          )}
          {(groupModel?.groupRole === GroupRole.LEAD.toString() || isAdmin) && (
            <Tab
              label="Leiter"
              icon={<SupervisorAccountIcon />}
              {...a11yProps(4)}
            />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomeTabPanel groupName={groupModel.groupName} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountGivingTabPanel
          groupName={groupModel.groupName}
          userId={userId}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyReportTabPanel groupName={groupModel.groupName} userId={userId} />
      </TabPanel>
      {(groupModel?.groupRole === GroupRole.CENSOR.toString() ||
        groupModel?.groupRole === GroupRole.LEAD.toString() ||
        isAdmin) && (
        <TabPanel value={value} index={3}>
          <CensorTabPanel groupName={groupModel.groupName} />
        </TabPanel>
      )}
      {(groupModel?.groupRole === GroupRole.LEAD.toString() || isAdmin) && (
        <TabPanel value={value} index={4}>
          <LeaderTabPanel groupName={groupModel.groupName} userId={userId} />
        </TabPanel>
      )}
    </div>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
