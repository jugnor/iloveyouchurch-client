import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {matchMutate} from '../../swr';
import {useApi} from './useApi';
import useSWR, {mutate} from "swr";
import {ResultsObject} from "../components/util/ResultsObject";
import {UpsertGodGivingRequest, GodGiving} from "../models/GodGiving";


export function useGodGiving(postboxId: string, userId: string) {
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

  const godGivingsByWeek = useCallback(async (week: string, silent?: boolean) => {
    try {
      const {
        data,
        error
      } =  await useSWR<ResultsObject<GodGiving>>(`/postboxes/${postboxId}/users/${userId}/god-giving-results?week=${week}`);
      if(data===undefined){
        console.log("aaaaddddd")
      }
      return data;
    } catch (e) {
      alert('error: Da ist leider etwas schiefgelaufen.');
      setLoading(false);
      throw e;
    }
  }, [alert, postboxId, t]);


  const createGodGiving = useCallback(async (data: UpsertGodGivingRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newActivityResponse = await makeRequestWithFullResponse<GodGiving>(
          `/postboxes/${postboxId}/god-givings`,
          'POST',
          data);

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-giving-results.*$`)
        );
        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newActivityResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteGodGiving = useCallback(
    async (godGivingId: string) => {
      setLoading(true);

      try {
        await makeRequest(`/postboxes/${postboxId}/god-givings/${godGivingId}`, 'DELETE');

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-giving-results.*$`)
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

  const updateGodGiving = useCallback(
    async (godGivingId: string, data: UpsertGodGivingRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedGodGiving = await makeRequest<GodGiving>(
          `/postboxes/${postboxId}/god-givings/${godGivingId}`,
          'PUT',
          data
        );

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-giving-results.*$`)
        );

        await mutate(`/postboxes/${postboxId}/god-givings/${godGivingId}`);

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedGodGiving;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  return {createGodGiving, godGivingsByWeek, deleteGodGiving, updateGodGiving, loading};
}

