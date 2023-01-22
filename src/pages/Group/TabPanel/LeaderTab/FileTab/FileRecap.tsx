import * as React from 'react';
import { Suspense, useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';

import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { FileTableHeader } from './FileTableHeader';
import { FileTableBody } from './FileTableBody';
import { ResultsObject } from '../../../../../models/ResultsObject';
import { FileModel } from '../../../../../models/File';
import { CustomTablePagination } from '../../../../../shared/TablePagination';
import FileViewModal from '../../../../../shared/FileViewModal';
import { DeleteDialog } from '../../../../../shared/DeleteDialog';
import { useFile } from '../../../../../hooks/useFile';
import { AlertColor } from '@mui/material/Alert';
import { AlertMessage } from '../../../../../shared/ArletMessageRenderer';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface FileRecapProps {
  groupName: string;
}

export function FileRecap(fileRecapProps: FileRecapProps) {
  const { downloadFile, uploadFile, deleteFileMetaData, alertMessage } =
    useFile(fileRecapProps.groupName);
  const [addFile, setAddFile] = useState<File>();
  const [page, setPage] = React.useState(0);
  const [fileId, setFileId] = React.useState('');
  const [mode, setMode] = React.useState('');
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openViewFile, setOpenViewFile] = useState<boolean>(false);

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { t } = useTranslation();

  const { data: results, mutate: resultMutate } = useSWR<
    ResultsObject<FileModel>
  >(
    `/api/groups/${fileRecapProps.groupName}/file-meta-data-results?` +
      `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );
  const handleAction = (fileId: string, mode: string) => {
    setFileId(fileId);
    setMode(mode);

    switch (mode) {
      case 'view':
        setOpenViewFile(true);
        break;
      case 'delete':
        setOpenDialog(true);
        break;
    }
  };

  const onCloseFileViewModal = () => {
    setOpenViewFile(false);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files !== undefined) {
      setAddFile(event.target.files[0]);
    }
  };

  const handleSaveFile = useCallback(async () => {
    if (addFile !== undefined) {
      uploadFile(addFile, true).then((r) => {
        resultMutate(results, true);
        setSeverity('success');
        setAlert('Das File Item wurde erfolgreich hochgeladen');
        setMode('');
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    }
  }, [uploadFile]);

  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteFileMetaData(fileId).then((r) => {
        resultMutate(undefined, true);
        setMode('');
        setOpenAlert(true);
        setAlert('Das File Item wurde erfolgreich gelöscht');
        setSeverity('success');
        setOpenDialog(false);
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    } else {
      setMode('');
    }
  };

  const handleDownload = useCallback(
    async (fileId: string) => {
      downloadFile(fileId).then((r) => {
        setSeverity('success');
        setAlert('Das File Item wurde erfolgreich herunterladen');
        setMode('');
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    },
    [downloadFile]
  );

  return results ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto', display: 'block' }}
        >
          <div>
            <label className="label">
              <input
                style={{ cursor: 'pointer' }}
                color="secondary"
                type="file"
                name="file"
                onChange={handleUploadFile}
              />
            </label>
            <br />
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleSaveFile()}
            >
              Datei Hinzufügen
            </Button>
          </div>
          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <FileTableHeader withAction={false} />

                <FileTableBody
                  files={results.items}
                  handleAction={handleAction}
                  handleDownload={handleDownload}
                />
                <TableFooter style={{ backgroundColor: '#F0F8FF' }}>
                  {results.total > 0 && (
                    <CustomTablePagination
                      total={results.total}
                      size={results.size}
                      page={results.page}
                      handleChangePage={onChangePage}
                    />
                  )}
                </TableFooter>
              </Table>
              {results.total === 0 && (
                <Typography color={'error'}>
                  <h2>{t('Es Liegt momentan kein Datei Item vor')} </h2>
                </Typography>
              )}
            </TableContainer>
          </Suspense>
          {openViewFile && (
            <FileViewModal
              onCloseFileViewModal={onCloseFileViewModal}
              fileId={fileId}
            />
          )}
          {mode === 'delete' && openDialog && (
            <DeleteDialog
              openDialog={openDialog}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {openAlert && severity !== undefined && (
            <AlertMessage
              openAlert={openAlert}
              setOpenAlert={setOpenAlert}
              message={alert}
              severity={severity}
            />
          )}
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas in file action schiefgelaufen</>
  );
}
