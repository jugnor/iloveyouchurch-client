import * as React from 'react';
import {Fragment, useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {getActivity} from "./CallActivity";
import {SWRResponse} from "swr";
import validate = WebAssembly.validate;

export interface UpsertActivityFormData {
  activity: Partial<CreateActivityRequest | UpdateActivityRequest>
}

interface UpsertActivityProps {
  postboxId: string,
  activities: Activity[],
  labels: string[],
  type: ActivityType,
}

export const toLoad = (load: boolean): boolean => {
  return load
}

export function

UpsertActivity({postboxId, activities, labels, type}: UpsertActivityProps) {

  const {
    createActivity
  } = useActivity(postboxId);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLoading = () => {
    setOpen(false);
  };

  const getDescription= (response: any|undefined): string => {

      if(response===""){
        console.log("FFFF")
        return "";
      }
    if (response!== undefined) {
      if (response.description !== undefined) {
        return response.description;
        console.log("WWWWW")
      }
    }

    return "";
  };
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [createdActivity, setCreatedActivity] = useState<Activity>();
  const [formData, setFormData] = useState<UpsertActivityFormData>(
    {
      activity: {
        description: '',
        activityType: type,
        activityOrder: ActivityOrder.ORDER1
      }
    }
  );

  const onCreate = useCallback(async () => {
    if (
      !CreateActivityRequestSchema.validate(formData.activity).error
    ) {

      const newActivity = await createActivity(
        formData.activity as CreateActivityRequest,
        true
      );
      if (newActivity !== undefined) {

        setCreatedActivity(newActivity);

        // alert("Das neues program wurde erfolgreich gespeichert");
        setOpen(false);
        setLoading(true);
      }
    } else {
      if (description !== '') {
        alert(CreateActivityRequestSchema.validate(formData.activity).error);
      }
      setOpen(false);
      setLoading(true);
    }
  }, [createActivity, formData]);

  return  (
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
              //placeholder={activities[index]!==undefined?activities[index].description:" "}
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
                setLoading(true)
              }}
              // defaultValue={activities[index] !== undefined ? activities[index].description : ""}/>
              defaultValue={getDescription(getActivity(postboxId, type, getActivityOrder(index + 1))?getActivity(postboxId, type, getActivityOrder(index + 1)):"")}/>
              <br/>
              <br/>
              <div style={{float: 'right'}}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon/>}
                  onClick={handleClickOpen}
                >
                  Speichern
                </Button>
              </div>
              <br/>
              <br/>
            </Fragment>
          ))}
        </Typography>
        {open && description !== '' && (
          <div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Änderung Übernehmen"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Willst du wirklich die Änderung speichern ?
                  Die aktuelle Information wird überschrieben
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Nein Zurück</Button>
                <Button onClick={() => onCreate()}>Ja ich will</Button>
              </DialogActions>
            </Dialog>
          </div>)}
      </Container>
    </Box>
    </>
  );
}
