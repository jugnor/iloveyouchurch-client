import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { GodGiving, GodGivingType } from '../../../../../../models/GodGiving';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
import _moment from 'moment/moment';
export interface GodGivingTableBodyProps {
  godGivings: GodGiving[];
}

export function GodGivingTableBody({ godGivings }: GodGivingTableBodyProps) {
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
      fontSize: 14
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
          {godGivings.map((godGiving) => (
            <StyledTableRow key={godGiving.id}>
              <StyledTableCell
                align="left"
                onClick={() => handleText(true, godGiving.description)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              {(godGiving.godGivingType === GodGivingType.THANKS ||
                godGiving.godGivingType === GodGivingType.CHORE) && (
                <>
                  <StyledTableCell align="left">
                    {godGiving.total}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {godGiving.timeInMinute}
                  </StyledTableCell>
                </>
              )}
              {godGiving.godGivingType === GodGivingType.MONEY && (
                <StyledTableCell align="left">
                  {godGiving.amount}
                </StyledTableCell>
              )}
              <StyledTableCell align="right">
                {godGiving.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {_moment
                  .utc(godGiving.createdAt)
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
