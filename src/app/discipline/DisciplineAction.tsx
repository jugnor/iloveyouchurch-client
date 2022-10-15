import * as React from 'react';
import { Suspense, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';

import useSWR from 'swr';
import { ResultsObject } from '../../models/ResultsObject';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { AlertColor } from '@mui/material/Alert';
import { endOfISOWeek, endOfWeek, startOfISOWeek, startOfWeek } from 'date-fns';
import { useDiscipline } from '../../hooks/useDiscipline';
import {
  disciplineColumns,
  disciplineRowsRendererByWeek,
  upsertDisciplineFormData,
  validateDiscipline
} from './DisciplinePrepare';
import { Discipline, UpsertDisciplineRequest } from '../../models/Discipline';
import { AlertMessage } from '../ArletMessageRenderer';
import { DialogMessageRenderer } from '../DialogMessageRenderer';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CalenderWeekRenderer } from '../CalendarWeekRenderer';
import { DataGridRows } from '../DataGridRows';
import { SelectItem } from '../SelectItem';

interface DisciplineActionProps {
  postboxId: string;
  userId: string;
  path: string;
  menuItems: string[];
}

export function DisciplineAction({
  postboxId,
  userId,
  path,
  menuItems
}: DisciplineActionProps) {
  const { createDiscipline, updateDiscipline, deleteDiscipline } =
    useDiscipline(postboxId, userId, path);
  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary
      },
      textPrimary: {
        color: theme.palette.text.primary
      }
    }),
    { defaultTheme }
  );

  const getDisciplineType = (): string => {
    const first = menuItems.at(0);
    if (first !== undefined) {
      const second = first.split('|').at(0);
      if (second !== undefined) {
        return second;
      }
    }
    return '';
  };
  const date = new Date();
  const start = startOfISOWeek(date).toISOString();
  const end = endOfISOWeek(date).toISOString();
  const classes = useStyles();
  const [params, setParams] = useState<GridRenderCellParams>();
  const [page, setPage] = React.useState(0);
  const [disciplineType, setDisciplineType] = useState<string>(
    getDisciplineType()
  );
  const [startWeek, setStartWeek] = React.useState<string>(start);
  const [endWeek, setEndWeek] = React.useState<string>(end);
  const [messageAlert, setMessageAlert] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [methode, setMethode] = useState<string>('');

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      setOpenDialog(true);
      setParams(params);
    };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    setMethode('get' + startWeek);
  };

  const handleEditClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      params.api.setRowMode(params.row.id, 'edit');
    };

  const handleSaveClick = (params: GridRenderCellParams) => {
    return (event: { stopPropagation: () => void }) => {
      const oId = params.row.oId;
      event.stopPropagation();
      params.api.commitRowChange(params.row.id);

      if (methode === 'create') {
        let upsertDiscipline = upsertDisciplineFormData(
          postboxId,
          userId,
          startWeek,
          endWeek,
          true,
          params,
          disciplineType
        );
        console.log('WEEK ', endOfISOWeek(date).toISOString());

        if (validateDiscipline(upsertDiscipline, disciplineType, true)) {
          createDiscipline(
            upsertDiscipline as UpsertDisciplineRequest,
            true
          ).then((r) => {
            setMethode('createGet');
            params.api.setRowMode(params.row.id, 'view');
            const id = params.row.id;
            params.api.updateRows([{ id, _action: 'delete' }]);
            setOpenAlert(true);

            setMessageAlert('Das neue Item wurde erfolgreich hinzugefügt');
            setSeverity('success');
          });
        } else {
          setOpenAlert(true);
          setMethode('create');
          setMessageAlert('Das neue Item konnte leider nicht erzeugt werden');
          setSeverity('error');
        }
      } else {
        let upsertDiscipline = upsertDisciplineFormData(
          postboxId,
          userId,
          startWeek,
          endWeek,
          false,
          params,
          disciplineType
        );
        if (validateDiscipline(upsertDiscipline, disciplineType, false)) {
          updateDiscipline(
            oId,
            upsertDiscipline as UpsertDisciplineRequest,
            true
          ).then((r) => {
            setMethode('');
            params.api.setRowMode(params.row.id, 'view');
            params.api.updateRows([{ ...params.row, isNew: false }]);
            setOpenAlert(true);
            setMessageAlert('Das Item wurde erfolgreich geändert');
            setSeverity('success');
          });
        } else {
          setOpenAlert(true);
          setMethode('');
          setMessageAlert('Das Item konnte leider nicht geändert werden');
          setSeverity('error');
        }
      }
    };
  };

  const handleDeleteClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      const id = params.row.id;
      const oId = params.row.oId;
      if (oId !== undefined && oId !== '') {
        deleteDiscipline(oId).then((r) => {
          setMethode('');
          params.api.updateRows([{ id, _action: 'delete' }]);
          setOpenAlert(true);
          setMessageAlert('Das Item wurde erfolgreich gelöscht');
          setSeverity('success');
        });
      } else {
        setOpenAlert(true);
        setMethode('');
        setMessageAlert('Das Item konnte leider nicht gelöscht werden');
        setSeverity('error');
      }
      setOpenDialog(false);
    };

  const handleCancelClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      params.api.setRowMode(params.row.id, 'view');
      const id = params.row.id;
      if (params.row!.isNew) {
        params.api.current.updateRows([{ id, _action: 'delete' }]);
      }
    };

  const columnsAction = disciplineColumns(disciplineType).concat({
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: classes.actions,
    renderCell: (params) => {
      const isInEditMode = params.api.getRowMode(params.row.id) === 'edit';
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(params)}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className={classes.textPrimary}
            onClick={handleCancelClick(params)}
            color="inherit"
          />
        ];
      }
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className={classes.textPrimary}
          onClick={handleEditClick(params)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleClickOpenDialog(params)}
          color="inherit"
        />
      ];
    }
  });

  const { data, error, mutate } = useSWR<ResultsObject<Discipline>>(
    `/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `week=${startWeek}/${endWeek}` +
      `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );
  return data ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          <div>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setMethode('create')}
            >
              Add neues Item
            </Button>
            <div style={{ float: 'right' }}>
              <SelectItem
                setElement={setDisciplineType}
                element={disciplineType}
                menuItems={menuItems}
              />
            </div>
          </div>
          <br />
          <br />
          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={disciplineRowsRendererByWeek(
                data,
                startWeek,
                methode,
                disciplineType
              )}
              gridColumns={columnsAction}
              page={data.page}
              pageSize={data.size}
              total={data.total}
              onChangePage={onChangePage}
            />
          </Suspense>
        </Typography>
        <AlertMessage
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          message={messageAlert}
          severity={severity}
        />
        <DialogMessageRenderer
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          params={params}
          handleDeleteClick={handleDeleteClick}
        />
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
