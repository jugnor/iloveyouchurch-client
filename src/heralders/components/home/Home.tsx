import React, {Suspense} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import '../../css/Media.css';
import HomeTabPanel from "./HomeTabPanel";

export default function HomeTab() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"test"} style={
            {overflowY: 'auto', overflowX: 'auto'}}>
            <Suspense fallback={null}>
            <HomeTabPanel/>
          </Suspense>
          </Typography>

        </Container>

      </React.Fragment>
  );
}
