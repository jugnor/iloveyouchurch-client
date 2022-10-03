import * as React from 'react';
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridRowsProp,
  MuiEvent
} from '@mui/x-data-grid';

interface DataGridRowsProps {
  gridRowsProp: GridRowsProp;
  gridColumns: GridColumns;
  page: number;
  pageSize: number;
  total: number;
  onChangePage: (newPage: number) => void;
}

export function DataGridRows({
  gridRowsProp,
  gridColumns,
  page,
  pageSize,
  total,
  onChangePage
}: DataGridRowsProps) {
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };
  return (
    <>
      <DataGrid
        rows={gridRowsProp}
        columns={gridColumns}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        componentsProps={{
          toolbar: {}
        }}
        pagination={true}
        page={page}
        pageSize={pageSize}
        rowCount={total}
        paginationMode="server"
        onPageChange={(newPage) => onChangePage(newPage)}
      />
    </>
  );
}
