import { styled } from '@mui/material/styles';
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';
import { ActivityType } from '../../../../../../models/ActivityType';

export interface ActivityTableHeaderProps {
  activityType: ActivityType;
}

export function ActivityTableHeader({
  activityType
}: ActivityTableHeaderProps) {
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
        <StyledTableCell align="left" width="90%">
          Beschreibung
        </StyledTableCell>
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
