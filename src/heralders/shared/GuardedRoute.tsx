import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

export function GuardedRoute() {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak]);

  return keycloak.authenticated ? <Outlet /> : null;
}

export default GuardedRoute;
