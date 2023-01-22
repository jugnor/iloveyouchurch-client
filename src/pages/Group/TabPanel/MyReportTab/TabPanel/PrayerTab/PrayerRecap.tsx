import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../shared/SelectItem';

import { Prayer, PrayerType } from '../../../../../../models/Prayer';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { PrayerTableHeader } from './PrayerTableHeader';
import { PrayerTableBody } from './PrayerTableBody';

interface PrayerRecapRecapProps {
  groupName: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function PrayerRecap({
  groupName,
  userId,
  path,
  menuItems
}: PrayerRecapRecapProps) {
  const [page, setPage] = React.useState(0);
  const [prayerType, setPrayerType] = useState<string>(PrayerType.ALONE);

  const { translateType } = useDisciplineType(prayerType as PrayerType);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: results } = useSWR<ResultsObject<Prayer>>(
    `/api/groups/${groupName}/users/${userId}/${path}-results?` +
      `&type=${prayerType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
              setElement={setPrayerType}
              element={prayerType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <PrayerTableHeader prayerType={prayerType as PrayerType} />
                <PrayerTableBody prayers={results.items} />
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
