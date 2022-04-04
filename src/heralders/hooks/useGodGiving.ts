import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Activity, UpdateActivityRequest} from "../models/Activity";
import {matchMutate} from '../../swr';
import {useApi} from './useApi';
import useSWR, {mutate} from "swr";
import {ResultsObject} from "../components/util/ResultsObject";
import {CreateGodGivingRequest, GodGiving} from "../models/GodGiving";


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


  const createGodGiving = useCallback(async (data: CreateGodGivingRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newActivityResponse = await makeRequestWithFullResponse<GodGiving>(
          `/postboxes/${postboxId}/god-givings`,
          'POST',
          data);

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings-results.*$`)
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

        alert('success: Fall gelöscht.');
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
    async (godGivingId: string, data: UpdateActivityRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedCase = await makeRequest<Activity>(
          `/postboxes/${postboxId}/god-givings/${godGivingId}`,
          'PUT',
          data
        );

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/users/${userId}/god-givings-results.*$`)
        );

        await mutate(`/postboxes/${postboxId}/god-givings/${godGivingId}`);

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedCase;
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

