import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import '../../css/Media.css';
import AdminList from "../container/AdminList";

export default function CreateModuleTest() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"test"} style={
            {overflowY: 'auto', overflowX: 'auto'}}>
            <AdminList/>
          </Typography>

        </Container>

      </React.Fragment>
  );
}