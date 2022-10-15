import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { AlertColor } from '@mui/material/Alert';


import {fileColumns, FileModel, fileRows} from "../../../../../../models/File";
import {ResultsObject} from "../../../../../../models/ResultsObject";
import {DataGridRows} from "../../../../../../app/DataGridRows";

interface FileRecapProps {
  postboxId: string;
}

export function FileRecap(fileRecapProps: FileRecapProps) {

  const [page, setPage] = React.useState(0);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const columns= fileColumns();

  const { data: results } = useSWR<ResultsObject<FileModel>>(
    `/postboxes/${fileRecapProps.postboxId}/file-meta-data-results?` +
      `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );
  const rows = fileRows(results)
  return results ? (
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
    <>Es ist leider etwas in file action schiefgelaufen</>
  );
}
