import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {matchMutate} from '../swr';
import {useApi} from './useApi';
import {mutate} from "swr";
import {Reading, UpsertReadingRequest} from "../models/Reading";
import {Discipline, UpsertDisciplineRequest} from "../models/Discipline";


export function useDiscipline(postboxId: string, userId: string, path: string) {
  const {makeRequest, makeRequestWithFullResponse, fetcher} = useApi();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);

  /** const activityByTypeAndOrder = (type: ActivityType, order: ActivityOrder): Activity | undefined => {
    const {
      data,
      error
    } = useSWR<Activity>(`/postboxes/${postboxId}?type=${type}&order=${order}`, fetcher);
    return data;
  }*/

  const createDiscipline = useCallback(async (data: UpsertDisciplineRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUseDisciplineResponse = await makeRequestWithFullResponse<Reading>(
          `/postboxes/${postboxId}/${path}s`,
          'POST',
          data);

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}s.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}-results.*$`)
        );
        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newUseDisciplineResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteDiscipline = useCallback(
    async (godGivingId: string) => {
      setLoading(true);

      try {
        await makeRequest(`/postboxes/${postboxId}/${path}s/${godGivingId}`, 'DELETE');

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}s.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}-results.*$`)
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

  const updateDiscipline = useCallback(
    async (clrId: string, data: UpsertDisciplineRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseDiscipline = await makeRequest<Discipline>(
          `/postboxes/${postboxId}/${path}s/${clrId}`,
          'PUT',
          data
        );

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}s.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/${path}-results.*$`)
        );

        await mutate(`/postboxes/${postboxId}/${path}s/${clrId}`);

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
    [alert, makeRequest, postboxId, t]
  );

  return {createDiscipline, deleteDiscipline, updateDiscipline, loading};
}

