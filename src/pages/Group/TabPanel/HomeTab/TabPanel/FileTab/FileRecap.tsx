import * as React from 'react';
import { Suspense, useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';

import { FileModel } from '../../../../../../models/File';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { FileTableHeader } from './FileTableHeader';
import { FileTableBody } from './FileTableBody';
import FileViewModal from '../../../../../../shared/FileViewModal';
import { useFile } from '../../../../../../hooks/useFile';
import { AlertColor } from '@mui/material/Alert';

interface FileRecapProps {
  groupName: string;
}

export function FileRecap(fileRecapProps: FileRecapProps) {
  const { downloadFile, alertMessage } = useFile(fileRecapProps.groupName);
  const [page, setPage] = React.useState(0);
  const [mode, setMode] = React.useState('');
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [openAlert, setOpenAlert] = useState(false);

  const [fileId, setFileId] = React.useState('');
  const [openViewFile, setOpenViewFile] = useState<boolean>(false);
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const onCloseFileViewModal = () => {
    setOpenViewFile(false);
  };
  const { t } = useTranslation();
  const handleAction = (fileId: string, mode: string) => {
    setFileId(fileId);
    switch (mode) {
      case 'view':
        setOpenViewFile(true);
        break;
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
  const { data: results } = useSWR<ResultsObject<FileModel>>(
    `/api/groups/${fileRecapProps.groupName}/file-meta-data-results?` +
      `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas in file action schiefgelaufen</>
  );
}
