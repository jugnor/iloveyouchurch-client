import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from './useApi';
import { Regulation, UpsertRegulationRequest } from '../models/Regulation';
import { ILCError } from '../utils/ErrorCode';

export function useRegulation(groupName: string) {
  const [alertMessage, setAlertMessage] = useState('');

  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const createRegulation = useCallback(
    async (data: UpsertRegulationRequest) => {
      setLoading(true);
      try {
        const newRegulationResponse =
          await makeRequestWithFullResponse<Regulation>(
            `/api/groups/${groupName}/regulations`,
            'POST',
            data
          );

        setLoading(false);

        return newRegulationResponse.data;
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

  const deleteRegulation = useCallback(async () => {
    setLoading(true);

    try {
      await makeRequest(`/api/groups/${groupName}/regulations`, 'DELETE');

      setLoading(false);
    } catch (e) {
      const ilcError = e as ILCError;
      setAlertMessage(
        'Der Server returniert einen Fehler: ' + ilcError.httpStatus
      );
      setLoading(false);

      throw e;
    }
  }, [makeRequest, groupName, t]);

  const updateRegulation = useCallback(
    async (data: UpsertRegulationRequest) => {
      setLoading(true);
      try {
        setLoading(false);
        const result = await makeRequest<Regulation>(
          `/api/groups/${groupName}/regulations`,
          'PUT',
          data
        );
        return result;
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

  return { createRegulation, updateRegulation, deleteRegulation, alertMessage };
}
