import { ActivityType } from '../../../../../../models/ActivityType';
import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { Activity } from '../../../../../../models/Activity';
import _moment from 'moment';
export interface ActivityTableBodyProps {
  activities: Activity[];
}

export function ActivityTableBody({ activities }: ActivityTableBodyProps) {
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
      fontSize: 14
    }
  }));

  return (
    <TableBody>
      {activities.map((activity) => (
        <StyledTableRow key={activity.id}>
          <StyledTableCell align="left" width="90%">
            {activity.description}
          </StyledTableCell>
          <StyledTableCell align="right">
            {_moment.utc(activity.createdAt).local().format('DD.MM.YYYY')}
          </StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
