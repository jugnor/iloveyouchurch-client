import React, { ReactElement } from 'react';
import AccountGiving from "../heralders/PageTsx/AccountGiving";

export enum RouteKey {
  ACCOUNTGIVING,
  HOME
}

export interface Route {
  disabled?: boolean;
  element: ReactElement | null;
  path: string;
}

export const routes: {
  [key in RouteKey]: Route;
} = {
  [RouteKey.HOME]: {
    element:  <AccountGiving/>,
    path: '/'
  },
  [RouteKey.ACCOUNTGIVING]: {
    element:  <AccountGiving/>,
    path: '/'
  }
};
