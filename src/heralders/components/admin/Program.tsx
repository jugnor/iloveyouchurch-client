import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import WeekPicker from "../util/WeekPicker";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Button from "@mui/material/Button";
import SaveIcon from "@material-ui/icons/Save";
import {useTranslation} from 'react-i18next';
import {useActivity} from "../../hooks/useActivity";
import {
  Activity,
  CreateActivityRequest,
  CreateActivityRequestSchema,
  instanceOfActivity,
  UpdateActivityRequest,
  UpdateActivityRequestSchema
} from "../../models/Activity";

export interface UpsertActivityFormData {
  activity: Partial<CreateActivityRequest | UpdateActivityRequest>
}

interface UpsertCaseModalProps {
  activityToUpdate?: Activity;
  initialStep?: 0 | 1 | 2;
  onClose: () => void;
  postboxId: string;
}

export function UpsertCaseModal({
                                  activityToUpdate,
                                  initialStep,
                                  onClose,
                                  postboxId
                                }: UpsertCaseModalProps) {


  const [monday, setMonday] = React.useState("");
  const [tuesday, setTuesday] = React.useState("");
  const [wednesday, setWednesday] = React.useState("");
  const [thursday, setThursday] = React.useState("");
  const [friday, setFriday] = React.useState("");
  const [saturday, setSaturday] = React.useState("");
  const [sunday, setSunday] = React.useState("");
  const {createActivity, updateActivity,getActivities} = useActivity(postboxId);
  const {t} = useTranslation();
  const updateMode = useMemo(
    () => instanceOfActivity(activityToUpdate),
    [activityToUpdate]
  );

  const [loading, setLoading] = useState(false);
  const [createdActivity, setCreatedActivity] = useState<Activity>();
  const [ activities, setActivities] = useState<Activity[]>();
  const [formData, setFormData] = useState<UpsertActivityFormData>(
    {
      activity: {
        description: activityToUpdate?.description,
        activityType: activityToUpdate?.activityType,
        week: activityToUpdate?.week
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
      }
    }
  }, [createActivity, formData]);

  const onGetActivities = useCallback(async () => {

      const newActivities = await getActivities();
      if (newActivities  !== undefined) {
        setActivities(newActivities)
        setLoading(false);
      }

  }, [activities]);

  const onUpdate = useCallback(async () => {
    if (
      activityToUpdate &&
      !UpdateActivityRequestSchema.validate(formData.activity).error
    ) {
      setLoading(true);

      const updatedActivity = await updateActivity(
        activityToUpdate.id,
        formData.activity as UpdateActivityRequest,
        true
      );

      if (updatedActivity !== undefined) {


        setLoading(false);

        alert('success: Änderungen gespeichert.');

        onClose();
      }
    }
  }, [
    alert,
    activityToUpdate,
    formData.activity,
    onClose,
    t,
    updateActivity
  ]);

  return (
    <Box sx={{width: '100%', maxWidth: 500}}>
      <Container>

        <Typography component="div" className={"program"} style={
          {overflowY: 'auto'}}>
          <WeekPicker/>
          <Typography variant="h3" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Montag"
            placeholder=""
            multiline
            variant="outlined"
            onLoad={onGetActivities}
            onChange={mon => {
              setMonday(mon.target.value)
            }
            } value={activities?.at(0)?.description}
          />

          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Dienstag"
            placeholder=""
            multiline
            variant="outlined"
            onChange={tue => {
              setTuesday(tue.target.value)
            }
            } value={activities?.at(1)?.description}
          />
          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Mitwoch"
            placeholder=""
            multiline
            variant="outlined"
            onChange={wed => {
              setWednesday(wed.target.value)
            }
            }   value={activities?.at(2)?.description}
          />
          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Donnerstag"
            placeholder=""
            multiline
            variant="outlined"
            onChange={don => {
              setThursday(don.target.value)
            }
            } value={activities?.at(3)?.description}
          />
          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Freitag"
            placeholder=""
            multiline
            variant="outlined"
            onChange={fri => {
              setFriday(fri.target.value)
            }
            } value={activities?.at(4)?.description}
          />
          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Samstag"
            placeholder=""
            multiline
            variant="outlined"
            onChange={sat => {
              setSaturday(sat.target.value)
            }
            } value={activities?.at(5)?.description}
          />
          <Divider/>
          <Typography variant="h4" gutterBottom component="div">
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth={true}
            label="Sontag"
            placeholder=""
            multiline
            variant="outlined"
            onChange={sun => {
              setSunday(sun.target.value)
            }
            } value={activities?.at(6)?.description}
          />

          <br/>
          <br/>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon/>}
              onClick={onCreate}
            >
              Speichern
            </Button>
          </div>
        </Typography>
      </Container>
    </Box>
  );
}
