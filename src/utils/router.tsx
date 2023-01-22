import React, { ReactElement } from 'react';
import { Groups } from '../pages/Group/Groups';
import { GroupModel } from '../models/GroupModel';
import { Navigate } from 'react-router-dom';
import GroupLayout from '../pages/Group/GroupLayout';

export enum RouteKey {
  HOME,
  GROUPS,
  GROUP_ID
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
    element: <Navigate to="/groups" />,
    path: '/'
  },

  [RouteKey.GROUPS]: {
    element: <Groups />,
    path: '/groups'
  },
  [RouteKey.GROUP_ID]: {
    element: <GroupLayout />,
    path: '/groups/:groupId'
  }
};

export function getGroupPath(group: GroupModel) {
  return `/groups/${group.subgroupId}`;
}
