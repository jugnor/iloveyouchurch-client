import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../shared/SelectItem';

import { Fasting, FastingType } from '../../../../../../models/Fasting';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { FastingTableHeader } from './FastingTableHeader';
import { FastingTableBody } from './FastingTableBody';
import { useTranslation } from 'react-i18next';

interface FastingRecapProps {
  groupName: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function FastingRecap({
  groupName,
  userId,
  path,
  menuItems
}: FastingRecapProps) {
  const [page, setPage] = React.useState(0);
  const [fastingType, setFastingType] = useState<string>(FastingType.PARTIAL);

  const { translateType } = useDisciplineType(fastingType as FastingType);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: results } = useSWR<ResultsObject<Fasting>>(
    `/api/groups/${groupName}/users/${userId}/${path}-results?` +
      `&type=${fastingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
          <div style={{ display: 'flex' }}>
            <SelectItem
              setElement={setFastingType}
              element={fastingType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <FastingTableHeader />
                <FastingTableBody fastings={results.items} />
                <TableFooter>
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
                      'Es liegt momentan kein ' + translateType() + ' Item vor'
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
