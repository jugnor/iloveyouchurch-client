import * as React from 'react';
import {Fragment, useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Button from "@mui/material/Button";
import SaveIcon from "@material-ui/icons/Save";
import {useActivity} from "../../hooks/useActivity";
import {
  Activity,
  CreateActivityRequest,
  CreateActivityRequestSchema,
  UpdateActivityRequest
} from "../../models/Activity";
import {ActivityType} from "../../models/ActivityType";
import {ActivityOrder} from "../../models/ActivityOrder";
import {getActivityOrder} from "./ActivitiesInputCustom";

export interface UpsertActivityFormData {
  activity: Partial<CreateActivityRequest | UpdateActivityRequest>
}

interface UpsertActivityProps {
  postboxId: string,
  activities: Activity[],
  labels: string[],
  type: ActivityType,
}

export function UpsertActivity({postboxId, activities, labels, type}: UpsertActivityProps) {

  const {
    createActivity
  } = useActivity(postboxId);


  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [createdActivity, setCreatedActivity] = useState<Activity>();
  const [formData, setFormData] = useState<UpsertActivityFormData>(
    {
      activity: {
        description: '',
        activityType: ActivityType.PROGRAM,
        activityOrder: ActivityOrder.ORDER1
      }
    }
  );

  const onCreate = useCallback(async () => {
    if (
      !CreateActivityRequestSchema.validate(formData.activity).error
    ) {
      setLoading(true);
      const newActivity = await createActivity(
        formData.activity as CreateActivityRequest,
        true
      );
      if (newActivity !== undefined) {

        setCreatedActivity(newActivity);
        setLoading(false);
        //  alert("Das neues program wurde erfolgreich gespeichert");
      }
    } else {
      alert("Das neues Program konnte nicht gespeichert werden");
    }
  }, [createActivity, formData]);

  return activities ?(
    <> <Box sx={{width: '100%', maxWidth: 500}}>
      <Container>
        <Typography component="div" className={"program"} style={
          {overflowY: 'auto'}}>
          {labels.map((label, index) => (
            <Fragment>
              <Typography variant="h3" gutterBottom component="div">
              </Typography><TextField
              id="outlined-textarea"
              fullWidth={true}
              label={label}
              placeholder={activities[index]!==undefined?activities[index].description:" "}
              multiline
              variant="outlined"
              onChange={(data) => {
                setFormData({
                  activity: {
                    description: data.target.value,
                    activityType: type,
                    activityOrder: getActivityOrder(index + 1)
                  }
                });
                setDescription(data.target.value)
              }}/>

              <br/>
              <br/>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon/>}
                  onClick={() => onCreate()}
                >
                  Speichern
                </Button>
              </div>
              <Divider/>
            </Fragment>
          ))}

        </Typography>
      </Container>
    </Box>
    </>
  ) : null;
}
