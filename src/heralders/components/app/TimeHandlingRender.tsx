import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import {endOfWeek, startOfWeek} from "date-fns";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";


const defaultTheme = createTheme();

export const useStyles = makeStyles(
  (theme) => ({
    actions: {
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  {defaultTheme},
);


export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const startWeekString = (valueDate: Date|null) => {
  if (valueDate) {
    const startOfW = startOfWeek(valueDate);
    return startOfW.toISOString();
  }
  return "";
}

export const endWeekString = (valueDate: Date|null) => {
  if (valueDate) {
    const endOfW = endOfWeek(valueDate);
    return endOfW.toISOString();
  }
  return "";
}
