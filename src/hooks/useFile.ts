import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchMutate } from '../swr';
import { useApi } from './useApi';
import { mutate } from 'swr';
import { Reading, UpsertReadingRequest } from '../models/Reading';
import { Discipline, UpsertDisciplineRequest } from '../models/Discipline';
import {
  CreateFileRequest,
  FileModel,
  UpdateFileRequest
} from '../models/File';

export function useFile(postboxId: string) {
  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(
    async (data: File, silent?: boolean) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', data);

        const newFileResponse = await makeRequestWithFullResponse<FileModel>(
          `/postboxes/${postboxId}/files`,
          'POST',
          formData
        );

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/file-results.*$`)
        );

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/file-results.*$`)
        );
        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newFileResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteFileMetaData = useCallback(
    async (fileId: string) => {
      setLoading(true);

      try {
        await makeRequest(`/postboxes/${postboxId}/files/${fileId}`, 'DELETE');

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/files-description.*$`)
        );
        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/file-results.*$`)
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

  const updateFileMetaData = useCallback(
    async (fileId: string, data: UpdateFileRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseDiscipline = await makeRequest<FileModel>(
          `/postboxes/${postboxId}/files/${fileId}`,
          'PUT',
          data
        );

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/files-description.*$`)
        );
        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/file-results.*$`)
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
    [alert, makeRequest, postboxId, t]
  );

  return { uploadFile, deleteFileMetaData, updateFileMetaData, loading };
}
