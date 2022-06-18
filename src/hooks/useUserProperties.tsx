import { useKeycloak } from '@react-keycloak/web';
import {UserRole} from "../models/UserModel";
import {useMatch} from "react-router-dom";
import {RouteKey, routes} from "../utils/router";


export function useUserProperties() {
  const { keycloak } = useKeycloak();
  const postboxPageMatch = useMatch(routes[RouteKey.POSTBOX_ID]);
  const currentPostboxId = postboxPageMatch?.params.postboxId
  const roles = keycloak.tokenParsed?.resource_access?.ycit?.roles;
  const isSystemAdmin = keycloak.hasResourceRole(UserRole.SYSTEM_ADMIN);
  const isPostboxAdmin = roles?.includes(UserRole.POSTBOX_ADMIN);
  const isPostboxParticipant = roles?.includes(UserRole.POSTBOX_PARTICIPANT);
  const isPostboxMonitor = roles?.includes(UserRole.POSTBOX_MONITOR);
  const userId = keycloak.subject;

  return { userId,currentPostboxId,roles, isSystemAdmin,isPostboxAdmin,isPostboxMonitor,isPostboxParticipant };
}
