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
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Zeit(Min)</StyledTableCell>
          </>
        )}
        {gospelType === GospelType.CONTACT && (
          <>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Stadt</StyledTableCell>
            <StyledTableCell align="right">Telephone</StyledTableCell>
          </>
        )}
        {gospelType === GospelType.SUPPORT && (
          <>
            <StyledTableCell align="left">Titel</StyledTableCell>
            <StyledTableCell align="right">SupportType</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </>
        )}
        <StyledTableCell align="right">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
