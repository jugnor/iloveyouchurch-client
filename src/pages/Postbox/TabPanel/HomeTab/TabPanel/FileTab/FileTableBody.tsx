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
import _moment from 'moment';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
export interface FileTableBodyProps {
  withAction: boolean;
  files: FileModel[];
}

export function FileTableBody({ withAction, files }: FileTableBodyProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleText = (openDialog: boolean, text: string) => {
    setOpenDialog(openDialog);
    setText(text);
  };
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
    <>
      {openDialog ? (
        <TextDialog
          handleText={handleText}
          openDialog={openDialog}
          textDialog={text}
        />
      ) : (
        <TableBody>
          {files.map((fileModel) => (
            <StyledTableRow key={fileModel.id}>
              <StyledTableCell align="left" width="25%">
                {fileModel.filename}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                width="50%"
                onClick={() => handleText(true, fileModel.description)}
              >
                {' '}
                <button style={{ cursor: 'pointer', color: 'blue' }}>
                  Details...
                </button>
              </StyledTableCell>
              <StyledTableCell align="right">{fileModel.size}</StyledTableCell>
              <StyledTableCell align="right">
                {_moment
                  .utc(fileModel.createdAt)
                  .local()
                  .format('DD.MM.YYYY, HH:mm')}
              </StyledTableCell>
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
      )}
    </>
  );
}
