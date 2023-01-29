import { useKeycloak } from '@react-keycloak/web';
import { ClientRole } from '../models/UserModel';
import {useMatch, useParams} from 'react-router-dom';
import { RouteKey, routes } from '../utils/router';

export function useUserProperties() {
  const { keycloak } = useKeycloak();
  const groupPageMatch = useMatch(routes[RouteKey.GROUP]);
  console.log("group",groupPageMatch)
  const currentGroupId = groupPageMatch?.params.groupId;
  const roles = keycloak.tokenParsed?.resource_access?.ycit?.roles;
  const isAdmin = keycloak.hasResourceRole(
    ClientRole.ADMIN,
    'iloveyouchurchserver-client'
  );
  const isGroupJunior = roles?.includes(ClientRole.JUNIOR);
  const userId = keycloak.subject;

  return {
    userId,
    currentGroupId,
    roles,
    isAdmin: isAdmin,
    isJunior: isGroupJunior
  };
}
