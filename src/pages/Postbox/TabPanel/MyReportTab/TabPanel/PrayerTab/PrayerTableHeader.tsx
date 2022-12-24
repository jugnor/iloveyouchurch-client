import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';
import { PrayerType } from '../../../../../../models/Prayer';

export interface PrayerTableHeaderProps {
  prayerType: PrayerType;
}

export function PrayerTableHeader({ prayerType }: PrayerTableHeaderProps) {
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
        <StyledTableCell align="left">Zeit(Min)</StyledTableCell>
        <StyledTableCell align="left">Thema</StyledTableCell>
        {prayerType === PrayerType.GROUP && (
          <StyledTableCell align="left">Gebetsnacht</StyledTableCell>
        )}
        <StyledTableCell align="left">Kalenderwoche</StyledTableCell>
        <StyledTableCell align="left">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
