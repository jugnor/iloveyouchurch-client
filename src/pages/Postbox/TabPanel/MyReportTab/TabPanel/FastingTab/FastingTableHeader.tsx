import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';

export interface FastingTableHeaderProps {}

export function FastingTableHeader({}: FastingTableHeaderProps) {
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
        <StyledTableCell align="left">Ziele</StyledTableCell>
        <StyledTableCell align="left">Totale Tage</StyledTableCell>
        <StyledTableCell align="left">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="left">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}