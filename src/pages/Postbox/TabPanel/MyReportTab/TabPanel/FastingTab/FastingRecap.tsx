import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import {
  Fasting,
  fastingColumns,
  fastingRows,
  FastingType
} from '../../../../../../models/Fasting';

interface FastingRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function FastingRecap({
  postboxId,
  userId,
  path,
  menuItems
}: FastingRecapProps) {
  const [page, setPage] = React.useState(0);
  const [fastingType, setFastingType] = useState<string>(FastingType.PARTIAL);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<Fasting>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${fastingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = fastingColumns();

  const rows = fastingRows(results);

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
                setElement={setFastingType}
                element={fastingType}
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
