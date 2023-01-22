import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow
} from '@mui/material';
import { FileModel } from '../../../../../../models/File';
import _moment from 'moment';
import * as React from 'react';
import { TextDialog } from '../../../../../../shared/TextDialog';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
export interface FileTableBodyProps {
  files: FileModel[];
  handleAction: (fileId: string, mode: string) => void;
  handleDownload: (fileId: string) => void;
}

export function FileTableBody({
  files,
  handleAction,
  handleDownload
}: FileTableBodyProps) {
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
              <StyledTableCell align="left" width={'80%'}>
                {fileModel.filename}
              </StyledTableCell>
              <StyledTableCell align="right" width={'20%'}>
                {_moment.utc(fileModel.createdAt).local().format('DD.MM.YYYY')}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  <div style={{ display: 'flex' }}>
                    <Button
                      size="small"
                      type={'submit'}
                      color="primary"
                      onClick={() => handleAction(fileModel.id, 'view')}
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                    />
                    <Button
                      style={{ marginLeft: '1em' }}
                      size="small"
                      type={'submit'}
                      color="primary"
                      onClick={() => handleDownload(fileModel.id)}
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                    />
                  </div>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </>
  );
}
