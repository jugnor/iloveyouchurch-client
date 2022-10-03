import { useKeycloak } from '@react-keycloak/web';
import { UserRole } from '../models/UserModel';
import { useMatch } from 'react-router-dom';
import { RouteKey, routes } from '../utils/router';

export function useUserProperties() {
  const { keycloak } = useKeycloak();
  const postboxPageMatch = useMatch(routes[RouteKey.POSTBOX_ID]);
  const currentPostboxId = postboxPageMatch?.params.postboxId;
  const roles = keycloak.tokenParsed?.resource_access?.ycit?.roles;
  const isSystemAdmin = keycloak.hasResourceRole(UserRole.SYSTEM_ADMIN, 'ycit');
  const isPostboxParticipant = roles?.includes(UserRole.PARTICIPANT);
  const userId = keycloak.subject;

  return {
    userId,
    currentPostboxId,
    roles,
    isSystemAdmin,
    isPostboxParticipant
  };
}
