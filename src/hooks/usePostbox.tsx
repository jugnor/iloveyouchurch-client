import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchMutate } from '../swr';
import { useApi } from './useApi';
import { mutate } from 'swr';
import { Reading, UpsertReadingRequest } from '../models/Reading';
import { Discipline, UpsertDisciplineRequest } from '../models/Discipline';
import { UpsertUserRequest, UserModel } from '../models/UserModel';
import { PostboxModel, UpsertPostboxRequest } from '../models/PostboxModel';

export function usePostbox() {
  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const createPostbox = useCallback(
    async (data: UpsertPostboxRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUseUserResponse =
          await makeRequestWithFullResponse<PostboxModel>(
            `/postboxes`,
            'POST',
            data
          );

        await MatchMutate(new RegExp(`^/postboxes.*$`));
        await MatchMutate(new RegExp(`^/postbox-results.*$`));

        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newUseUserResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, t]
  );

  const updatePostbox = useCallback(
    async (postboxId: string, data: UpsertPostboxRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedPostbox = await makeRequest<PostboxModel>(
          `/postboxes/${postboxId}`,
          'PUT',
          data
        );

        await MatchMutate(new RegExp(`^postboxes.*$`));
        await MatchMutate(new RegExp(`^/postbox-results.*$`));

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedPostbox;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, t]
  );

  return { createPostbox, updatePostbox, loading };
}
