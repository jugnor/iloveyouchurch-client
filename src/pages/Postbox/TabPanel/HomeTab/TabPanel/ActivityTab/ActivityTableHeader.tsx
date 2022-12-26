import { styled } from '@mui/material/styles';
import {
  Stack,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from '@mui/material';
import { ActivityType } from '../../../../../../models/ActivityType';

export interface ActivityTableHeaderProps {
  withAction: boolean;
  activityType: ActivityType;
}

export function ActivityTableHeader({
  withAction,
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
        {activityType === ActivityType.PROGRAM && (
          <StyledTableCell>Tag</StyledTableCell>
        )}
        <StyledTableCell align="right">Erstellungsdatum</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
