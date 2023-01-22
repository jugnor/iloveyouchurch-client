import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../shared/SelectItem';

import { GodGiving, GodGivingType } from '../../../../../../models/GodGiving';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { useTranslation } from 'react-i18next';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { GodGivingTableHeader } from './GodGivingTableHeader';
import { GodGivingTableBody } from './GodGivingTableBody';

interface GodGivingRecapProps {
  groupName: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function GodGivingRecap({
  groupName,
  userId,
  path,
  menuItems
}: GodGivingRecapProps) {
  const [page, setPage] = React.useState(0);
  const [godGivingType, setGodGivingType] = useState<string>(
    GodGivingType.MONEY
  );

  const { translateType } = useDisciplineType(godGivingType as GodGivingType);

  const { t } = useTranslation();
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: results } = useSWR<ResultsObject<GodGiving>>(
    `/api/groups/${groupName}/users/${userId}/${path}-results?` +
      `&type=${godGivingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
              setElement={setGodGivingType}
              element={godGivingType}
              menuItems={menuItems}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <GodGivingTableHeader
                  godGivingType={godGivingType as GodGivingType}
                />
                <GodGivingTableBody godGivings={results.items} />
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
