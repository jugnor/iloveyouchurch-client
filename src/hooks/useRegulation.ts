import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchMutate } from '../swr';
import { useApi } from './useApi';
import useSWR, { mutate, SWRResponse } from 'swr';
import { Regulation, UpsertRegulationRequest } from '../models/Regulation';

export function useRegulation(postboxId: string) {
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const createRegulation = useCallback(
    async (data: UpsertRegulationRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newRegulationResponse =
          await makeRequestWithFullResponse<Regulation>(
            `/postboxes/${postboxId}/regulations`,
            'POST',
            data
          );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulations.*$`)
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulation-results.*$`)
        );
        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newRegulationResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteRegulation = useCallback(
    async (regulationId: string) => {
      setLoading(true);

      try {
        await makeRequest(
          `/postboxes/${postboxId}/activities/${regulationId}`,
          'DELETE'
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulations.*$`)
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulation-results.*$`)
        );
        setLoading(false);
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  const updateRegulation = useCallback(
    async (
      regulationId: string,
      data: UpsertRegulationRequest,
      silent?: boolean
    ) => {
      setLoading(true);
      try {
        const updatedRegulation = await makeRequest<Regulation>(
          `/postboxes/${postboxId}/regulations/${regulationId}`,
          'PUT',
          data
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulations.*$`)
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/regulation-results.*$`)
        );

        await mutate(`/postboxes/${postboxId}/regulations/${regulationId}`);

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedRegulation;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  return { createRegulation, updateRegulation, deleteRegulation };
}
