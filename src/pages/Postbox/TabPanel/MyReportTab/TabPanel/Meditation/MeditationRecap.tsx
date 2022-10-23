import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import { FastingType } from '../../../../../../models/Fasting/Fasting';
import { meditationColumns } from '../../../../../../models/Reading';
import {
  Meditation,
  meditationRows,
  RetreatType
} from '../../../../../../models/Meditation';

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

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<Meditation>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${meditationType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = meditationColumns(meditationType);

  const rows = meditationRows(results);

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
                setElement={setMeditationType}
                element={meditationType}
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
