import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { createTheme } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { ResultsObject } from '../models/ResultsObject';
import {
  activityColumns,
  activityRowsRendererByType
} from './activity/ActivityPrepare';
import {
  disciplineColumns,
  disciplineRowsRendererByWeek
} from './discipline/DisciplinePrepare';
import { Discipline } from '../models/Discipline';
import { Activity } from '../models/Activity';
import { SelectItem } from './SelectItem';
import { DataGridRows } from './DataGridRows';
import { Account } from '../models/Account';
import {
  accountColumns,
  accountRowsRendererByWeek
} from './account/CensorReportPrepare';
import { endOfWeek, startOfWeek } from 'date-fns';
import { CalenderWeekRenderer } from './CalendarWeekRenderer';

interface DataGridRendererProps {
  postboxId: string;
  userId: string;
  path: string;
  type: string;
  menuItems: string[];
}

export function DataGridRenderer({
  postboxId,
  userId,
  path,
  type,
  menuItems
}: DataGridRendererProps) {
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

  let { data: disciplineData } = useSWR<ResultsObject<Discipline>>(
    type === 'Discipline'
      ? `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
          `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : null
  );

  const { data: activityData } = useSWR<ResultsObject<Activity>>(
    type === 'Activity'
      ? `/postboxes/${postboxId}/activity-results?` +
          `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : null
  );

  const { data: censorData } = useSWR<ResultsObject<Account>>(
    type === 'Censor'
      ? `/postboxes/${postboxId}/account-results?` +
          `week=${startWeek}/${endWeek}` +
          `&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : null
  );

  const { data: myReportData } = useSWR<ResultsObject<Account>>(
    type === 'MyReport'
      ? `/postboxes/${postboxId}/users/${userId}/account-results?` +
          `&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : null
  );

  let dataR;
  let rows;
  let columnsAction;
  if (type === 'Activity') {
    columnsAction = activityColumns(disciplineType);

    dataR = activityData;
    rows = activityRowsRendererByType(activityData, methode);
  } else if (type === 'Discipline') {
    columnsAction = disciplineColumns(disciplineType);

    dataR = disciplineData;
    rows = disciplineRowsRendererByWeek(
      disciplineData,
      '',
      methode,
      disciplineType
    );
  } else if (type === 'Censor') {
    columnsAction = accountColumns(disciplineType);
    dataR = censorData;
    rows = accountRowsRendererByWeek(censorData, startWeek, methode);
  } else if (type === 'MyReport') {
    columnsAction = accountColumns(disciplineType);
    dataR = myReportData;
    rows = accountRowsRendererByWeek(myReportData, '', methode);
  }

  return dataR && columnsAction && rows ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          {type === 'Censor' ? (
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
                menuItems={menuItems}
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
              gridColumns={columnsAction}
              page={dataR.page}
              pageSize={dataR.size}
              total={dataR.total}
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
