import React from 'react';
import FooterBar from "../headerFooter/FooterBar";
import {createStyles, fade, makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import Header from "../headerFooter/Header";
import clsx from "clsx";
import HeaderMessage from "../headerFooter/HeaderMessage";
import DepartmentTabPanel from "./DepartmentTabPanel";
import {useStyle, useStyles} from "./UseStyle";
import SystemTabPanel from "./SystemTabPanel";

function SystemPostbox() {


  const classes1 = useStyle();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const classes = useStyles();
  return (
    <div className="Acc">
      <Header message={'Willkommen zum System Verwaltung'}/>
      <HeaderMessage/>
      <div className='background-image' style={
        {
          backgroundImage: "url(celebrate.png)",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '110vh',
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'absolute'
        }
      }><SystemTabPanel/>
      </div>
      <FooterBar/>
    </div>
  );
}

export default SystemPostbox;
