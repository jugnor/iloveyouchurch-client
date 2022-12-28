import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { Gospel, GospelType } from '../../../../../../models/Gospel';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
import _moment from 'moment/moment';
export interface GospelTableBodyProps {
  gospels: Gospel[];
}

export function GospelTableBody({ gospels }: GospelTableBodyProps) {
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
          {gospels.map((gospel) => (
            <StyledTableRow key={gospel.id}>
              {gospel.gospelType === GospelType.GOSPEL && (
                <>
                  <StyledTableCell
                    align="left"
                    onClick={() => handleText(true, gospel.goal)}
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {gospel.total}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {gospel.timeInMinute}
                  </StyledTableCell>
                </>
              )}
              {gospel.gospelType === GospelType.CONTACT && (
                <>
                  <StyledTableCell
                    align="left"
                    onClick={() => handleText(true, gospel.gospelContact.name)}
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => handleText(true, gospel.gospelContact.email)}
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => handleText(true, gospel.gospelContact.city)}
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() =>
                      handleText(true, gospel.gospelContact.telephone)
                    }
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                </>
              )}
              {gospel.gospelType === GospelType.SUPPORT && (
                <>
                  <StyledTableCell
                    align="left"
                    onClick={() => handleText(true, gospel.gospelSupport.title)}
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() =>
                      handleText(true, gospel.gospelSupport.supportType)
                    }
                  >
                    {' '}
                    <button style={{ cursor: 'pointer', color: 'blue' }}>
                      Details...
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {gospel.total}
                  </StyledTableCell>
                </>
              )}
              <StyledTableCell align="right">
                {gospel.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                {_moment
                  .utc(gospel.createdAt)
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
