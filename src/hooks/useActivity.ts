import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, UpsertActivityRequest } from '../models/Activity';
import { useApi } from './useApi';

import { ILCError } from '../utils/ErrorCode';

export function useActivity(groupName: string) {
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const createActivity = useCallback(
    async (data: UpsertActivityRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newActivityResponse = await makeRequestWithFullResponse<Activity>(
          `/api/groups/${groupName}/activities`,
          'POST',
          data
        );

        setLoading(false);

        return newActivityResponse.data;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, makeRequestWithFullResponse, groupName, t]
  );

  const deleteActivity = useCallback(
    async (activityId: string, activityType: string) => {
      setLoading(true);

      try {
        const updatedCase = await makeRequest(
          `/api/groups/${groupName}/activities/${activityId}?type=${activityType}`,
          'DELETE'
        );

        setLoading(false);
        return updatedCase;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, groupName, t]
  );

  const updateActivity = useCallback(
    async (activityId: string, data: UpsertActivityRequest) => {
      setLoading(true);
      try {
        const updatedCase = await makeRequest<Activity>(
          `/api/groups/${groupName}/activities/${activityId}`,
          'PUT',
          data
        );

        setLoading(false);

        return updatedCase;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, groupName, t]
  );

  return {
    createActivity,
    updateActivity,
    deleteActivity,
    alertMessage,
    loading
  };
}
