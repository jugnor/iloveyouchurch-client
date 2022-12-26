import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { Fasting } from '../../../../../../models/Fasting';
import * as React from 'react';
import {TextDialog} from "../../../../../../shared/TextDialog";
export interface FastingTableBodyProps {
  fastings: Fasting[];
}

export function FastingTableBody({
  fastings
}: FastingTableBodyProps) {
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
        <TextDialog handleText={handleText} openDialog={openDialog} textDialog={text}/>
      ) : (
        <TableBody>
          {fastings.map((fasting) => (
            <StyledTableRow key={fasting.id}>
              <StyledTableCell align="left">{fasting.days}</StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleText(true, fasting.goal)}
              >
                Details...
              </StyledTableCell>
              <StyledTableCell align="right">
                {fasting.weekOfYear}
              </StyledTableCell>
              <StyledTableCell align="right">
                {fasting.createdAt}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </>
  );
}
