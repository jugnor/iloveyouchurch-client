import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { createTheme } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

import { endOfWeek, startOfWeek } from 'date-fns';
import { ResultsObject } from '../../models/ResultsObject';
import {
  accountColumns,
  accountRowsRendererByWeek
} from './CensorReportPrepare';
import { Account } from '../../models/Account';
import { CalenderWeekRenderer } from '../CalendarWeekRenderer';
import { SelectItem } from '../SelectItem';
import { DataGridRows } from '../DataGridRows';

interface CensorDataGridRendererProps {
  postboxId: string;
  userId: string;
  tab: string;
  menuItems: string[];
}

export function CensorDataGridRenderer({
  postboxId,
  userId,
  tab,
  menuItems
}: CensorDataGridRendererProps) {
  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary
      },
      textPrimary: {
        color: theme.palette.text.primary
      }
    }),
    { defaultTheme }
  );

  const getDisciplineType = (): string => {
    const first = menuItems.at(0);
    if (first !== undefined) {
      const second = first.split('|').at(0);
      if (second !== undefined) {
        return second;
      }
    }
    return '';
  };
  const date = new Date();
  const start = startOfWeek(date).toISOString();
  const end = endOfWeek(date).toISOString();
  const [page, setPage] = React.useState(0);
  const [disciplineType, setDisciplineType] = useState<string>(
    getDisciplineType()
  );
  const [startWeek, setStartWeek] = React.useState<string>(start);
  const [endWeek, setEndWeek] = React.useState<string>(end);
  const [methode, setMethode] = useState<string>('');

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    setMethode('get');
  };

  const { data: censorData } = useSWR<ResultsObject<Account>>(
    tab === 'Censor'
      ? `/postboxes/${postboxId}/account-results?` +
          `week=${startWeek}/${endWeek}` +
          `&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : `/postboxes/${postboxId}/users/${userId}/account-results?` +
          `&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = accountColumns('');

  const rows = accountRowsRendererByWeek(censorData, startWeek, methode);

  return censorData && columns && rows ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          {tab === 'Censor' ? (
            <CalenderWeekRenderer
              setMethode={setMethode}
              setStartWeek={setStartWeek}
              setEndWeek={setEndWeek}
            />
          ) : (
            ''
          )}
          <br />
          <br />
          <br />

          {menuItems.length > 0 ? (
            <div>
              <SelectItem
                setActivityType={setDisciplineType}
                activityType={disciplineType}
              />
            </div>
          ) : (
            ''
          )}
          <br />
          <br />

          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={rows}
              gridColumns={columns}
              page={censorData.page}
              pageSize={censorData.size}
              total={censorData.total}
              onChangePage={onChangePage}
            />
          </Suspense>
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
