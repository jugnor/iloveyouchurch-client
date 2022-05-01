import * as React from 'react';
import {Suspense, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  MuiEvent,
} from '@mui/x-data-grid';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@mui/material/Button";

import useSWR from "swr";
import {ResultsObject} from "../../util/ResultsObject";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {AlertColor} from "@mui/material/Alert";
import {endOfWeek, startOfWeek} from "date-fns";
import {Snackbar, Stack} from "@mui/material";
import {Alert} from "../../../shared/AlertMessage";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import {customDay} from "../../util/WeekPicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {useDiscipline} from "../../../hooks/useDiscipline";
import {
  disciplineRowsRendererByWeek,
  upsertDisciplineFormData,
  validateDiscipline
} from "./DisciplineRenderer";
import {Discipline, UpsertDisciplineRequest} from "../../../models/Discipline";
import {endWeekString, startWeekString, Transition, useStyles} from "../TimeHandlingRender";


interface DisciplineActionProps {
  postboxId: string,
  userId: string,
  path: string
  disciplineType: string
  columns: GridColumns
}

export function DisciplineAction({
                                   postboxId,
                                   userId,
                                   path,
                                   disciplineType,
                                   columns
                                 }: DisciplineActionProps) {
  const classes = useStyles();
  const {
    createDiscipline,
    updateDiscipline,
    deleteDiscipline
  } = useDiscipline(postboxId, userId, path);

  const [params, setParams] = useState<GridRenderCellParams>();
  const [page, setPage] = React.useState(0);
  const [valueDate, setValueDate] = React.useState<Date | null>(new Date());
  const [messageAlert, setMessageAlert] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [methode, setMethode] = useState<string>('');
  const date = new Date();
  const start = startOfWeek(date).toISOString();
  const end = endOfWeek(date).toISOString();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = (params: GridRenderCellParams) => (event: { stopPropagation: () => void; }) => {
    setOpenDialog(true);
    setParams(params)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };


  const handleEditClick = (params: GridRenderCellParams) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    params.api.setRowMode(params.row.id, 'edit');
  };

  const handleSaveClick = (params: GridRenderCellParams) => {
    return (event: { stopPropagation: () => void; }) => {
      const oId = params.row.oId;
      event.stopPropagation();
      params.api.commitRowChange(params.row.id)

      if (oId === undefined || oId === '') {
        let upsertDiscipline = upsertDisciplineFormData(startWeekString(valueDate), endWeekString(valueDate), true, params, disciplineType)
        if (
          validateDiscipline(upsertDiscipline, disciplineType, true)
        ) {

          createDiscipline(
            upsertDiscipline as UpsertDisciplineRequest,
            true
          ).then(r => {
            setMethode("createGet")
            params.api.setRowMode(params.row.id, 'view');
            const id = params.row.id;
            params.api.updateRows([{id, _action: 'delete'}])
            setOpenAlert(true);

            setMessageAlert("Das neue Item wurde erfolgreich hinzugefügt")
            setSeverity("success")
          });
        } else {
          setOpenAlert(true);
          setMethode("create")
          setMessageAlert("Das neue Item konnte leider nicht erzeugt werden")
          setSeverity("error")
        }
      } else {
        let upsertDiscipline = upsertDisciplineFormData(startWeekString(valueDate), endWeekString(valueDate), false, params, disciplineType)
        if (
          validateDiscipline(upsertDiscipline, disciplineType, false)

        ) {
          updateDiscipline(oId,
            upsertDiscipline as UpsertDisciplineRequest,
            true
          ).then(r => {
            setMethode("")
            params.api.setRowMode(params.row.id, 'view');
            params.api.updateRows([{...params.row, isNew: false}]);
            setOpenAlert(true);
            setMessageAlert("Das Item wurde erfolgreich geändert")
            setSeverity("success")
          });

        } else {
          setOpenAlert(true);
          setMethode("")
          setMessageAlert("Das Item konnte leider nicht geändert werden")
          setSeverity("error")
        }
      }
    };
  };

  const handleDeleteClick = (params: GridRenderCellParams) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    const id = params.row.id;
    const oId = params.row.oId;
    if (oId !== undefined && oId !== '') {
      deleteDiscipline(oId
      ).then(r => {
        setMethode("")
        params.api.updateRows([{id, _action: 'delete'}])
        setOpenAlert(true);
        setMessageAlert("Das Item wurde erfolgreich gelöscht")
        setSeverity("success")
      });
    } else {
      setOpenAlert(true);
      setMethode("")
      setMessageAlert("Das Item konnte leider nicht gelöscht werden")
      setSeverity("error")
    }
    setOpenDialog(false)
  };

  const handleCancelClick = (params: GridRenderCellParams) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    params.api.setRowMode(params.row.id, 'view');
    const id = params.row.id;
    if (params.row!.isNew) {
      params.api.current.updateRows([{id, _action: 'delete'}]);
    }
  };

  const columnsAction = columns.concat(
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: classes.actions,
      renderCell: (params) => {
        const isInEditMode = params.api.getRowMode(params.row.id) === 'edit'
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon/>}
              label="Save"
              onClick={handleSaveClick(params)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon/>}
              label="Cancel"
              className={classes.textPrimary}
              onClick={handleCancelClick(params)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon/>}
            label="Edit"
            className={classes.textPrimary}
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon/>}
            label="Delete"
            onClick={handleClickOpenDialog(params)}
            color="inherit"
          />,
        ];
      }
    });


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const {
    data,
    error,
    mutate
  } =
    useSWR<ResultsObject<Discipline>>
    (`/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `week=${startWeekString(valueDate) === '' ? start : startWeekString(valueDate)}/${endWeekString(valueDate) === '' ? end : endWeekString(valueDate)}` +
      `&type=${disciplineType}&page=${page}`);

  return data ? (
    <> <Container>
      <Typography component="div" className={"program"} style={
        {overflowY: 'auto'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            label="Week picker"
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
              setMethode("")
            }}
            renderDay={customDay(valueDate)}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="'Week of' MMM d"
          />
        </LocalizationProvider>
        <div>
          <Button color="primary" startIcon={<AddIcon/>}
                  onClick={() =>
                    setMethode('create')}>
            Add neues Item
          </Button>
        </div>
        <Suspense fallback={null}>
          <DataGrid
            rows={disciplineRowsRendererByWeek(data, valueDate, methode, disciplineType)}
            columns={columnsAction}
            editMode="row"
            onRowEditStart={handleRowEditStart}
            componentsProps={{
              toolbar: {}
            }}
            pagination={true}
            page={data.page}
            pageSize={data.size}
            rowCount={data.total}
            paginationMode="server"
            onPageChange={(newPage) => {
              setPage(newPage)
              setMethode("get" + startWeekString(valueDate))
            }}
          />
        </Suspense>
      </Typography>
      {openAlert && (<Stack spacing={2} sx={{width: '100%'}}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
            {messageAlert}!
          </Alert>
        </Snackbar>
      </Stack>)}
      {openDialog && params && (
        <div>
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Änderung Übernehmen"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Willst du wirklich die Daten löschen?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Nein, Zurück</Button>
              <Button onClick={handleDeleteClick(params)}>Ja, ich will</Button>
            </DialogActions>
          </Dialog>
        </div>)}
    </Container>
    </>
  ) : (<>Es ist leider etwas schiefgelaufen</>);
}
