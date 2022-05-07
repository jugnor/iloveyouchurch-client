import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import '../../../css/Media.css';
import AdminTabPanel from "./AdminTabPanel";
import { Suspense } from 'react';
export default function AdminTab() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"test"} style={
            {overflowY: 'auto', overflowX: 'auto'}}>
            <Suspense fallback={null}>
              <AdminTabPanel/>
            </Suspense>

          </Typography>

        </Container>

      </React.Fragment>
  );
}
