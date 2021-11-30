import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Button from "@mui/material/Button";
import SaveIcon from "@material-ui/icons/Save";

export default function Types() {
  const [event1, setEvent1] = React.useState("");
  const [event2, setEvent2] = React.useState("");
  const [event3, setEvent3] = React.useState("");
  const [event4, setEvent4] = React.useState("");
  const [event5, setEvent5] = React.useState("");

  return (
      <Box sx={{width: '100%', maxWidth: 500}}>
        <Container>

          <Typography component="div" className={"program"} style={
            {overflowY: 'auto'}}>
            <Typography variant="h3" gutterBottom component="div">
            </Typography>
            <br/>
            <br/>
            <br/>
            <TextField
                id="outlined-textarea"
                fullWidth={true}
                label="Ankündigung 1"
                placeholder=""
                multiline
                variant="outlined"
                onChange={e1 => {
                  setEvent1(e1.target.value)
                }
                } value={event1}
            />

            <Divider/>
            <Typography variant="h4" gutterBottom component="div">
            </Typography>
            <TextField
                id="outlined-textarea"
                fullWidth={true}
                label="Ankündigung 2"
                placeholder=""
                multiline
                variant="outlined"
                onChange={e2 => {
                  setEvent2(e2.target.value)
                }
                } value={event2}
            />
            <Divider/>
            <Typography variant="h4" gutterBottom component="div">
            </Typography>
            <TextField
                id="outlined-textarea"
                fullWidth={true}
                label="Ankündigung 3"
                placeholder=""
                multiline
                variant="outlined"
                onChange={e3 => {
                  setEvent3(e3.target.value)
                }
                } value={event3}
            />
            <Divider/>
            <Typography variant="h4" gutterBottom component="div">
            </Typography>
            <TextField
                id="outlined-textarea"
                fullWidth={true}
                label="Ankündigung 4"
                placeholder=""
                multiline
                variant="outlined"
                onChange={e4 => {
                  setEvent4(e4.target.value)
                }
                } value={event4}
            />
            <Divider/>
            <Typography variant="h4" gutterBottom component="div">
            </Typography>
            <TextField
                id="outlined-textarea"
                fullWidth={true}
                label="Ankündigung 5"
                placeholder=""
                multiline
                variant="outlined"
                onChange={e5 => {
                  setEvent5(e5.target.value)
                }
                } value={event5}
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