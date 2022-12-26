import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { Activity } from '../../../../../../models/Activity';
import { SelectItem } from '../../../../../../app/SelectItem';
import { ActivityType } from '../../../../../../models/ActivityType';
import { Table } from '@material-ui/core';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { ActivityTableHeader } from './ActivityTableHeader';
import { ActivityTableBody } from './ActivityTableBody';
import { useActivityType } from '../../../../../../hooks/useActivityType';
import { useTranslation } from 'react-i18next';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';

interface ActivityRecapProps {
  postboxId: string;
}

export function ActivityRecap({ postboxId }: ActivityRecapProps) {
  const [page, setPage] = React.useState(0);
  const [activityType, setActivityType] = useState<string>(
    ActivityType.PROGRAM
  );
  const { translateType } = useActivityType(activityType as ActivityType);

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { t } = useTranslation();

  const { data: activityResult } = useSWR<ResultsObject<Activity>>(
    `/postboxes/${postboxId}/activity-results?` +
      `&type=${activityType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  return activityResult ? (
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
              setElement={setActivityType}
              element={activityType}
              menuItems={[
                ActivityType.PROGRAM + '|Program',
                ActivityType.ANNOUNCEMENT + '|Ankündigung',
                ActivityType.EVENT + '|Event',
                ActivityType.PENALTY + '|Straffe',
                ActivityType.NEWS + '|Information'
              ]}
            />
          </div>

          <Suspense fallback={null}>
            <TableContainer component={Paper}>
              <Table>
                <ActivityTableHeader
                  activityType={activityType as ActivityType}
                  withAction={false}
                />
                <ActivityTableBody
                  withAction={false}
                  activities={activityResult.items}
                />
                <TableFooter style={{ backgroundColor: '#F0F8FF' }}>
                  {activityResult.total > 0 && (
                    <CustomTablePagination
                      total={activityResult.total}
                      size={activityResult.size}
                      page={activityResult.page}
                      handleChangePage={onChangePage}
                    />
                  )}
                </TableFooter>
              </Table>
              {activityResult.total === 0 && (
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
