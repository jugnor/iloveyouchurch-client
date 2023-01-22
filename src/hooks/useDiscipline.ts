import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from './useApi';
import { MatchMutate } from '../swr';
import { Reading } from '../models/Reading';
import { Discipline, UpsertDisciplineRequest } from '../models/Discipline';
import { ILCError } from '../utils/ErrorCode';

export function useDiscipline(groupName: string, userId: string, path: string) {
  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const createDiscipline = useCallback(
    async (data: UpsertDisciplineRequest) => {
      setLoading(true);
      try {
        const newUseDisciplineResponse =
          await makeRequestWithFullResponse<Reading>(
            `/api/groups/${groupName}/${path}s`,
            'POST',
            data
          );
        setLoading(false);
        return newUseDisciplineResponse.data;
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

  const deleteDiscipline = useCallback(
    async (godGivingId: string) => {
      setLoading(true);

      try {
        await makeRequest(
          `/api/groups/${groupName}/${path}s/${godGivingId}`,
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
    [makeRequest, makeRequestWithFullResponse, groupName, t]
  );

  const updateDiscipline = useCallback(
    async (clrId: string, data: UpsertDisciplineRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseDiscipline = await makeRequest<Discipline>(
          `/api/groups/${groupName}/${path}s/${clrId}`,
          'PUT',
          data
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
    [makeRequest, groupName, t]
  );

  return {
    createDiscipline,
    deleteDiscipline,
    updateDiscipline,
    alertMessage,
    loading
  };
}
