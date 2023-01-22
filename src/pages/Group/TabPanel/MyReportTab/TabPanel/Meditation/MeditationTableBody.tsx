import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Meditation } from '../../../../../../models/Meditation';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
import _moment from 'moment';
export interface MeditationTableBodyProps {
  meditations: Meditation[];
}

export function MeditationTableBody({ meditations }: MeditationTableBodyProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleText = (openDialog: boolean, text: string) => {
    setOpenDialog(openDialog);
    setText(text);
  };
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
      fontSize: 15
    }
  }));

  return (
    <>
      {openDialog ? (
        <TextDialog
          handleText={handleText}
          openDialog={openDialog}
          textDialog={text}
        />
      ) : (
        <TableBody>
          {meditations.map((meditation) => (
            <StyledTableRow key={meditation.id}>
              <StyledTableCell align="left">{meditation.total}</StyledTableCell>
              <StyledTableCell align="right">
                {meditation.timeInMinute}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleText(true, meditation.theme)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleText(true, meditation.verse)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                {meditation.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                {_moment
                  .utc(meditation.createdAt)
                  .local()
                  .format('DD.MM.YYYY, HH:mm')}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </>
  );
}
