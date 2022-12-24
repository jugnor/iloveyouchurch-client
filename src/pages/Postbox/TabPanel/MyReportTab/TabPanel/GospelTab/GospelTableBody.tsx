import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Gospel, GospelType } from '../../../../../../models/Gospel';
export interface GospelTableBodyProps {
  withAction: boolean;
  gospels: Gospel[];
}

export function GospelTableBody({ withAction, gospels }: GospelTableBodyProps) {
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
      {gospels.map((gospel) => (
        <StyledTableRow key={gospel.id}>
          {gospel.gospelType === GospelType.GOSPEL && (
            <>
              <StyledTableCell align="left">{gospel.goal}</StyledTableCell>
              <StyledTableCell align="left">{gospel.total}</StyledTableCell>
              <StyledTableCell align="left">
                {gospel.timeInMinute}
              </StyledTableCell>
            </>
          )}
          {gospel.gospelType === GospelType.CONTACT && (
            <>
              <StyledTableCell align="left">
                {gospel.gospelContact.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {gospel.gospelContact.email}
              </StyledTableCell>
              <StyledTableCell align="left">
                {gospel.gospelContact.city}
              </StyledTableCell>
              <StyledTableCell align="left">
                {gospel.gospelContact.telephone}
              </StyledTableCell>
            </>
          )}
          {gospel.gospelType === GospelType.SUPPORT && (
            <>
              <StyledTableCell align="left">
                {gospel.gospelSupport.title}
              </StyledTableCell>
              <StyledTableCell align="left">
                {gospel.gospelSupport.supportType}
              </StyledTableCell>
              <StyledTableCell align="left">{gospel.total}</StyledTableCell>
            </>
          )}
          <StyledTableCell align="left">{gospel.weekOfYear}</StyledTableCell>
          <StyledTableCell align="left">{gospel.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
