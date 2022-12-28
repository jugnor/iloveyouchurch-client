import * as React from 'react';
import { Suspense } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { Table } from '@material-ui/core';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { Account } from '../../../../../../models/Account';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LensIcon from '@mui/icons-material/Lens';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CancelIcon from '@mui/icons-material/Cancel';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import { useTranslation } from 'react-i18next';
import { ReportNoteTableHeader } from './ReportNoteTableHeader';
import {ReportNoteTableBody} from "./ReportNoteTableBody";

interface ReportNoteProps {
  postboxId: string;
  userId: string;
}

export function ReportNoteRecap({ postboxId, userId }: ReportNoteProps) {
  const { t } = useTranslation();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const [page, setPage] = React.useState(0);

  const { data: notes } = useSWR<ResultsObject<Account>>(
    `/postboxes/${postboxId}/users/${userId}/account-results?` +
      `&page=${page}&size=10&sortBy=WEEK_OF_YEAR&order=DESC`
  );

  return notes ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto', display: 'block' }}
        >
          <Suspense fallback={null}>
            <div style={{ display: 'flex', overflowY: 'auto' }}>
              <CancelIcon
                color="error"
                style={{ display: 'block' }}
              ></CancelIcon>
              <a style={{ marginRight: '10em' }}>
                Ziel der Woche wurde nicht erreicht !!!
              </a>
              <DoNotDisturbOnIcon style={{ color: 'orange' }}>
                {' '}
              </DoNotDisturbOnIcon>
              <a style={{ marginRight: '10em' }}>Nicht bewertet !!!</a>
              <CheckCircleIcon color="success"></CheckCircleIcon>
              <a style={{ marginRight: '10em' }}>
                Ziel der Woche wurde erfolgreich erreicht !!!
              </a>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <ReportNoteTableHeader />
                <ReportNoteTableBody notes={notes.items}/>
                <TableFooter>
                  {notes.total > 0 && (
                    <CustomTablePagination
                      total={notes.total}
                      size={notes.size}
                      page={notes.page}
                      handleChangePage={onChangePage}
                    />
                  )}
                </TableFooter>
              </Table>
              {notes.total === 0 && (
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
