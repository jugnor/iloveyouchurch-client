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
        <StyledTableCell align="left">Totale Kapitel</StyledTableCell>
        <StyledTableCell align="left">Zeit(Min)</StyledTableCell>
        <StyledTableCell align="left">Thema</StyledTableCell>
        <StyledTableCell align="left">Referenz</StyledTableCell>
        <StyledTableCell align="left">Ende ?</StyledTableCell>
        <StyledTableCell align="left">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="left">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
