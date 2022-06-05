import {ReactNode, useEffect} from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { Route } from 'react-router-dom';


interface GuardedRouteProps {
  children?: ReactNode | ReactNode[];
  [prop: string]: any;
}

export function GuardedRoute({ children, ...rest }: GuardedRouteProps) {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak]);

  return keycloak.authenticated ? <Route {...rest}>{children}</Route> : null;
}

export default GuardedRoute;
