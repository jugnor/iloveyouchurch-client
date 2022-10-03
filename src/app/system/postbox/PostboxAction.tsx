import * as React from 'react';
import { Suspense, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';

import useSWR from 'swr';
import { ResultsObject } from '../../../models/ResultsObject';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { AlertColor } from '@mui/material/Alert';
import { AlertMessage } from '../../ArletMessageRenderer';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { DataGridRows } from '../../DataGridRows';
import {
  PostboxModel,
  UpsertPostboxRequest
} from '../../../models/PostboxModel';
import {
  postboxColumns,
  postboxRowsRenderer,
  upsertPostboxFormData,
  validatePostbox
} from './PostboxRenderer';
import { usePostbox } from '../../../hooks/usePostbox';
import { useUserProperties } from '../../../hooks/useUserProperties';

interface PostboxActionProps {}

export function PostboxAction({}: PostboxActionProps) {
  const { createPostbox, updatePostbox } = usePostbox();
  const defaultTheme = createTheme();
  const { isSystemAdmin } = useUserProperties();
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

  const classes = useStyles();
  const [params, setParams] = useState<GridRenderCellParams>();
  const [page, setPage] = React.useState(0);
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
    setMethode('get');
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
        let upsertPostbox = upsertPostboxFormData(params);
        if (validatePostbox(upsertPostbox, true)) {
          createPostbox(upsertPostbox as UpsertPostboxRequest, true).then(
            (r) => {
              setMethode('createGet');
              params.api.setRowMode(params.row.id, 'view');
              const id = params.row.id;
              params.api.updateRows([{ id, _action: 'delete' }]);
              setOpenAlert(true);

              setMessageAlert('Das neue Item wurde erfolgreich hinzugefügt');
              setSeverity('success');
            }
          );
        } else {
          setOpenAlert(true);
          setMethode('create');
          setMessageAlert('Das neue Item konnte leider nicht erzeugt werden');
          setSeverity('error');
        }
      } else {
        let upsertPostbox = upsertPostboxFormData(params);
        if (validatePostbox(upsertPostbox, false)) {
          updatePostbox(oId, upsertPostbox as UpsertPostboxRequest, true).then(
            (r) => {
              setMethode('');
              params.api.setRowMode(params.row.id, 'view');
              params.api.updateRows([{ ...params.row, isNew: false }]);
              setOpenAlert(true);
              setMessageAlert('Das Item wurde erfolgreich geändert');
              setSeverity('success');
            }
          );
        } else {
          setOpenAlert(true);
          setMethode('');
          setMessageAlert('Das Item konnte leider nicht geändert werden');
          setSeverity('error');
        }
      }
    };
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

  const columnsAction = postboxColumns(methode === 'create').concat({
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: classes.actions,
    renderCell: (params: GridRenderCellParams) => {
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
        />
      ];
    }
  });

  const { data, error, mutate } = useSWR<ResultsObject<PostboxModel>>(
    `/postbox-results?` + `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
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
              Add eine neue Gruppe
            </Button>
            <div style={{ float: 'right' }}></div>
          </div>
          <br />
          <br />
          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={postboxRowsRenderer(data, methode)}
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
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
