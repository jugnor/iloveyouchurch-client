import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';

export interface ResultTableHeaderProps {}

export function ResultTableHeader({}: ResultTableHeaderProps) {
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
        <StyledTableCell align="right">Geschwestername</StyledTableCell>
        <StyledTableCell align="right">Gebet.A</StyledTableCell>
        <StyledTableCell align="right">Gebet.G</StyledTableCell>
        <StyledTableCell align="right">Gebet.N</StyledTableCell>
        <StyledTableCell align="right">Bible</StyledTableCell>
        <StyledTableCell align="right">Buch</StyledTableCell>
        <StyledTableCell align="right">Meditation</StyledTableCell>
        <StyledTableCell align="right">Auszeit</StyledTableCell>
        <StyledTableCell align="right">Evangelisation</StyledTableCell>
        <StyledTableCell align="right">Support</StyledTableCell>
        <StyledTableCell align="right">Kontakt</StyledTableCell>
        <StyledTableCell align="right">Spende</StyledTableCell>
        <StyledTableCell align="right">Danksagung</StyledTableCell>
        <StyledTableCell align="right">Probe</StyledTableCell>
        <StyledTableCell align="right">K.Fasten</StyledTableCell>
        <StyledTableCell align="right">T.Fasten</StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
