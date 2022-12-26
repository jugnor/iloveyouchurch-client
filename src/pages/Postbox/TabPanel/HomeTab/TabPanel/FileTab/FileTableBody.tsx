import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { FileModel } from '../../../../../../models/File';
export interface FileTableBodyProps {
  withAction: boolean;
  files: FileModel[];
}

export function FileTableBody({ withAction, files }: FileTableBodyProps) {
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
      {files.map((fileModel) => (
        <StyledTableRow key={fileModel.id}>
          <StyledTableCell align="left" width="25%">
            {fileModel.filename}
          </StyledTableCell>
          <StyledTableCell align="left" width="50%">
            {fileModel.description}
          </StyledTableCell>
          <StyledTableCell align="right">{fileModel.size}</StyledTableCell>
          <StyledTableCell align="right">{fileModel.createdAt}</StyledTableCell>
          <StyledTableCell align="right">
            {
              <>
                <VisibilityIcon /> <DownloadIcon />{' '}
                <DeleteIcon aria-disabled={!withAction} />{' '}
              </>
            }
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
