import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';

import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectItem } from '../../../../../../app/SelectItem';
import { DataGridRows } from '../../../../../../app/DataGridRows';

import { FastingType} from "../../../../../../models/Fasting/Fasting";
import {Reading, meditationColumns, readingRows} from "../../../../../../models/Reading";

interface ReadingRecapProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function ReadingRecap({
  postboxId,
  userId,
  path,
  menuItems
}: ReadingRecapProps) {

  const [page, setPage] = React.useState(0);
  const [readingType, setReadingType] = useState<string>(
    FastingType.PARTIAL
  );

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const { data: results } = useSWR<ResultsObject<Reading>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${readingType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const columns = meditationColumns(readingType);

  const rows = readingRows(
    results
  );

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
                setElement={setReadingType}
                element={readingType}
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
