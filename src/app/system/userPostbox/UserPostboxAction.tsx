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
  upsertUserToPostboxFormData,
  userPostboxColumns,
  userPostboxRowsRenderer,
  validateUpsertUserToPostbox
} from './UserPostboxRenderer';
import { UserModel, UserRole } from '../../../models/UserModel';
import { useUserPostbox } from '../../../hooks/useUserPostbox';
import { UpsertUserToPostboxRequest } from '../../../models/UserPostboxModel';
import { DialogMessageRenderer } from '../../DialogMessageRenderer';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { SelectItem } from '../../SelectItem';
import { PostboxModel, PostboxType } from '../../../models/PostboxModel';
import { useUserProperties } from '../../../hooks/useUserProperties';

interface UserPostboxActionProps {
  currentPostboxId: string;
  menuItems: string[];
}

export function UserPostboxAction({
  currentPostboxId,
  menuItems
}: UserPostboxActionProps) {
  const { data: postbox } = useSWR<PostboxModel>(
    `/postboxes/${currentPostboxId}`
  );

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

  const classes = useStyles();
  const [params, setParams] = useState<GridRenderCellParams>();
  const [page, setPage] = React.useState(0);
  const [messageAlert, setMessageAlert] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [methode, setMethode] = useState<string>('');
  const [disciplineType, setDisciplineType] = useState<string>(
    getDisciplineType()
  );
  const { addUserToPostbox, updateUserToPostbox, removeUserFromPostbox } =
    useUserPostbox(
      postbox?.postboxType === PostboxType.SYSTEM
        ? disciplineType
        : currentPostboxId
    );

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
        let addUser = upsertUserToPostboxFormData(
          postbox?.postboxType === PostboxType.SYSTEM
            ? disciplineType
            : currentPostboxId,
          params
        );
        if (validateUpsertUserToPostbox(addUser)) {
          addUserToPostbox(addUser as UpsertUserToPostboxRequest, true).then(
            (r) => {
              setMethode('createGet');
              params.api.setRowMode(params.row.id, 'view');
              const id = params.row.id;
              params.api.updateRows([{ id, _action: 'delete' }]);
              setOpenAlert(true);

              setMessageAlert('Der neue Nutzer wurde erfolgreich hinzugefügt');
              setSeverity('success');
            }
          );
        } else {
          setOpenAlert(true);
          setMethode('create');
          setMessageAlert('Der neue Nutzer konnte nicht hinzugefügt werden');
          setSeverity('error');
        }
      } else {
        let updateUser = upsertUserToPostboxFormData(
          postbox?.postboxType === PostboxType.SYSTEM
            ? disciplineType
            : currentPostboxId,
          params
        );
        if (validateUpsertUserToPostbox(updateUser)) {
          updateUserToPostbox(
            updateUser as UpsertUserToPostboxRequest,
            true
          ).then((r) => {
            setMethode('');
            params.api.setRowMode(params.row.id, 'view');
            params.api.updateRows([{ ...params.row, isNew: false }]);
            setOpenAlert(true);
            setMessageAlert('Die neue Rolle wurde dem Nutzer vergeben');
            setSeverity('success');
          });
        } else {
          setOpenAlert(true);
          setMethode('');
          setMessageAlert('Die neue Rolle konnte dem Nutzer vergeben werden');
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
        removeUserFromPostbox(oId).then((r) => {
          setMethode('');
          params.api.updateRows([{ id, _action: 'delete' }]);
          setOpenAlert(true);
          setMessageAlert('Der Nutzer wurde erfolgreich entfernt');
          setSeverity('success');
        });
      } else {
        setOpenAlert(true);
        setMethode('');
        setMessageAlert('Der Nutzer konnte leider nicht entfernt werden');
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

  const columnsAction = userPostboxColumns(methode === 'create').concat({
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

  const { data: users } = useSWR<ResultsObject<UserModel>>(
    postbox?.postboxType === PostboxType.SYSTEM
      ? `/postboxes/${disciplineType}/users?` +
          `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
      : `/postboxes/${currentPostboxId}/users?` +
          `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  return users ? (
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
              Add neuen Nutzer in Gruppe
            </Button>
            <div style={{ float: 'right' }}>
              {postbox?.postboxType === PostboxType.SYSTEM && (
                <SelectItem
                  menuItems={menuItems}
                  setActivityType={setDisciplineType}
                  activityType={disciplineType}
                />
              )}
            </div>
          </div>
          <br />
          <br />
          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={userPostboxRowsRenderer(users, methode)}
              gridColumns={columnsAction}
              page={users.page}
              pageSize={users.size}
              total={users.total}
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
    <>Es ist leider etwas in user action schiefgelaufen</>
  );
}
