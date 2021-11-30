import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import '../../css/Media.css';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import ReportCheck from "../censor/ReportCheck";

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
    bottom: '-85%',
    left: '10%',
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
            <Tab label="Berichte Überprüfen" icon={<ScreenSearchDesktopIcon/>} {...a11yProps(0)} />

          </Tabs>
          <TabPanel value={value} index={0}>
            <div><ReportCheck/></div>
          </TabPanel>

        </AppBar>
      </div>

  );
}
