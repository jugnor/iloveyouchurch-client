import React, {Suspense} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import '../../css/Media.css';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import {DataGridRenderer} from "../DataGridRenderer";
import {ActivityAction} from "../activity/ActivityAction";
import {ActivityType} from "../../models/ActivityType";
import ComputerIcon from "@mui/icons-material/Computer";

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
    position: 'revert',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CensorTabPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const postboxId: string = '9f756ec7-2692-4540-a57e-9f26e7df3247'
  const userId: string = 'fd3cf575-5390-4c59-8a8a-4a448e6618c2'
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (<Suspense fallback={null}>
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
            <Tab label="Berichte Überprüfen" icon={<ScreenSearchDesktopIcon/>} {...a11yProps(0)} />
            <Tab label="Aktivitäten" icon={<ComputerIcon/>} {...a11yProps(1)} />          </Tabs>
          <TabPanel value={value} index={0}>
            <div><DataGridRenderer postboxId={postboxId}
                                   userId={userId} path={''}
                                   type={"Censor"}
                                   menuItems={[]}/></div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ActivityAction postboxId={postboxId}
                            menuItems={[ActivityType.PENALTY + "|Straffe"]}/>
          </TabPanel>
        </AppBar>
      </div>
    </Suspense>
  );
}
