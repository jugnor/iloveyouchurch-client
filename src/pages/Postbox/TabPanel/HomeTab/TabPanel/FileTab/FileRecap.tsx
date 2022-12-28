import * as React from 'react';
import { Suspense } from 'react';
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

interface FileRecapProps {
  postboxId: string;
}

export function FileRecap(fileRecapProps: FileRecapProps) {
  const [page, setPage] = React.useState(0);

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { t } = useTranslation();

  const { data: results } = useSWR<ResultsObject<FileModel>>(
    `/postboxes/${fileRecapProps.postboxId}/file-meta-data-results?` +
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

                <FileTableBody files={results.items} />
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
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas in file action schiefgelaufen</>
  );
}
