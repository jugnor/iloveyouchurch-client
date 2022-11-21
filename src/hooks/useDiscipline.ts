import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from './useApi';
import { MatchMutate } from '../swr';
import { Reading, UpsertReadingRequest } from '../models/Reading';
import {
  Discipline,
  DisciplineType,
  UpsertDisciplineRequest
} from '../models/Discipline';
import { ILCError } from '../utils/ErrorCode';

export function useDiscipline(postboxId: string, userId: string, path: string) {
  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /** const activityByTypeAndOrder = (type: ActivityType, order: ActivityOrder): Activity | undefined => {
    const {
      data,
      error
    } = useSWR<Activity>(`/postboxes/${postboxId}?type=${type}&order=${order}`, fetcher);
    return data;
  }*/

  const createDiscipline = useCallback(
    async (data: UpsertDisciplineRequest) => {
      setLoading(true);
      try {
        const newUseDisciplineResponse =
          await makeRequestWithFullResponse<Reading>(
            `/postboxes/${postboxId}/${path}s`,
            'POST',
            data
          );

        return newUseDisciplineResponse.data;
        setLoading(false);
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteDiscipline = useCallback(
    async (godGivingId: string) => {
      setLoading(true);

      try {
        await makeRequest(
          `/postboxes/${postboxId}/${path}s/${godGivingId}`,
          'DELETE'
        );
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        throw e;
      }
    },
    [makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const updateDiscipline = useCallback(
    async (clrId: string, data: UpsertDisciplineRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseDiscipline = await makeRequest<Discipline>(
          `/postboxes/${postboxId}/${path}s/${clrId}`,
          'PUT',
          data
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}s.*$`)
        );

        await MatchMutate(
          new RegExp(
            `^/postboxes/${postboxId}/users/${userId}/${path}-results.*$`
          )
        );

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedUseDiscipline;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, postboxId, t]
  );

  return {
    createDiscipline,
    deleteDiscipline,
    updateDiscipline,
    alertMessage,
    loading
  };
}
