import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Meditation } from '../../../../../../models/Meditation';
export interface MeditationTableBodyProps {
  meditations: Meditation[];
}

export function MeditationTableBody({ meditations }: MeditationTableBodyProps) {
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
      {meditations.map((meditation) => (
        <StyledTableRow key={meditation.id}>
          <StyledTableCell align="left">{meditation.total}</StyledTableCell>
          <StyledTableCell align="left">
            {meditation.timeInMinute}
          </StyledTableCell>
          <StyledTableCell align="left">{meditation.theme}</StyledTableCell>
          <StyledTableCell align="left">{meditation.verse}</StyledTableCell>
          <StyledTableCell align="left">
            {meditation.weekOfYear}
          </StyledTableCell>
          <StyledTableCell align="left">{meditation.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
