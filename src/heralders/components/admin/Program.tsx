import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import WeekPicker from "../util/WeekPicker";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Button from "@mui/material/Button";
import SaveIcon from "@material-ui/icons/Save";
export default function Types() {



  const [monday, setMonday] = React.useState("");
  const [tuesday, setTuesday] = React.useState("");
  const [wednesday, setWednesday] = React.useState("");
  const [thursday, setThursday] = React.useState("");
  const [friday, setFriday] = React.useState("");
  const [saturday, setSaturday] = React.useState("");
  const [sunday, setSunday] = React.useState("");

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
                onChange={mon => {
                  setMonday(mon.target.value)
                }
                } value={monday}
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
                } value={tuesday}
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
                } value={wednesday}
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
                } value={thursday}
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
                } value={friday}
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
                } value={saturday}
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
                } value={sunday}
            />

            <br/>
            <br/>
            <div>

              <Button
                  variant="contained"
                  color="primary"
                  size="large"

                  startIcon={<SaveIcon/>}
              >
                Speichern
              </Button>
            </div>
          </Typography>
        </Container>
      </Box>
  );
}