import * as React from 'react';
import { Suspense, useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useSWR from 'swr';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import {
  Activity,
  UpsertActivityRequest
} from '../../../../../../models/Activity';
import { SelectItem } from '../../../../../../shared/SelectItem';
import { ActivityType } from '../../../../../../models/ActivityType';
import { Table } from '@material-ui/core';
import { Paper, TableContainer, TableFooter } from '@mui/material';
import { ActivityTableHeader } from './ActivityTableHeader';
import { ActivityTableBody } from './ActivityTableBody';
import { useActivityType } from '../../../../../../hooks/useActivityType';
import { useTranslation } from 'react-i18next';
import { CustomTablePagination } from '../../../../../../shared/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ActivityInputForm } from './ActivityInputForm';
import { useActivity } from '../../../../../../hooks/useActivity';
import { AlertColor } from '@mui/material/Alert';
import { AlertMessage } from '../../../../../../shared/ArletMessageRenderer';
import { DeleteDialog } from '../../../../../../shared/DeleteDialog';

interface ActivityRecapProps {
  groupName: string;
}

export function ActivityRecap({ groupName }: ActivityRecapProps) {
  const { createActivity, updateActivity, deleteActivity, alertMessage } =
    useActivity(groupName);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [page, setPage] = React.useState(0);
  const [activityType, setActivityType] = useState<string>(
    ActivityType.PENALTY
  );

  const [mode, setMode] = React.useState('');
  const [activityId, setActivityId] = React.useState('');

  const { translateType } = useActivityType(activityType as ActivityType);

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };
  const { t } = useTranslation();

  const { data: activityResult, mutate: mutateActivityResult } = useSWR<
    ResultsObject<Activity>
  >(
    `/api/groups/${groupName}/activity-results?` +
      `&type=${activityType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );

  const { data: activity, mutate: mutateActivity } = useSWR<Activity>(
    mode === 'update' || mode === 'delete'
      ? `/postboxes/${groupName}/activities/${activityId}`
      : null
  );

  const handleAction = (activityId: string, mode: string) => {
    setActivityId(activityId);
    setMode(mode);
    if (mode === 'delete') {
      setOpenDialog(true);
    }
  };

  const handleUpsertActivity = useCallback(
    async (data: UpsertActivityRequest) => {
      if (mode === 'update') {
        await updateActivity(activityId, data);
      } else if (mode === 'add') {
        await createActivity(data);
      }
    },
    [updateActivity, createActivity, mode, activityId]
  );

  const handleActivityForm = useCallback(
    async (data: UpsertActivityRequest) => {
      handleUpsertActivity(data).then((r) => {
        mutateActivityResult(activityResult, true);
        setSeverity('success');
        setAlert(
          'Das ' + translateType() + ' Item wurde erfolgreich gespeichert'
        );
        setMode('');
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    },
    [createActivity]
  );

  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteActivity(activityId, activityType).then((r) => {
        mutateActivityResult(undefined, true);
        setMode('');
        setOpenAlert(true);
        setAlert('Das ' + translateType() + ' Item wurde erfolgreich gelöscht');
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

  return activityResult ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto', display: 'block' }}
        >
          <div style={{ display: 'flex' }}>
            <SelectItem
              setElement={setActivityType}
              element={activityType}
              menuItems={[ActivityType.PENALTY + '|Straffe']}
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
                Neues {translateType()} Item Hinzufügen
              </Button>
            )}
            {(mode === 'add' || mode === 'update') && (
              <Button
                style={{ marginLeft: '10em', marginBottom: '0.7em' }}
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
            <ActivityInputForm
              activity={activity}
              activityType={activityType as ActivityType}
              onSubmit={handleActivityForm}
            />
          )}

          {mode === '' && (
            <Suspense fallback={null}>
              <TableContainer component={Paper}>
                <Table>
                  <ActivityTableHeader />
                  <ActivityTableBody
                    activities={activityResult.items}
                    handleAction={handleAction}
                  />
                  <TableFooter style={{ backgroundColor: '#F0F8FF' }}>
                    {activityResult.total > 0 && (
                      <CustomTablePagination
                        total={activityResult.total}
                        size={activityResult.size}
                        page={activityResult.page}
                        handleChangePage={onChangePage}
                      />
                    )}
                  </TableFooter>
                </Table>
                {activityResult.total === 0 && (
                  <Typography color={'error'}>
                    <h2>
                      {t(
                        'Es liegt momentan kein ' +
                          translateType() +
                          ' Item vor'
                      )}{' '}
                    </h2>
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
