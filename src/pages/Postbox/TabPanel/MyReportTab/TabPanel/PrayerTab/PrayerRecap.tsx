import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import { FastingType } from '../../../../../../models/Fasting';
import {
  Prayer,
  prayerColumns,
  prayerRows,
  PrayerType
} from '../../../../../../models/Prayer';

interface PrayerRecapRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function PrayerRecap({
  postboxId,
  userId,
  path,
  menuItems
}: PrayerRecapRecapProps) {
  const [page, setPage] = React.useState(0);
  const [prayerType, setPrayerType] = useState<string>(PrayerType.ALONE);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<Prayer>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${prayerType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = prayerColumns(prayerType);

  const rows = prayerRows(results);

  return results && columns && rows ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          {menuItems.length > 0 ? (
            <div>
              <SelectItem
                setElement={setPrayerType}
                element={prayerType}
                menuItems={menuItems}
              />
            </div>
          ) : (
            ''
          )}

          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={rows}
              gridColumns={columns}
              page={results.page}
              pageSize={results.size}
              total={results.total}
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
