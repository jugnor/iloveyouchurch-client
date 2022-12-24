import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Reading } from '../../../../../../models/Reading';
export interface ReadingTableBodyProps {
  readings: Reading[];
}

export function ReadingTableBody({ readings }: ReadingTableBodyProps) {
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
    <TableBody>
      {readings.map((reading) => (
        <StyledTableRow key={reading.id}>
          <StyledTableCell align="left">{reading.title}</StyledTableCell>
          <StyledTableCell align="left">{reading.totalCap}</StyledTableCell>
          <StyledTableCell align="left">{reading.timeInMinute}</StyledTableCell>
          <StyledTableCell align="left">{reading.theme}</StyledTableCell>
          <StyledTableCell align="left">{reading.referenceEnd}</StyledTableCell>
          <StyledTableCell align="left">{reading.theEnd}</StyledTableCell>
          <StyledTableCell align="left">{reading.weekOfYear}</StyledTableCell>
          <StyledTableCell align="left">{reading.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
