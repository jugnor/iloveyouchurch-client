import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Activity } from '../models/Activity';
interface FootBarBarProps {
  news: Activity[];
}

export default function FootBarBar({ news }: FootBarBarProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {},

      title: {
        flexGrow: 1
      }
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        style={{
          top: '120vh',
          overflowY: 'auto',
          backgroundColor: 'rgba(255,255,255,0.2)'
        }}
      >
        <Toolbar>
          <Typography variant="h6">News</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
