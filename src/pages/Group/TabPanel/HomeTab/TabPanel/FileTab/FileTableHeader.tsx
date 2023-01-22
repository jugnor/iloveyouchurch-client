import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';

export interface FileTableHeaderProps {
  withAction: boolean;
}

export function FileTableHeader({ withAction }: FileTableHeaderProps) {
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
        <StyledTableCell align="left">Dateiname</StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
