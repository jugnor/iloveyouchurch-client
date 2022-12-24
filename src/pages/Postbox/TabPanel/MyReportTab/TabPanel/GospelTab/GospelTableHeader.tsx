import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';
import { GospelType } from '../../../../../../models/Gospel';

export interface GospelTableHeaderProps {
  gospelType: GospelType;
}

export function GospelTableHeader({ gospelType }: GospelTableHeaderProps) {
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
        {gospelType === GospelType.GOSPEL && (
          <>
            <StyledTableCell align="left">Ziele</StyledTableCell>
            <StyledTableCell align="left">Total</StyledTableCell>
            <StyledTableCell align="left">Zeit(Min)</StyledTableCell>
          </>
        )}
        {gospelType === GospelType.CONTACT && (
          <>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Stadt</StyledTableCell>
            <StyledTableCell align="left">Telephone</StyledTableCell>
          </>
        )}
        {gospelType === GospelType.SUPPORT && (
          <>
            <StyledTableCell align="left">Titel</StyledTableCell>
            <StyledTableCell align="left">SupportType</StyledTableCell>
          </>
        )}
        <StyledTableCell align="left">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="left">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
