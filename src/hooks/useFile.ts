import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchMutate } from '../swr';
import { useApi } from './useApi';

import { FileModel, UpdateFileRequest } from '../models/File';
import { ILCError } from '../utils/ErrorCode';
import FileSaver from 'file-saver';

export function useFile(groupName: string) {
  const { makeRequest, makeRequestWithFullResponse } = useApi();
  const { t } = useTranslation();

  const [alertMessage, setAlertMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(
    async (data: File, silent?: boolean) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', data);

        const newFileResponse = await makeRequestWithFullResponse<FileModel>(
          `/api/groups/${groupName}/files`,
          'POST',
          formData
        );

        setLoading(false);

        return newFileResponse.data;
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

  const deleteFileMetaData = useCallback(
    async (fileId: string) => {
      setLoading(true);

      try {
        await makeRequest(`/api/groups/${groupName}/files/${fileId}`, 'DELETE');

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
    [alert, makeRequest, groupName, t]
  );

  const updateFileMetaData = useCallback(
    async (fileId: string, data: UpdateFileRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseDiscipline = await makeRequest<FileModel>(
          `/api/groups/${groupName}/files/${fileId}`,
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
    [alert, makeRequest, groupName, t]
  );

  const downloadFile = useCallback(
    async (fileId: string) => {
      const blob = await makeRequest<Blob>(
        `/api/groups/${groupName}/files/${fileId}/download`,
        'GET',
        undefined,
        undefined,
        'blob'
      );

      FileSaver.saveAs(blob);
    },
    [makeRequest, groupName]
  );

  return {
    downloadFile,
    uploadFile,
    deleteFileMetaData,
    updateFileMetaData,
    loading,
    alertMessage
  };
}
