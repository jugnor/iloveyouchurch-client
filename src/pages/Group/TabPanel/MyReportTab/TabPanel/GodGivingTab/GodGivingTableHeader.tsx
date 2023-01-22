import { styled } from '@mui/material/styles';
import {
  Stack,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';
import { GodGivingType } from '../../../../../../models/GodGiving';

export interface GodGivingTableHeaderProps {
  godGivingType: GodGivingType;
}

export function GodGivingTableHeader({
  godGivingType
}: GodGivingTableHeaderProps) {
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
        <StyledTableCell align="left">Beschreibung</StyledTableCell>

        {(godGivingType === GodGivingType.THANKS ||
          godGivingType === GodGivingType.CHORE) && (
          <>
            <StyledTableCell align="left">Total</StyledTableCell>
            <StyledTableCell align="right">Zeit(Min)</StyledTableCell>
          </>
        )}
        {godGivingType === GodGivingType.MONEY && (
          <StyledTableCell align="left">Betrag</StyledTableCell>
        )}
        <StyledTableCell align="right">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
