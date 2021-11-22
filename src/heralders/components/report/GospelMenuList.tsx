import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../../css/Media.css';
import FormDialogGospel from "../container/gospel/FormCreateGospel";
import FormDialogGospelContact from "../container/gospel/FormCreateGospelContact";
import FormDialogGospelSupport from "../container/gospel/FormCreateGospelSupport";

export default function GospelMenuList() {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Container>
          <Typography component="div" className={"gospel"} style={
            {overflowY: 'auto'}}>
            <br/>
            <FormDialogGospel/>
            <br/>
            <FormDialogGospelContact/>
            <br/>
            <FormDialogGospelSupport/>
            <br/>
          </Typography>

        </Container>

      </React.Fragment>
  );
}