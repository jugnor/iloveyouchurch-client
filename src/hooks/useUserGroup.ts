import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from './useApi';

import { ILCError } from '../utils/ErrorCode';
import { UserModel } from '../models/UserModel';

export function useUserGroup(groupName: string) {
  const { makeRequest, makeRequestWithFullResponse} = useApi();
  const { t } = useTranslation();
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const insertUserInGroup = useCallback(
    async (subGroupId: string, invitedEmail: string) => {
      setLoading(true);
      try {
        setAlertMessage(subGroupId)

        const newUserResponse = await makeRequestWithFullResponse<UserModel>(
          `/api/groups/subGroups/${subGroupId}/users?invitedEmail=${invitedEmail}`,
          'PUT'
        );
        setLoading(false);
        return newUserResponse.data;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );

        console.log("arlert"+ilcError.httpStatus,alertMessage)

      }
    },
    [ makeRequest, makeRequestWithFullResponse, groupName]
  );

  const removeUserFromGroup = useCallback(
    async (subGroupId: string, userId: string) => {
      setLoading(true);
      try {
        await makeRequest(
          `/api/groups/subGroups/${subGroupId}/users/${userId}`,
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
    [alertMessage, makeRequest, groupName]
  );

  return { insertUserInGroup, removeUserFromGroup, alertMessage };
}
