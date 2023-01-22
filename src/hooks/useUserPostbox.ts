import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from './useApi';

import { ILCError } from '../utils/ErrorCode';
import { UserModel } from '../models/UserModel';

export function useUserPostbox(groupName: string) {
  const [alertMessage, setAlertMessage] = useState('');
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const insertUserInGroup = useCallback(
    async (subGroupId: string, invitedEmail: string) => {
      setLoading(true);
      try {
        const newUserResponse = await makeRequestWithFullResponse<UserModel>(
          `/groups/subGroups/${subGroupId}/users?invitedEmail=${invitedEmail}`,
          'PUT'
        );
        setLoading(false);
        return newUserResponse.data;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, groupName, t]
  );

  const removeUserFromGroup = useCallback(
    async (subGroupId: string, userId: string) => {
      setLoading(true);

      try {
        await makeRequest(
          `/groups/subGroups/${subGroupId}/users/${userId}`,
          'DELETE'
        );
        setLoading(false);
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
      }
    },
    [alert, makeRequest, groupName, t]
  );

  return { insertUserInGroup, removeUserFromGroup, alertMessage };
}
