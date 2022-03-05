import React, { ReactElement } from 'react';
import Body from "../heralders/PageTsx/Body";

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
    element:  <Body/>,
    path: '/'
  },
  [RouteKey.ACCOUNTGIVING]: {
    element:  <Body/>,
    path: '/'
  }
};
