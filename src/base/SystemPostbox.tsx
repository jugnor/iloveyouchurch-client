import React, {useEffect} from 'react';
import FooterBar from "../headerFooter/FooterBar";
import {createStyles, fade, makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import Header from "../headerFooter/Header";
import clsx from "clsx";
import HeaderMessage from "../headerFooter/HeaderMessage";
import DepartmentTabPanel from "./DepartmentTabPanel";
import {useStyle, useStyles} from "./UseStyle";
import SystemTabPanel from "./SystemTabPanel";
import useSWR from "swr";
import {FileModel} from "../models/File";
import {useUserProperties} from "../hooks/useUserProperties";
import {ResultsObject} from "../models/ResultsObject";
import {UserModel} from "../models/UserModel";
import {Activity} from "../models/Activity";
import {ActivityType} from "../models/ActivityType";
import {useFile} from "../hooks/useFile";

function SystemPostbox() {


  const classes1 = useStyle();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const description = 'BG';

  const {
    currentPostboxId,
  } = useUserProperties();

  const {
    data:fileString,
  } =
    useSWR<string>
    (`/postboxes/${currentPostboxId}/files-description/${description}?mimeType=image`);

  let imageUri:string ="";
  if(fileString!==undefined){
  imageUri=  encodeURI(fileString)
  }

  const {
    data:news
  } =
    useSWR<ResultsObject<Activity>>
    (`/postboxes/${currentPostboxId}/activity-results?` +
      `type=${ActivityType.NEWS}&size=100&sortBy=CREATED_AT&order=DESC`);

  const classes = useStyles();
  return news?(
<>  <div className="Acc" >
      <Header message={'Willkommen zur System Verwaltung'}/>
      <div className='background-image' style={
        {
          backgroundImage: "url('data:image/jpeg;base64,"+imageUri+"')",
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
    </div></>
  ):<>Es ist etwas schiefgelaufen</>;
}

export default SystemPostbox;
