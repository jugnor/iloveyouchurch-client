import { TableRow, TablePagination } from '@mui/material';
import * as React from 'react';

export interface CustomTablePaginationProps {
  total: number;
  size: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
}

export function CustomTablePagination({
  total,
  size,
  page,
  handleChangePage
}: CustomTablePaginationProps) {
  return (
    <TableRow>
      <TablePagination
        colSpan={3}
        count={total}
        rowsPerPage={size}
        rowsPerPageOptions={[]}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableRow>
  );
}
