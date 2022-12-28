import React, { Suspense } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EuroIcon from '@mui/icons-material/Euro';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BookIcon from '@mui/icons-material/Book';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import { GodGivingType } from '../../../../models/GodGiving';
import { GospelType } from '../../../../models/Gospel';
import { ReadingType } from '../../../../models/Reading';
import { PrayerType } from '../../../../models/Prayer';
import { RetreatType } from '../../../../models/Meditation';
import { FastingType } from '../../../../models/Fasting';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { GodGivingRecap } from './TabPanel/GodGivingTab/GodGivingRecap';
import { GospelRecap } from './TabPanel/GospelTab/GospelRecap';
import { ReadingRecap } from './TabPanel/ReadingTab/ReadingRecap';
import { MeditationRecap } from './TabPanel/Meditation/MeditationRecap';
import { FastingRecap } from './TabPanel/FastingTab/FastingRecap';
import { PrayerRecap } from './TabPanel/PrayerTab/PrayerRecap';
import { ReportNoteRecap } from './TabPanel/ReportNoteTab/ReportNoteRecap';

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

interface MyReportTabPanelProps {
  postboxId: string;
  userId: string;
}

export default function MyReportTabPanel({
  postboxId,
  userId
}: MyReportTabPanelProps) {
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
            <Tab label="Ehre" icon={<EuroIcon />} {...a11yProps(0)} />
            <Tab
              label="Evangelisation"
              icon={<RecordVoiceOverIcon />}
              {...a11yProps(1)}
            />
            <Tab label="Buch Lesen" icon={<BookIcon />} {...a11yProps(2)} />
            <Tab label="Gebet" icon={<GroupsIcon />} {...a11yProps(3)} />
            <Tab
              label="Meditation"
              icon={<AutoStoriesIcon />}
              {...a11yProps(4)}
            />
            <Tab
              label="Fasten"
              icon={<FreeBreakfastIcon />}
              {...a11yProps(5)}
            />
            <Tab
              label="Ergebnisse"
              icon={<ScreenSearchDesktopIcon />}
              {...a11yProps(6)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <GodGivingRecap
              postboxId={postboxId}
              userId={userId}
              path={'god-giving'}
              menuItems={[
                GodGivingType.MONEY + '|Spende',
                GodGivingType.THANKS + '|Danksagung',
                GodGivingType.CHORE + '|' + 'Probe'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GospelRecap
              postboxId={postboxId}
              userId={userId}
              path={'gospel'}
              menuItems={[
                GospelType.GOSPEL + '|Evangelisation',
                GospelType.CONTACT + '|Kontakt',
                GospelType.SUPPORT + '|Support'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReadingRecap
              postboxId={postboxId}
              userId={userId}
              path={'reading'}
              menuItems={[
                ReadingType.BIBLE + '|Bible Lesen',
                ReadingType.C_BOOK + '|Literature'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PrayerRecap
              postboxId={postboxId}
              userId={userId}
              path={'prayer'}
              menuItems={[
                PrayerType.ALONE + '|Gebet-Allein',
                PrayerType.GROUP + '|Gebet in Gruppe'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <MeditationRecap
              postboxId={postboxId}
              userId={userId}
              path={'meditation'}
              menuItems={[
                RetreatType.MEDITATION + '|Meditation',
                RetreatType.RETREAT + '|Auszeit'
              ]}
            />
          </TabPanel>

          <TabPanel value={value} index={5}>
            <FastingRecap
              postboxId={postboxId}
              userId={userId}
              path={'fasting'}
              menuItems={[
                FastingType.COMPLETE + '|Komplettes Fasten',
                FastingType.PARTIAL + '|Teil-Fasten'
              ]}
            />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ReportNoteRecap postboxId={postboxId} userId={userId} />
          </TabPanel>
        </AppBar>
      </div>
    </Suspense>
  );
}
