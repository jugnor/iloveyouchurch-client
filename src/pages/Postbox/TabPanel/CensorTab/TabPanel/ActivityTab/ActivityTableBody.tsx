import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { Activity } from '../../../../../../models/Activity';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import _moment from 'moment';
import * as React from 'react';
import Button from '@mui/material/Button';
export interface ActivityTableBodyProps {
  activities: Activity[];
  handleAction: (activityId: string, mode: string) => void;
}

export function ActivityTableBody({
  activities,
  handleAction
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
          <StyledTableCell align="right">
            {_moment.utc(activity.createdAt).local().format('DD.MM.YYYY')}
          </StyledTableCell>
          <StyledTableCell align="right">
            {
              <div style={{ display: 'flex' }}>
                <Button
                  size="small"
                  type={'submit'}
                  color="primary"
                  onClick={() => handleAction(activity.id, 'update')}
                  variant="outlined"
                  startIcon={<BorderColorIcon />}
                />
                <Button
                  style={{ marginLeft: '1em' }}
                  size="small"
                  type={'submit'}
                  color="primary"
                  onClick={() => handleAction(activity.id, 'delete')}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                />
              </div>
            }
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
