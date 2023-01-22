import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Reading } from '../../../../../../models/Reading';
import { Prayer, PrayerType } from '../../../../../../models/Prayer';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
import _moment from 'moment';
export interface PrayerTableBodyProps {
  prayers: Prayer[];
}

export function PrayerTableBody({ prayers }: PrayerTableBodyProps) {
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
          {prayers.map((prayer) => (
            <StyledTableRow key={prayer.id}>
              <StyledTableCell align="left">
                {prayer.timeInMinute}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleText(true, prayer.theme)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              {prayer.prayerType === PrayerType.GROUP && (
                <StyledTableCell align="right">
                  {prayer.prayerNight}
                </StyledTableCell>
              )}
              <StyledTableCell align="right">
                {prayer.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                {_moment
                  .utc(prayer.createdAt)
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
