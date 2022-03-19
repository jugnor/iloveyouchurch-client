import * as React from 'react';
import {Fragment} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import {ActivityType} from "../../models/ActivityType";
import {useActivity} from "../../hooks/useActivity";
import {getActivityOrder} from "../admin/ActivitiesInputCustom"
import {Divider} from "@mui/material";

interface ActivityRenderProps {
  postboxId: string,
  labels: string[],
  type: ActivityType
}

export function ActivityRender({postboxId, labels, type}: ActivityRenderProps) {
  const {
    activityByTypeAndOrder
  } = useActivity(postboxId);
  const getDescription = (response: any | undefined): string => {
    if (response !== undefined) {
      if (response.description !== undefined) {
        return response.description;
      }
    }

    return "";
  };

  return (
    <Box sx={{width: '100%', maxWidth: 500}}>
      <Container>
        <Typography component="div" className={"program"} style={
          {overflowY: 'auto'}}>
          <br/>
          <br/>
          {labels.map((label, index) => (
            <Fragment>
              <Typography color={"blue"} variant="h4" gutterBottom component="div">
                {label}:
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                {getDescription(activityByTypeAndOrder(type, getActivityOrder(index + 1)))}
              </Typography>
              <Divider/>
              <br/>
            </Fragment>
          ))}
        </Typography>
      </Container>
    </Box>
  );
}
