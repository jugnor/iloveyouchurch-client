import React, {Suspense} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import '../../css/Media.css';
import ComputerIcon from '@mui/icons-material/Computer';
import {UserAction} from "./user/UserAction";
import {UserPostboxAction} from "./userPostbox/UserPostboxAction";
import useSWR from "swr";
import {ResultsObject} from "../../models/ResultsObject";
import {PostboxModel} from "../../models/PostboxModel";

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
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface UserTabPanelProps {
  postboxId: string
  userId: string
}

export function UserTabPanel({postboxId, userId}: UserTabPanelProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: postboxes,
  } =
    useSWR<PostboxModel[]>
    (`/postboxes`);

  const extractPostboxes = (): string[] => {
    if (postboxes !== undefined) {
      return postboxes.map(item => item.id + "|" + item.name)
    }
    return [];
  }

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
            <Tab label="Registrierung" icon={<ComputerIcon/>} {...a11yProps(0)} />
            <Tab label="Nutzer zuordnen" icon={<ComputerIcon/>} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <UserAction/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserPostboxAction postboxId={postboxId} menuItems={extractPostboxes()}/>
          </TabPanel>
        </AppBar>
      </div>
    </Suspense>
  );
}
