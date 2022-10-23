import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import {
  Gospel,
  gospelColumns,
  gospelRows,
  GospelType
} from '../../../../../../models/Gospel';

interface GospelRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function GospelRecap({
  postboxId,
  userId,
  path,
  menuItems
}: GospelRecapProps) {
  const [page, setPage] = React.useState(0);
  const [gospelType, setGospelType] = useState<string>(GospelType.GOSPEL);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<Gospel>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${gospelType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = gospelColumns(gospelType);

  const rows = gospelRows(results);

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
                setElement={setGospelType}
                element={gospelType}
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
