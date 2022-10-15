import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import { DataGridRows } from '../../../../../../app/DataGridRows';
import useSWR from 'swr';
import {
  Regulation,
  setRegulationColumns,
  setRegulationRows
} from "../../../../../../models/Regulation";
import {ResultsObject} from "../../../../../../models/ResultsObject";

interface RegulationRecapProps {
  postboxId: string;
}

export function RegulationRecap(regulationRecapProps : RegulationRecapProps ) {

  const [page, setPage] = React.useState(0);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const columns = setRegulationColumns();


  const { data:result } = useSWR<ResultsObject<Regulation>>(
    `/postboxes/${regulationRecapProps.postboxId}/regulation-results?` +
      `page=${page}&size=5&sortBy=CREATED_AT&order=DESC`
  );

  const rows = setRegulationRows(result);

  return result ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={rows}
              gridColumns={columns}
              page={result.page}
              pageSize={result.size}
              total={result.total}
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
