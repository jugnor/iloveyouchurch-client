import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import '../../css/Media.css';
import HomeList from "../container/HomeList";

export default function CreateModuleTest() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"test"} style={
            {overflowY: 'auto', overflowX: 'auto'}}>
            <HomeList/>
          </Typography>

        </Container>

      </React.Fragment>
  );
}