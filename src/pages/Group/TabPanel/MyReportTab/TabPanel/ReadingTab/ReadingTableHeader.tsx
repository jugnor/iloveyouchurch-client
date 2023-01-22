import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';

export interface ReadingTableHeaderProps {}

export function ReadingTableHeader({}: ReadingTableHeaderProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#324ab2',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15
    }
  }));

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">Titel</StyledTableCell>
        <StyledTableCell align="right">Totale Kapitel</StyledTableCell>
        <StyledTableCell align="right">Zeit(Min)</StyledTableCell>
        <StyledTableCell align="right">Thema</StyledTableCell>
        <StyledTableCell align="right">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
