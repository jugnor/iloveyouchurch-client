import * as React from 'react';
import { Suspense } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { FormControl, Table } from '@material-ui/core';

import { startOfISOWeek } from 'date-fns';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { Account } from '../../../../../../models/Account';
import {
  CalenderWeekRenderer,
  getWeekNumber
} from '../../../../../../shared/CalendarWeekRenderer';
import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { useTranslation } from 'react-i18next';
import { ResultTableHeader } from './ResultTableHeader';
import { ResultTableBody } from './ResultTableBody';

interface ResultRecapProps {
  groupName: string;
}

export function ResultRecap({ groupName }: ResultRecapProps) {
  const date = new Date();

  const [page, setPage] = React.useState(0);
  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);

  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const { data: noteResult } = useSWR<ResultsObject<Account>>(
    `/api/groups/${groupName}/account-results?` +
      `weekOfYear=${weekOfYear}` +
      `&page=${page}&size=10&sortBy=WEEK_OF_YEAR&order=DESC`
  );

  return noteResult ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto', display: 'block' }}
        >
          <div style={{ display: 'flex' }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">KW</InputLabel>
              <MenuItem style={{ backgroundColor: '#1976d2', color: 'white' }}>
                {weekOfYear}
              </MenuItem>
            </FormControl>
            <CalenderWeekRenderer setWeekOfYear={setWeekOfYear} />
          </div>

          <Suspense fallback={null}>
            <div style={{ display: 'flex', overflowY: 'auto' }}>
              <CancelIcon
                color="error"
                style={{ display: 'block' }}
              ></CancelIcon>
              <a style={{ marginRight: '10em' }}>
                Ziel der Woche wurde nicht erreicht
              </a>
              <DoNotDisturbOnIcon style={{ color: 'orange' }}>
                {' '}
              </DoNotDisturbOnIcon>
              <a style={{ marginRight: '10em' }}>Nicht bewertet</a>
              <CheckCircleIcon color="success"></CheckCircleIcon>
              <a style={{ marginRight: '10em' }}>
                Ziel der Woche wurde erfolgreich erreicht
              </a>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <ResultTableHeader />
                <ResultTableBody notes={noteResult.items} />
                <TableFooter style={{ backgroundColor: '#F0F8FF' }}>
                  {noteResult.total > 0 && (
                    <CustomTablePagination
                      total={noteResult.total}
                      size={noteResult.size}
                      page={noteResult.page}
                      handleChangePage={onChangePage}
                    />
                  )}
                </TableFooter>
              </Table>
              {noteResult.total === 0 && (
                <Typography color={'error'}>
                  <h2>{t('Es liegt momentan kein Ergebnis Item vor')} </h2>
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
