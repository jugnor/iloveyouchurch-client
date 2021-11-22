import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from "@material-ui/core/Container";

export default function Types() {
  return (
      <Box sx={{width: '100%', maxWidth: 500}}>
        <Container>
          <Typography component="div" className={"program"} style={
            {overflowY: 'auto'}}>
            <Typography variant="h3" gutterBottom component="div">
              Woche : ----------
            </Typography>
            <Typography variant="h4" gutterBottom component="div">
              Sonntag: Gottesdienst
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Montag: 30 min Gebet in Gruppe
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Dienstag:
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Mittwoch:
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Donnerstag:
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Freitag:
            </Typography>
            <br/>
            <Typography variant="h4" gutterBottom component="div">
              Samstag:
            </Typography>

          </Typography>
        </Container>
      </Box>
  );
}