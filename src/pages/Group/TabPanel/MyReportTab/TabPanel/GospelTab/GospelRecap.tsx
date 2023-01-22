import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../shared/SelectItem';

import { Gospel, GospelType } from '../../../../../../models/Gospel';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { GospelTableBody } from './GospelTableBody';
import { GospelTableHeader } from './GospelTableHeader';

interface GospelRecapProps {
  groupName: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function GospelRecap({
  groupName,
  userId,
  path,
  menuItems
}: GospelRecapProps) {
  const [page, setPage] = React.useState(0);
  const [gospelType, setGospelType] = useState<string>(GospelType.GOSPEL);
  const { translateType } = useDisciplineType(gospelType as GospelType);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: results } = useSWR<ResultsObject<Gospel>>(
    `/api/groups/${groupName}/users/${userId}/${path}-results?` +
      `&type=${gospelType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
              setElement={setGospelType}
              element={gospelType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <GospelTableHeader gospelType={gospelType as GospelType} />
                <GospelTableBody gospels={results.items} />
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
