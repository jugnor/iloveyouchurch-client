import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';

import { Reading } from '../../../../../../models/Reading';
import { Prayer, PrayerType } from '../../../../../../models/Prayer';
export interface PrayerTableBodyProps {
  prayers: Prayer[];
}

export function PrayerTableBody({ prayers }: PrayerTableBodyProps) {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15
    }
  }));

  return (
    <TableBody>
      {prayers.map((prayer) => (
        <StyledTableRow key={prayer.id}>
          <StyledTableCell align="left">{prayer.timeInMinute}</StyledTableCell>
          <StyledTableCell align="left">{prayer.theme}</StyledTableCell>
          {prayer.prayerType === PrayerType.GROUP && (
            <StyledTableCell align="left">{prayer.prayerNight}</StyledTableCell>
          )}
          <StyledTableCell align="left">{prayer.weekOfYear}</StyledTableCell>
          <StyledTableCell align="left">{prayer.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
