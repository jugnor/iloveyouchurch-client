import * as React from 'react';
import { Suspense, useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';

import useSWR from 'swr';

import { AlertColor } from '@mui/material/Alert';

import { useUserPostbox } from '../../../../../hooks/useUserPostbox';
import { ResultsObject } from '../../../../../models/ResultsObject';
import {
  InviteUserByMailRequest,
  UpsertUserRequest,
  UserModel
} from '../../../../../models/UserModel';

import { AlertMessage } from '../../../../../shared/ArletMessageRenderer';
import { useTranslation } from 'react-i18next';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { Table } from '@material-ui/core';

import { CustomTablePagination } from '../../../../../shared/TablePagination';
import { DeleteDialog } from '../../../../../shared/DeleteDialog';
import { GroupSelect } from '../../../../../shared/GroupSelect';
import { UserInputForm } from './UserInputForm';
import { UserTableHeader } from './UserTableHeader';
import { UserTableBody } from './UserTableBody';

interface UserRecapProps {
  groupName: string;
}

export function UserRecap({ groupName }: UserRecapProps) {
  const { insertUserInGroup, removeUserFromGroup, alertMessage } =
    useUserPostbox(groupName);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [page, setPage] = React.useState(0);
  const [subGroupId, setSubGroupId] = useState<string>('all');

  const [mode, setMode] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { t } = useTranslation();

  const { data: usersInGroupResult, mutate: mutateUserGroupResult } = useSWR<
    ResultsObject<UserModel>
  >(
    subGroupId !== 'all'
      ? `/api/groups/${groupName}/members?` +
          `subGroupId=${subGroupId}&page=${page}&size=10`
      : `/api/groups/${groupName}/members?` + `page=${page}&size=10`
  );

  const { data: user, mutate: mutateUserGroup } = useSWR<UserModel>(
    mode === 'delete' ? `/api/groups/${groupName}/users/${userId}` : null
  );

  const handleAction = (userId: string, mode: string) => {
    setUserId(userId);
    setMode(mode);
    if (mode === 'delete') {
      setOpenDialog(true);
    }
  };

  const handleInsertUserInGroup = useCallback(
    async (email: string) => {
      if (mode === 'update' || 'add') {
        await insertUserInGroup(subGroupId, email);
      }
    },
    [insertUserInGroup, mode, subGroupId]
  );

  const handleUserGroupForm = useCallback(
    async (data: InviteUserByMailRequest) => {
      handleInsertUserInGroup(data.email).then((r) => {
        mutateUserGroupResult(usersInGroupResult, true);
        setSeverity('success');
        setAlert('Das User Item wurde erfolgreich gespeichert');
        setMode('');
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    },
    [insertUserInGroup]
  );

  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      removeUserFromGroup(userId, subGroupId).then((r) => {
        mutateUserGroupResult(undefined, true);
        setMode('');
        setOpenAlert(true);
        setAlert('Das User Item wurde erfolgreich gelöscht');
        setSeverity('success');
        setOpenDialog(false);
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    } else {
      setMode('');
    }
  };

  return usersInGroupResult ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto', display: 'block' }}
        >
          <div style={{ display: 'flex' }}>
            <GroupSelect
              setElement={setSubGroupId}
              groupName={groupName}
              element={subGroupId}
            />
            {mode === '' && (
              <Button
                style={{ marginLeft: '10em', marginBottom: '0.7em' }}
                size="small"
                onClick={() => setMode('add')}
                color="primary"
                variant="outlined"
                startIcon={<AddIcon />}
              >
                Neues User Item Hinzufügen
              </Button>
            )}
            {(mode === 'add' || mode === 'update') && (
              <Button
                style={{ marginLeft: '10rem', marginBottom: '0.7em' }}
                size="small"
                onClick={() => setMode('')}
                color="primary"
                variant="outlined"
                startIcon={<KeyboardBackspaceIcon />}
              >
                Zurück
              </Button>
            )}
          </div>
          {(mode === 'add' || mode === 'update') && (
            <UserInputForm user={user} onSubmit={handleUserGroupForm} />
          )}

          {mode === '' && (
            <Suspense fallback={null}>
              <TableContainer component={Paper}>
                <Table>
                  <UserTableHeader />
                  <UserTableBody
                    users={usersInGroupResult.items}
                    selectItem={subGroupId}
                    handleAction={handleAction}
                  />
                  <TableFooter style={{ backgroundColor: '#F0F8FF' }}>
                    {usersInGroupResult.total > 0 && (
                      <CustomTablePagination
                        total={usersInGroupResult.total}
                        size={usersInGroupResult.size}
                        page={usersInGroupResult.page}
                        handleChangePage={onChangePage}
                      />
                    )}
                  </TableFooter>
                </Table>
                {usersInGroupResult.total === 0 && (
                  <Typography color={'error'}>
                    <h2>{t('Es liegt momentan kein User' + ' Item vor')} </h2>
                  </Typography>
                )}
              </TableContainer>
            </Suspense>
          )}
          {mode === 'delete' && openDialog && (
            <DeleteDialog
              openDialog={openDialog}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {openAlert && severity !== undefined && (
            <AlertMessage
              openAlert={openAlert}
              setOpenAlert={setOpenAlert}
              message={alert}
              severity={severity}
            />
          )}
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
