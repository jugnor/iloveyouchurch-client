import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import {
  GodGiving,
  godGivingColumns,
  godGivingRows,
  GodGivingType
} from '../../../../../../models/GodGiving';

interface GodGivingRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function GodGivingRecap({
  postboxId,
  userId,
  path,
  menuItems
}: GodGivingRecapProps) {
  const [page, setPage] = React.useState(0);
  const [godGivingType, setGodGivingType] = useState<string>(
    GodGivingType.MONEY
  );

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<GodGiving>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${godGivingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = godGivingColumns(godGivingType);

  const rows = godGivingRows(results);

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
                setElement={setGodGivingType}
                element={godGivingType}
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
