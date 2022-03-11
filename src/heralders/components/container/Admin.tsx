import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import '../../css/Media.css';
import AdminList from "../container/AdminList";
import { Suspense } from 'react';
export default function CreateModuleTest() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"test"} style={
            {overflowY: 'auto', overflowX: 'auto'}}>
            <Suspense fallback={null}>
              <AdminList/>
            </Suspense>

          </Typography>

        </Container>

      </React.Fragment>
  );
}
