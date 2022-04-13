import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";


interface Column {
  id: 'woche' | 'name' | 'meditation' | 'gebetAllein'|'gebetInGroup'| 'bibelLesen'| 'danksagung';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {id: 'woche', label: 'Woche', minWidth: 170},

  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
  },

  {
    id: 'meditation',
    label: 'Meditation',
    minWidth: 100,
  },
  {
    id: 'gebetAllein',
    label: 'gebet-allein',
    minWidth: 100,
  },
  {
    id: 'gebetInGroup',
    label: 'Gebet-In-Group',
    minWidth: 100,
  },
  {
    id: 'bibelLesen',
    label: 'Bibel-lesen',
    minWidth: 100,
  },
  {
    id: 'danksagung',
    label: 'danksagung',
    minWidth: 100,
  },
];

interface Data {
  woche: string;
  name: string;
  meditation: string;
  gebetAllein: string;
  gebetInGroup:string;
  bibelLesen:string;
  danksagung:string;
}

function createData(
    woche: string,
name: string,
meditation: string,
gebetAllein: string,
gebetInGroup:string,
bibelLesen:string,
danksagung:string,
): Data {

  return {woche, name,meditation, gebetAllein,gebetInGroup,bibelLesen,danksagung};
}

const rows = [
  createData('India', 'name', 'medi', 'thema','referenz','nein','dank'),
  createData('India', 'name', 'medi', 'thema','referenz','nein','dank'),


];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

      <Paper sx={{width: '100%', height: '200%'}}>

        <Container>

          <Typography component="div" className={"censor"} style={
            {overflowY: 'auto'}}>

            <TableContainer sx={{maxHeight: 440}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{top: 57, minWidth: column.minWidth}}
                        >
                          {column.label}
                        </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                </TableCell>
                            );
                          })}
                        </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Typography>
        </Container>
      </Paper>
  );
}
