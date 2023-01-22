import { styled } from '@mui/material/styles';
import _moment from 'moment';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import * as React from 'react';
import { Account } from '../../../../../../models/Account';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
export interface ResultNoteTableBodyProps {
  notes: Account[];
}

export function ResultTableBody({ notes }: ResultNoteTableBodyProps) {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  function getStatusIcon(isOk: Boolean) {
    switch (isOk) {
      case undefined:
        return (
          <DoNotDisturbOnIcon style={{ color: 'orange' }}> </DoNotDisturbOnIcon>
        );
      case true:
        return <CheckCircleIcon color="success"></CheckCircleIcon>;
      case false:
        return <CancelIcon color="error"></CancelIcon>;
    }
  }

  return (
    <TableBody>
      {notes.map((note) => (
        <StyledTableRow key={note.id}>
          <StyledTableCell align="center">{note.name}</StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.prayerAlone)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.prayerInGroup)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.prayerNight)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.bibleReading)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.christianLiteratureReading)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.meditation)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.retreat)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.gospelSupport)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.gospelSupport)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.gospelContact)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.godGiving)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.thanksGiving)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.choreRepeat)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.completeFasting)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {getStatusIcon(note.partialFasting)}
          </StyledTableCell>
          <StyledTableCell align="center" width="50%">
            {_moment.utc(note.createdAt).local().format('DD.MM.YYYY')}
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
