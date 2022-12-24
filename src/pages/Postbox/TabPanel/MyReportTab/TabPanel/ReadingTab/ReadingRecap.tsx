import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { Reading, ReadingType } from '../../../../../../models/Reading';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { ReadingTableBody } from './ReadingTableBody';
import { ReadingTableHeader } from './ReadingTableHeader';

interface ReadingRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function ReadingRecap({
  postboxId,
  userId,
  path,
  menuItems
}: ReadingRecapProps) {
  const [page, setPage] = React.useState(0);
  const [readingType, setReadingType] = useState<string>(ReadingType.BIBLE);

  const { translateType } = useDisciplineType(readingType as ReadingType);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: results } = useSWR<ResultsObject<Reading>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${readingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  return results ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          <div style={{ display: 'flex' }}>
            <SelectItem
              setElement={setReadingType}
              element={readingType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <ReadingTableHeader />
                <ReadingTableBody readings={results.items} />

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
                  <h2>
                    {t(
                      'Es Liegt momentan kein ' + translateType() + ' Item vor'
                    )}{' '}
                  </h2>
                </Typography>
              )}
            </TableContainer>
          </Suspense>
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
