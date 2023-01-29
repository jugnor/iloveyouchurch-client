import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Button from '@mui/material/Button';
import { UserModel } from '../../../../../models/UserModel';
export interface UserTableBodyProps {
  users: UserModel[];
  selectItem: string;
  handleAction: (userId: string, mode: string) => void;
}

export function UserTableBody({
  users,
  selectItem,
  handleAction
}: UserTableBodyProps) {
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
      {users.map((user) => (
        <StyledTableRow key={user.id}>
          <StyledTableCell align="left">{user.username}</StyledTableCell>
          <StyledTableCell width={'40%'}  align="right">{user.email}</StyledTableCell>
          <StyledTableCell width={'20%'} align="right">{user.firstName}</StyledTableCell>
          <StyledTableCell width={'20%'} align="right">{user.lastName}</StyledTableCell>
          <StyledTableCell align="right">
            {
              <div style={{ display: 'flex' }}>
                <Button
                  size="small"
                  type={'submit'}
                  color="primary"
                  onClick={() => handleAction(user.id, 'update')}
                  disabled={selectItem === 'all'}
                  variant="outlined"
                  startIcon={<BorderColorIcon />}
                />
                <Button
                  style={{ marginLeft: '1em' }}
                  size="small"
                  type={'submit'}
                  color="primary"
                  disabled={selectItem === 'all'}
                  onClick={() => handleAction(user.id, 'delete')}
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
