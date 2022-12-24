import { styled } from '@mui/material/styles';
import {
  Stack,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fasting } from '../../../../../../models/Fasting';
import { GodGiving, GodGivingType } from '../../../../../../models/GodGiving';
export interface GodGivingTableBodyProps {
  withAction: boolean;
  godGivings: GodGiving[];
}

export function GodGivingTableBody({
  withAction,
  godGivings
}: GodGivingTableBodyProps) {
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
      {godGivings.map((godging) => (
        <StyledTableRow key={godging.id}>
          <StyledTableCell align="left">{godging.description}</StyledTableCell>
          {(godging.godGivingType === GodGivingType.THANKS ||
            godging.godGivingType === GodGivingType.CHORE) && (
            <>
              <StyledTableCell align="left">{godging.total}</StyledTableCell>
              <StyledTableCell align="left">
                {godging.timeInMinute}
              </StyledTableCell>
            </>
          )}
          {godging.godGivingType === GodGivingType.MONEY && (
            <StyledTableCell align="left">{godging.amount}</StyledTableCell>
          )}
          <StyledTableCell align="left">{godging.weekOfYear}</StyledTableCell>
          <StyledTableCell align="left">{godging.createdAt}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
