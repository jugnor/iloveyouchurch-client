import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fasting } from '../../../../../../models/Fasting';
export interface FastingTableBodyProps {
  withAction: boolean;
  fastings: Fasting[];
}

export function FastingTableBody({
  withAction,
  fastings
}: FastingTableBodyProps) {
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
    <TableBody>
      {fastings.map((fasting) => (
        <StyledTableRow key={fasting.id}>
          <StyledTableCell align="left">{fasting.goal}</StyledTableCell>
          <StyledTableCell align="left">{fasting.days}</StyledTableCell>
          <StyledTableCell align="left">{fasting.weekOfYear}</StyledTableCell>
          <StyledTableCell align="left">{fasting.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
