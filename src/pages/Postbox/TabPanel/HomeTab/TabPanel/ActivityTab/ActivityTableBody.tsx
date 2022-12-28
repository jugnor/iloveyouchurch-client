import { ActivityType } from '../../../../../../models/ActivityType';
import { styled } from '@mui/material/styles';
import {
  Stack,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { Activity } from '../../../../../../models/Activity';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import _moment from 'moment';
export interface ActivityTableBodyProps {
  withAction: boolean;
  activities: Activity[];
}

export function ActivityTableBody({
  withAction,
  activities
}: ActivityTableBodyProps) {
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
          {activity.activityType === ActivityType.PROGRAM && (
            <StyledTableCell>{activity.activityOrder}</StyledTableCell>
          )}
          <StyledTableCell align="right">
            {_moment
              .utc(activity.createdAt)
              .local()
              .format('DD.MM.YYYY, HH:mm')}
          </StyledTableCell>
          <StyledTableCell align="right">
            {
              <>
                <BorderColorIcon aria-disabled={!withAction} />{' '}
                <DeleteIcon aria-disabled={!withAction} />{' '}
              </>
            }
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
