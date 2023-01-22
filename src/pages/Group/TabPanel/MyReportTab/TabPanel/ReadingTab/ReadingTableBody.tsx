import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Reading } from '../../../../../../models/Reading';
import _moment from 'moment/moment';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
export interface ReadingTableBodyProps {
  readings: Reading[];
}

export function ReadingTableBody({ readings }: ReadingTableBodyProps) {
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
          {readings.map((reading) => (
            <StyledTableRow key={reading.id}>
              <StyledTableCell align="left">{reading.title}</StyledTableCell>
              <StyledTableCell align="right">
                {reading.totalCap}
              </StyledTableCell>
              <StyledTableCell align="right">
                {reading.timeInMinute}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleText(true, reading.theme)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                {reading.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {_moment
                  .utc(reading.createdAt)
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
