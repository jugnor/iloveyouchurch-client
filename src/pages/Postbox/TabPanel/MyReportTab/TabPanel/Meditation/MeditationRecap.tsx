import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';

import { Meditation, RetreatType } from '../../../../../../models/Meditation';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { MeditationTableHeader } from './MeditationTableHeader';
import { MeditationTableBody } from './MeditationTableBody';

interface MeditationRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function MeditationRecap({
  postboxId,
  userId,
  path,
  menuItems
}: MeditationRecapProps) {
  const [page, setPage] = React.useState(0);
  const [meditationType, setMeditationType] = useState<string>(
    RetreatType.MEDITATION
  );

  const { translateType } = useDisciplineType(meditationType as RetreatType);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { data: results } = useSWR<ResultsObject<Meditation>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${meditationType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
              setElement={setMeditationType}
              element={meditationType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <MeditationTableHeader />
                <MeditationTableBody meditations={results.items} />
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
