import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';

export interface UserTableHeaderProps {}

export function UserTableHeader({}: UserTableHeaderProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#324ab2',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">Username</StyledTableCell>
        <StyledTableCell align="right">Emailadresse</StyledTableCell>
        <StyledTableCell align="right">Vorname</StyledTableCell>
        <StyledTableCell align="right">Nachname</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
